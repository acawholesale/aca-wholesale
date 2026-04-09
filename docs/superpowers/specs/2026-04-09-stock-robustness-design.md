# Design Spec: Stock Robustness for High Traffic

**Date:** 2026-04-09
**Scope:** 3 fixes to handle concurrent drops + steady traffic without overselling or webhook failures

---

## Context

- ACA Wholesale: e-commerce selling clothing lots, ~20k€/month revenue
- Mix of announced drops (50-200 simultaneous visitors) and steady daily sales
- Some products have stock = 1 (unique lots), others stock = 5+
- Supabase Free plan, Vercel serverless, Stripe payments
- Current problem: no stock reservation, webhook does too much synchronously, itemsJson truncated at 490 chars

---

## 1. Atomic Stock Reservation at Checkout

### Problem
Stock is checked but not reserved before Stripe session creation. Multiple users pass the check simultaneously, all pay, overselling occurs.

### Solution
Decrement stock atomically at checkout creation time. Re-increment if payment expires.

### New Supabase Table: `stock_reservations`

```sql
CREATE TABLE stock_reservations (
  id SERIAL PRIMARY KEY,
  stripe_session_id TEXT NOT NULL UNIQUE,
  order_id TEXT NOT NULL,
  items_json JSONB NOT NULL,
  customer_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expired BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_reservations_session ON stock_reservations(stripe_session_id);
CREATE INDEX idx_reservations_created ON stock_reservations(created_at) WHERE expired = FALSE;
```

### New Supabase RPC: `reserve_stock`

