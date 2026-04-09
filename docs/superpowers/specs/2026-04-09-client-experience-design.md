# Design Spec: Client Experience — Order History, Invoices, Email Verification, Error Logs

**Date:** 2026-04-09
**Scope:** 4 independent features to improve client experience and operational reliability

---

## Context

- ACA Wholesale: SAS ACAMAR, SIRET 101 361 616 00010, TVA FR45101361616
- Address: 60 Rue François 1er, 75008 Paris
- Director: Yoan STAUB
- Prices on site are TTC (TVA 20% included)
- Supabase Auth for client accounts, Supabase DB for orders/products
- No custom email domain yet (Resend on default domain)

---

## 1. Order History in Client Account

### Problem
Clients have no way to see their past orders without contacting the admin.

### Solution
Add order history to the existing `/compte` page. Fetch orders by the logged-in client's email.

### Implementation

**Existing route:** `/api/orders/customer` already accepts `?email=` param and returns orders for that email.

**Changes to `/app/compte/page.js`:**
- After auth check, fetch `/api/orders/customer?email={user.email}`
- Display a list of orders: ID, date, total, status, items summary
- Each order row shows: status badge (same style as admin), GLS tracking link if available, "Télécharger la facture" button
- If no orders: "Vous n'avez pas encore de commandes"
- Orders sorted by date descending

**No new API routes needed** — `/api/orders/customer` already exists.

---

## 2. Invoice PDF Generation

### Problem
No invoices generated. Legally required for B2B/wholesale in France.

### Solution
Generate PDF invoices on-the-fly via an API route. Not stored in DB — generated from order data each time.

### Legal Requirements (France)

Every invoice must contain:
- Seller: ACAMAR SAS, 60 Rue François 1er 75008 Paris, SIRET 101 361 616 00010, TVA FR45101361616
- Buyer: name, address, email
- Invoice number: same as order ID (ACA-2026-XXXXX)
- Invoice date: order creation date
- Line items: product name, quantity, unit price HT, total HT
- TVA line: 20% on total HT
- Total TTC
- Payment method: Carte bancaire (Stripe)
- Mention: "Facture acquittée" (since payment is already collected)

### Price Calculation
Prices in DB are TTC. Invoice shows:
- Prix HT = Prix TTC / 1.20
- TVA (20%) = Prix TTC - Prix HT
- Total TTC = Prix TTC (as stored)

### Implementation

**New API route:** `/api/orders/invoice?id=ACA-2026-XXXXX`

- GET request, returns HTML that can be printed/saved as PDF
- Auth check: either the logged-in user's email matches the order email, OR the request has a valid admin JWT cookie
- Fetches order from Supabase by ID
- Renders a clean, printable HTML invoice page with all legal mentions
- The page includes a print button and `@media print` styles
- No npm dependency needed — pure HTML/CSS rendered server-side

**Why HTML instead of a PDF library:**
- Zero dependencies to add
- Easier to maintain and style
- Browser print-to-PDF produces clean results
- Same pattern already used for GLS label printing

**Access from:**
- Client `/compte` page: "Facture" button per order
- Admin dashboard: "Facture" button in order detail view

---

## 3. Email Verification — Non-blocking

### Problem
Fake accounts can be created without email verification.

### Solution
Use Supabase Auth's built-in email verification. Don't block purchases, just mark unverified accounts visually.

### Implementation

**Supabase Auth** already sends verification emails on signup and exposes `email_confirmed_at` in the user object.

**Changes to `/app/compte/page.js`:**
- Check `user.email_confirmed_at` from Supabase Auth session
- If null: show a yellow banner at top of account page: "Veuillez vérifier votre adresse email. Vérifiez vos spams si vous ne trouvez pas l'email."
- Add a "Renvoyer l'email" button that calls `supabase.auth.resend({ type: 'signup', email: user.email })`

**Changes to admin `ClientsTab`:**
- When deriving clients from orders, check if the email matches a verified Supabase Auth user
- This requires a new API endpoint since client-side can't query auth.users
- Simpler approach: add a "Non vérifié" badge based on whether `email_confirmed_at` is present in the Supabase Auth admin API

**Actually, simplest approach:** Just show the verification banner on the client account page. Don't complicate the admin — the admin already derives clients from orders (real purchases), so those emails are by definition "real enough". The verification is a client-facing UX improvement, not an admin tool.

---

## 4. Structured Error Logs

### Problem
All errors go to `console.error` which is lost after Vercel function execution. No visibility into production errors.

### Solution
Log errors to a Supabase `error_logs` table with context. A simple helper function replaces `console.error` in critical paths.

### New Supabase Table: `error_logs`

```sql
CREATE TABLE error_logs (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_error_logs_source ON error_logs(source);
CREATE INDEX idx_error_logs_created ON error_logs(created_at);
```

### New Utility: `lib/errorLog.js`

```javascript
export async function logError(source, message, metadata = {}) {
  console.error(`[${source}] ${message}`, metadata)
  try {
    const supabase = getSupabase()
    await supabase.from('error_logs').insert({ source, message, metadata })
  } catch {
    // Don't fail the caller if logging fails
  }
}
```

### Where to use it

Replace `console.error` with `logError()` in:
- `app/api/stripe/webhook/route.js` — webhook signature errors, DB errors, stock errors
- `app/api/stripe/checkout/route.js` — stock reservation failures, Stripe errors
- `app/api/gls/create-shipment/route.js` — GLS API failures
- `app/api/orders/route.js` — DB errors

Each call includes context: `logError('webhook', 'Supabase insert error', { orderId, error: dbError })`

### Viewing logs
- Directly in Supabase Table Editor (no admin UI for now — that's the CRM upsell)
- The existing `/api/error-report` route is rewritten to use the same table

---

## Files Changed

| Action | File | What |
|--------|------|------|
| Modify | `app/compte/page.js` | Order history + invoice button + email verification banner |
| Create | `app/api/orders/invoice/route.js` | HTML invoice generation |
| Modify | `app/admin/page.js` | Invoice button in order detail |
| Create | `lib/errorLog.js` | Structured error logging utility |
| Create | `supabase/error-logs.sql` | Error logs table |
| Modify | `app/api/stripe/webhook/route.js` | Use logError instead of console.error |
| Modify | `app/api/stripe/checkout/route.js` | Use logError instead of console.error |

## Out of Scope

- Custom email domain (deferred by user)
- Email template redesign (no domain yet)
- Error logs UI in admin (CRM upsell)
- Blocking unverified users from purchasing
- Admin badge for unverified clients
