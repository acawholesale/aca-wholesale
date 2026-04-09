# Stock Robustness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate overselling during drops, prevent webhook timeouts/duplicates, and fix silent data loss from truncated item metadata.

**Architecture:** Stock is reserved atomically at checkout creation (not just checked). Webhook responds to Stripe in < 1s by deferring emails/GLS to an async internal route. Full item data lives in Supabase instead of Stripe metadata. Expired reservations are cleaned by Stripe webhook + Vercel cron.

**Tech Stack:** Next.js 14 App Router, Supabase (Postgres), Stripe webhooks, Vercel Cron

**Constraint:** Do NOT modify any GLS-related logic (create-shipment API, label format, tracking). Only move the GLS call from synchronous to async.

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `supabase/stock-reservations.sql` | SQL for table + 2 RPC functions |
| Modify | `app/api/stripe/checkout/route.js` | Reserve stock atomically + save reservation |
| Modify | `app/api/stripe/webhook/route.js` | Fast response + idempotency + handle expired event |
| Create | `app/api/internal/post-order/route.js` | Async emails + GLS (fire-and-forget target) |
| Create | `app/api/cron/cleanup-reservations/route.js` | Clean expired reservations |
| Create | `vercel.json` | Cron schedule config |

---

### Task 1: Create SQL migration for stock reservations

**Files:**
- Create: `supabase/stock-reservations.sql`
- Modify: `supabase/decrement-stock-rpc.sql` (replace with new RPCs)

- [ ] **Step 1: Create stock-reservations.sql**

Create file `/tmp/aca-wholesale/supabase/stock-reservations.sql` with:

```sql
-- Table for stock reservations during Stripe checkout
CREATE TABLE IF NOT EXISTS stock_reservations (
  id SERIAL PRIMARY KEY,
  stripe_session_id TEXT UNIQUE,
  order_id TEXT NOT NULL,
  items_json JSONB NOT NULL,
  customer_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expired BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_reservations_session ON stock_reservations(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_reservations_cleanup ON stock_reservations(created_at) WHERE expired = FALSE;

-- Atomic stock reservation: decrements only if enough stock exists
-- Returns true if reserved, false if insufficient stock
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

-- Release stock: re-increments when checkout expires or is cancelled
CREATE OR REPLACE FUNCTION release_stock(p_id INTEGER, p_qty INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET stock = stock + p_qty, updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

- [ ] **Step 2: Commit**

```bash
git add supabase/stock-reservations.sql
git commit -m "feat: SQL migration for stock reservations table + reserve/release RPCs"
```

**Note to implementer:** This SQL must be run manually in Supabase SQL Editor after the code is deployed. The old `decrement-stock-rpc.sql` stays as-is for reference but the `decrement_product_stock` function is no longer called.

---

### Task 2: Rewrite checkout route with atomic stock reservation

**Files:**
- Modify: `app/api/stripe/checkout/route.js` (full rewrite)

- [ ] **Step 1: Replace the entire checkout route**

Replace the entire content of `/tmp/aca-wholesale/app/api/stripe/checkout/route.js` with:

```javascript
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function POST(req) {
  const supabase = getSupabase()
  const reserved = [] // Track what we reserved so we can rollback on failure

  try {
    const { items, customer } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    // Reserve stock atomically for each item
    for (const item of items) {
      if (!item.id) continue
      const qty = parseInt(item.qty) || 1

      const { data: success, error: rpcErr } = await supabase.rpc('reserve_stock', {
        p_id: item.id,
        p_qty: qty,
      })

      if (rpcErr || !success) {
        // Rollback all previously reserved items
        for (const r of reserved) {
          await supabase.rpc('release_stock', { p_id: r.id, p_qty: r.qty })
        }

        // Get current stock for error message
        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single()

        return NextResponse.json({
          error: 'Stock insuffisant',
          outOfStock: [{
            id: item.id,
            name: item.name,
            requested: qty,
            available: product?.stock || 0,
          }],
        }, { status: 400 })
      }

      reserved.push({ id: item.id, qty })
    }

    // Generate order ID
    const year = new Date().getFullYear()
    const rand = String(Math.floor(Math.random() * 90000) + 10000)
    const orderId = 'ACA-' + year + '-' + rand

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description ? item.description.slice(0, 200) : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }))

    const itemsSummary = items.map(i => i.name + ' x' + i.qty).join(', ').slice(0, 490)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aca-wholesale.vercel.app'

    // Create Stripe session — metadata carries only orderId + client info (no itemsJson)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customer.email,
      success_url: baseUrl + '/panier/success?session_id={CHECKOUT_SESSION_ID}&order_id=' + orderId,
      cancel_url: baseUrl + '/panier',
      metadata: {
        orderId,
        prenom: customer.prenom || '',
        nom: customer.nom || '',
        email: customer.email || '',
        telephone: (customer.telephone || '').slice(0, 30),
        adresse: (customer.adresse || '').slice(0, 200),
        ville: (customer.ville || '').slice(0, 100),
        codePostal: (customer.codePostal || '').slice(0, 20),
        pays: (customer.pays || 'France').slice(0, 50),
        activite: (customer.activite || '').slice(0, 100),
        notes: (customer.notes || '').slice(0, 490),
        itemsSummary,
      },
    })

    // Save reservation to Supabase (full items + customer data, no truncation)
    await supabase.from('stock_reservations').insert({
      stripe_session_id: session.id,
      order_id: orderId,
      items_json: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      customer_json: customer,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id, orderId })
  } catch (error) {
    // Rollback reserved stock on any error
    for (const r of reserved) {
      await supabase.rpc('release_stock', { p_id: r.id, p_qty: r.qty }).catch(() => {})
    }
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/stripe/checkout/route.js
git commit -m "feat: atomic stock reservation at checkout with rollback on failure"
```

---

### Task 3: Create async post-order route

**Files:**
- Create: `app/api/internal/post-order/route.js`

- [ ] **Step 1: Create the post-order route**

Create directory and file `/tmp/aca-wholesale/app/api/internal/post-order/route.js`:

```javascript
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendShippingNotification, sendAdminOrderNotification, sendOrderConfirmation } from '../../../../../lib/emails'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function POST(req) {
  // Verify internal secret
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { orderId, meta, items, totalAmount } = await req.json()
  const supabase = getSupabase()

  // 1. Send admin notification email
  try {
    await sendAdminOrderNotification({
      orderId,
      clientName: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
      email: meta.email || '',
      total: totalAmount,
      items: meta.itemsSummary || items.map(i => i.name + ' x' + i.qty).join(', '),
    })
  } catch (err) {
    console.error('Admin notification email error:', err.message)
  }

  // 2. Send order confirmation to customer
  try {
    if (meta.email) {
      await sendOrderConfirmation({
        email: meta.email,
        prenom: meta.prenom || '',
        orderId,
        items: items.length > 0 ? items : (meta.itemsSummary || ''),
        total: totalAmount,
      })
    }
  } catch (err) {
    console.error('Order confirmation email error:', err.message)
  }

  // 3. Auto-create GLS shipment
  try {
    const glsOrder = {
      id: orderId,
      client: {
        nom: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
        entreprise: meta.entreprise || '',
        adresse: meta.adresse || '',
        ville: meta.ville || '',
        codePostal: meta.codePostal || '',
        pays: meta.pays || 'FR',
        email: meta.email || '',
        tel: meta.telephone || '',
      },
      weight: parseFloat(meta.weight) || 2,
      lots: meta.itemsSummary || items.map(i => i.name + ' x' + i.qty).join(', '),
      montant: totalAmount,
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aca-wholesale.vercel.app'
    const glsRes = await fetch(baseUrl + '/api/gls/create-shipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: glsOrder, deliveryType: meta.deliveryType || 'standard' }),
    })

    const glsData = await glsRes.json()

    if (glsData.success) {
      await supabase
        .from('orders')
        .update({
          gls_track_id: glsData.trackID || null,
          gls_label_base64: glsData.labelBase64 || null,
          gls_label_url: glsData.trackingUrl || null,
          status: 'En préparation',
        })
        .eq('id', orderId)

      // Send shipping notification
      try {
        if (meta.email && glsData.trackID) {
          await sendShippingNotification({
            email: meta.email,
            prenom: meta.prenom || '',
            orderId,
            trackID: glsData.trackID,
            trackingUrl: glsData.trackingUrl,
          })
        }
      } catch (emailErr) {
        console.error('Shipping email error:', emailErr.message)
      }
    } else {
      console.error('GLS error:', glsData.error)
    }
  } catch (glsError) {
    console.error('GLS auto-shipment error:', glsError.message)
  }

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/internal/post-order/route.js
git commit -m "feat: async post-order route for emails and GLS (fire-and-forget target)"
```

---

### Task 4: Rewrite webhook — fast response + idempotency + expired handler

**Files:**
- Modify: `app/api/stripe/webhook/route.js` (full rewrite)

- [ ] **Step 1: Replace the entire webhook route**

Replace the entire content of `/tmp/aca-wholesale/app/api/stripe/webhook/route.js` with:

```javascript
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export const runtime = 'nodejs'

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabase()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const meta = session.metadata || {}
    const orderId = meta.orderId || ('ACA-' + Date.now())
    const totalAmount = (session.amount_total || 0) / 100

    // Idempotency: skip if order already exists
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_session_id', session.id)
      .single()

    if (existing) {
      return NextResponse.json({ received: true })
    }

    // Fetch reservation to get full items data (no truncation)
    let items = []
    const { data: reservation } = await supabase
      .from('stock_reservations')
      .select('items_json')
      .eq('stripe_session_id', session.id)
      .single()

    if (reservation) {
      items = reservation.items_json || []
    }

    // Build order data
    const orderData = {
      id: orderId,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent || null,
      status: 'Payé',
      prenom: meta.prenom || '',
      nom: meta.nom || '',
      email: meta.email || session.customer_email || '',
      telephone: meta.telephone || '',
      adresse: meta.adresse || '',
      ville: meta.ville || '',
      code_postal: meta.codePostal || '',
      pays: meta.pays || 'France',
      activite: meta.activite || '',
      notes: meta.notes || '',
      items_summary: meta.itemsSummary || '',
      items_json: JSON.stringify(items),
      total: totalAmount,
      gls_track_id: null,
      gls_label_base64: null,
      gls_label_url: null,
    }

    // Save order to Supabase
    const { error: dbError } = await supabase
      .from('orders')
      .upsert([orderData], { onConflict: 'id' })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // Mark reservation as consumed (stock already decremented at checkout)
    await supabase
      .from('stock_reservations')
      .update({ expired: true })
      .eq('stripe_session_id', session.id)

    // Respond to Stripe immediately — everything below is async
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aca-wholesale.vercel.app'

    // Fire-and-forget: trigger emails + GLS asynchronously
    fetch(baseUrl + '/api/internal/post-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET || '',
      },
      body: JSON.stringify({
        orderId,
        meta: {
          prenom: meta.prenom || '',
          nom: meta.nom || '',
          email: meta.email || session.customer_email || '',
          telephone: meta.telephone || '',
          adresse: meta.adresse || '',
          ville: meta.ville || '',
          codePostal: meta.codePostal || '',
          pays: meta.pays || 'France',
          activite: meta.activite || '',
          notes: meta.notes || '',
          itemsSummary: meta.itemsSummary || '',
          entreprise: meta.entreprise || '',
          weight: meta.weight || '2',
          deliveryType: meta.deliveryType || 'standard',
        },
        items,
        totalAmount,
      }),
    }).catch(err => console.error('Post-order trigger error:', err.message))

    return NextResponse.json({ received: true })
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object

    // Find the reservation and release stock
    const { data: reservation } = await supabase
      .from('stock_reservations')
      .select('*')
      .eq('stripe_session_id', session.id)
      .eq('expired', false)
      .single()

    if (reservation) {
      const items = reservation.items_json || []
      for (const item of items) {
        if (item.id) {
          await supabase.rpc('release_stock', {
            p_id: item.id,
            p_qty: parseInt(item.qty) || 1,
          })
        }
      }
      await supabase
        .from('stock_reservations')
        .update({ expired: true })
        .eq('id', reservation.id)
    }

    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/stripe/webhook/route.js