```sql
CREATE OR REPLACE FUNCTION reserve_stock(p_id INTEGER, p_qty INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  rows_affected INTEGER;
BEGIN
  UPDATE products
  SET stock = stock - p_qty, updated_at = NOW()
  WHERE id = p_id AND stock >= p_qty;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Returns `true` if stock was reserved, `false` if insufficient.

### New Supabase RPC: `release_stock`

```sql
CREATE OR REPLACE FUNCTION release_stock(p_id INTEGER, p_qty INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET stock = stock + p_qty, updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Modified Flow: `/api/stripe/checkout`

1. Receive `{ items, customer }` from client
2. For each item, call `reserve_stock(item.id, item.qty)` via RPC
   - If any item fails: release all previously reserved items in this request, return `400 { error: 'Stock insuffisant', outOfStock: [...] }`
   - If all succeed: continue
3. Generate orderId
4. Save reservation to `stock_reservations` with: stripe_session_id (TBD), order_id, items_json (full items array, no truncation), customer_json (full customer object)
5. Create Stripe session with minimal metadata: `orderId`, `prenom`, `nom`, `email`, `telephone`, `itemsSummary` (text only, for display)
6. Update reservation with actual `stripe_session_id`
7. Return `{ url, sessionId, orderId }`

If Stripe session creation fails after stock was reserved: release all stock and delete reservation.

### Modified Flow: `/api/stripe/webhook` (checkout.session.completed)

1. Verify Stripe signature
2. Read `orderId` from metadata
3. Fetch reservation from `stock_reservations` WHERE `stripe_session_id` matches
4. Build order data using metadata (client info) + reservation (items_json)
5. Upsert order to `orders` table
6. Mark reservation as `expired = true` (consumed — stock already decremented)
7. Return `{ received: true }` to Stripe immediately
8. Fire-and-forget: trigger emails and GLS via internal fetch calls (see section 2)

Stock is NOT decremented in the webhook — it was already decremented at checkout time.

### New Webhook: `checkout.session.expired`

1. Verify Stripe signature
2. Read `orderId` from metadata
3. Fetch reservation from `stock_reservations` WHERE `stripe_session_id` matches AND `expired = FALSE`
4. If found: for each item in `items_json`, call `release_stock(item.id, item.qty)`
5. Mark reservation as `expired = true`
6. Return `{ received: true }`

### Cleanup Cron (belt and suspenders)

New API route: `/api/cron/cleanup-reservations`

- Called every 15 minutes via Vercel Cron
- Finds reservations WHERE `expired = FALSE` AND `created_at < NOW() - INTERVAL '35 minutes'`
- For each: release stock, mark as expired
- This catches cases where Stripe's expired webhook doesn't fire

Vercel cron config in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/cleanup-reservations",
    "schedule": "*/15 * * * *"
  }]
}
```

The cron route verifies a `CRON_SECRET` header (Vercel sets this automatically for cron jobs).

---

## 2. Fast Webhook Response

### Problem
Webhook does order save + 3 emails + GLS creation synchronously. Takes 10-15s under load. Stripe retries, causing duplicate orders.

### Solution
Webhook does only the database work synchronously (< 1s), then fires off async work via internal API calls without awaiting.

### New API Route: `/api/internal/post-order`

Handles everything that happens after an order is confirmed:
- Send admin notification email
- Send customer confirmation email
- Create GLS shipment
- If GLS succeeds: update order with tracking, send shipping email

Protected by a simple shared secret in `INTERNAL_API_SECRET` env var (checked via header).

### Modified Webhook Flow

```
1. Verify Stripe signature
2. Fetch reservation by stripe_session_id
3. Save order to Supabase
4. Mark reservation as expired
5. Return { received: true }  ← Stripe gets 200 here, < 1 second
6. fetch('/api/internal/post-order', { ... })  ← no await, fire and forget
```

The `fetch()` is called WITHOUT `await` — the webhook function returns immediately. Vercel will keep the `/api/internal/post-order` function alive to complete its work.

### Idempotency Guard

Add a check at the top of the webhook: if an order with this `stripe_session_id` already exists in the `orders` table, return `{ received: true }` immediately without processing. This prevents duplicate orders from Stripe retries.

---

## 3. Fix itemsJson Truncation

### Problem
`itemsJson` in Stripe metadata is truncated at 490 chars. Large carts produce invalid JSON. Stock decrement silently fails.

### Solution
Store full items data in `stock_reservations` table (created in section 1). Stripe metadata only carries `orderId` + client display info.

### Changes

**`/api/stripe/checkout`:**
- Remove: `itemsJson` from Stripe metadata
- Keep: `itemsSummary` (text, for display only, already truncated safely)
- Full items array is stored in `stock_reservations.items_json`

**`/api/stripe/webhook`:**
- Remove: `JSON.parse(meta.itemsJson)` 
- Replace: fetch items from `stock_reservations` table using `stripe_session_id`
- Full items data available regardless of cart size

**`/api/internal/post-order`:**
- Receives full items array in the request body (passed from webhook)
- Uses it for email templates and GLS creation

---

## Files Changed

| Action | File | What |
|--------|------|------|
| Create | `supabase/stock-reservations.sql` | Table + RPC functions |
| Modify | `app/api/stripe/checkout/route.js` | Reserve stock + save reservation + minimal metadata |
| Modify | `app/api/stripe/webhook/route.js` | Fast response + fire-and-forget + idempotency |
| Create | `app/api/internal/post-order/route.js` | Async post-order work (emails + GLS) |
| Create | `app/api/cron/cleanup-reservations/route.js` | Cleanup expired reservations |
| Modify | `vercel.json` | Add cron schedule |
| Modify | `app/api/stripe/webhook/route.js` | Handle `checkout.session.expired` event |

## Env Vars Required

| Variable | Purpose |
|----------|---------|
| `INTERNAL_API_SECRET` | Shared secret for internal API calls |

Existing env vars (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, etc.) remain unchanged.

## Stripe Webhook Config

The Stripe webhook endpoint must be updated to also listen for `checkout.session.expired` events (in addition to `checkout.session.completed`). This is done in the Stripe Dashboard under Developers > Webhooks.

---

## Out of Scope

- Supabase Pro migration (free plan handles current volume)
- External queue system (BullMQ, Inngest)
- Rate limiting (Vercel handles basic DDoS)
- Connection pooling (free plan limits are sufficient for ~200 concurrent users with serverless)
- Cart UI changes (already shows stock errors correctly)
- Admin dashboard changes (already shows real data)
- GLS system changes (untouched, just moved to async)

---

## Risk Assessment After Fixes

| Scenario | Before | After |
|----------|--------|-------|
| 50 users buy last item simultaneously | 50 sales, 49 refunds needed | 1 sale, 49 get "Rupture de stock" instantly |
| Stripe webhook slow (API external) | Timeout, retry, duplicate orders | < 1s response, no duplicates |
| Cart with 10+ products | Silent stock decrement failure | Full items stored in DB, works for any size |
| User abandons Stripe checkout | Stock stuck forever | Stock released after 30min (webhook) or 35min (cron) |
| Stripe retries webhook | Duplicate order created | Idempotency check, skipped |