git commit -m "feat: fast webhook response + idempotency + expired session handler"
```

---

### Task 5: Create cleanup cron route + vercel.json

**Files:**
- Create: `app/api/cron/cleanup-reservations/route.js`
- Create: `vercel.json`

- [ ] **Step 1: Create the cron cleanup route**

Create `/tmp/aca-wholesale/app/api/cron/cleanup-reservations/route.js`:

```javascript
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function GET(req) {
  // Vercel Cron sets this header automatically
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()

  // Find non-expired reservations older than 35 minutes
  const cutoff = new Date(Date.now() - 35 * 60 * 1000).toISOString()

  const { data: stale } = await supabase
    .from('stock_reservations')
    .select('*')
    .eq('expired', false)
    .lt('created_at', cutoff)

  if (!stale || stale.length === 0) {
    return NextResponse.json({ cleaned: 0 })
  }

  let cleaned = 0
  for (const reservation of stale) {
    const items = reservation.items_json || []
    for (const item of items) {
      if (item.id) {
        await supabase.rpc('release_stock', {
          p_id: item.id,
          p_qty: parseInt(item.qty) || 1,
        })
      }
    }
    await supabase
      .from('stock_reservations')
      .update({ expired: true })
      .eq('id', reservation.id)
    cleaned++
  }

  return NextResponse.json({ cleaned })
}
```

- [ ] **Step 2: Create vercel.json**

Create `/tmp/aca-wholesale/vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/cleanup-reservations",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add app/api/cron/cleanup-reservations/route.js vercel.json
git commit -m "feat: cron cleanup for expired stock reservations every 15 min"
```

---

### Task 6: Generate INTERNAL_API_SECRET + user actions

**Files:** None (env vars + Stripe dashboard)

- [ ] **Step 1: Generate secret**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save output — this is `INTERNAL_API_SECRET`.

- [ ] **Step 2: Document required user actions**

Print the following for the user:

1. **Add env var on Vercel:** `INTERNAL_API_SECRET` = (generated value)
2. **Run SQL in Supabase SQL Editor:** content of `supabase/stock-reservations.sql`
3. **Add `CRON_SECRET` on Vercel:** Go to Settings > Environment Variables, Vercel auto-generates this for Hobby/Pro plans. For free plans, add manually.
4. **Update Stripe webhook:** In Stripe Dashboard > Developers > Webhooks, edit the endpoint and add `checkout.session.expired` to the listened events (alongside `checkout.session.completed`).

- [ ] **Step 3: Commit and push**

```bash
git push origin main
```

---

## Summary of Changes

| Before | After |
|--------|-------|
| Stock checked but not reserved — 50 users bypass simultaneously | Stock reserved atomically — only available quantity passes |
| Webhook takes 10-15s (emails + GLS synchronous) | Webhook responds < 1s, emails/GLS async fire-and-forget |
| Stripe retries create duplicate orders | Idempotency check skips already-processed sessions |
| itemsJson truncated at 490 chars, breaks for large carts | Full items stored in Supabase, no size limit |
| Abandoned checkout: stock stuck forever | Auto-released via Stripe expired webhook + cron backup |
| No GLS code modified | GLS logic moved to async route, exact same behavior |
