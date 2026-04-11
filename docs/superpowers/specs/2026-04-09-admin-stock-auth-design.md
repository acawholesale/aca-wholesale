# Design Spec: Admin Auth + Stock Decrement + Admin Dashboard

**Date:** 2026-04-09
**Scope:** 3 critical fixes for ACA Wholesale production readiness

---

## 1. Secure Admin Auth

### Problem
Admin login uses a hardcoded password (`admin2026`) checked client-side. The cookie is set in plain text. Anyone who sets `admin_session=admin2026` in their browser has full admin access. No backend validation on any admin route.

### Solution
Single admin account with bcrypt-hashed password, JWT-signed session, server-side middleware.

### Architecture

**Login flow:**
1. Client POSTs `{ password }` to `/api/admin/auth`
2. API compares against bcrypt hash stored in `ADMIN_PASSWORD_HASH` env var
3. On success, API returns a signed JWT (HS256) with `{ role: 'admin', iat, exp }` — expires in 24h
4. JWT stored in httpOnly, secure, sameSite=strict cookie named `admin_token`
5. Client redirects to `/admin`

**Route protection:**
- New utility `lib/adminAuth.js` exports `verifyAdmin(request)` — reads cookie, verifies JWT signature via `ADMIN_JWT_SECRET` env var, returns `{ authenticated: true }` or throws
- All `/api/admin/*` routes call `verifyAdmin()` at the top
- Admin pages (`app/admin/page.js`, `app/admin/print/page.js`) check for valid cookie client-side and redirect to login if missing — real security is server-side on API routes

**Logout:**
- DELETE `/api/admin/auth` clears the `admin_token` cookie

**Env vars required:**
- `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password (generated once via CLI)
- `ADMIN_JWT_SECRET` — random 64-char string for signing JWTs

**Dependencies:** `bcryptjs` (pure JS, no native deps), `jsonwebtoken`

### Files changed
- `app/api/admin/auth/route.js` — rewrite: bcrypt compare + JWT sign + httpOnly cookie
- `app/admin/login/page.js` — rewrite: POST to API, no client-side password check
- `lib/adminAuth.js` — new: JWT verification utility
- `app/admin/page.js` — add client-side cookie check redirect (UX only, not security)
- `app/admin/print/page.js` — same cookie check redirect
- All `/api/admin/*` routes — add `verifyAdmin()` guard

---

## 2. Stock Decrement on Order

### Problem
The `stock` field exists in the Supabase `products` table but is never modified. A customer can buy unlimited quantities of a product with stock = 0.

### Solution
Two-step approach: check before checkout creation + atomic decrement on payment confirmation.

### Architecture

**Step 1 — Pre-checkout validation (in `/api/stripe/checkout`):**
1. Before creating the Stripe session, fetch current stock for all items in the cart
2. For each item, verify `stock >= requested_qty`
3. If any item is out of stock, return 400 with `{ error: 'out_of_stock', items: [...] }` listing the problematic items and their available stock
4. If all items pass, proceed to create Stripe session as normal
5. No reservation — this is a check only

**Step 2 — Atomic decrement (in `/api/stripe/webhook`):**
1. After successful `checkout.session.completed`, parse `items_json` from metadata
2. For each item, run Supabase update: `stock = stock - qty` WHERE `id = product_id`
3. Use individual updates (not a transaction — Supabase JS client doesn't support multi-table transactions, and all updates target the same `products` table)
4. If stock goes negative (race condition), log a warning but don't fail the order — the payment is already collected

**Frontend stock display:**
- Product detail page already shows stock. Add a "Rupture de stock" state that disables the "Ajouter au panier" button when `stock <= 0`
- Cart page validates stock before allowing checkout — shows warning if a product became unavailable

### Files changed
- `app/api/stripe/checkout/route.js` — add stock check before session creation
- `app/api/stripe/webhook/route.js` — add stock decrement after order creation
- Product detail component — disable add-to-cart when stock = 0
- Cart component — validate stock on checkout attempt

---

## 3. Admin Dashboard — Real Data + Export

### Problem
The admin dashboard already fetches real orders from Supabase. Clients are derived from orders correctly. The export CSV button exists but doesn't work.

### Solution
Fix the export and ensure all data displays correctly. No product CRUD — the client contacts the developer for product changes.

### Architecture

**Export CSV:**
- Implement the existing export button to generate a real CSV from the current filtered orders
- CSV columns: ID, Date, Client (nom + prenom), Email, Ville, Montant, Status, GLS TrackID
- Uses client-side generation (Blob + download) — no new API route needed
- Second export for clients: Nom, Email, Ville, Nb Commandes, Statut (VIP/Actif/Nouveau), Total depense

**Stock visibility in admin:**
- Add a "Produits" tab to the admin dashboard showing all products with current stock levels
- Read-only display: product name, price, stock, category, badge
- Color-coded stock: red when stock <= 2, orange when stock <= 5, green otherwise
- This gives the client visibility into what needs restocking (and a reason to call the developer)

### Files changed
- `app/admin/page.js` — implement CSV export functions + add Produits tab (read-only)

---

## Out of Scope

- Product CRUD in admin (intentional — upsell opportunity)
- Multi-admin accounts or roles
- Stock reservation at checkout (overkill for current volume)
- Supabase RLS policies for admin (using service key server-side)
- i18n for admin (FR only)

---

## Env Vars Summary

| Variable | Purpose | Example |
|----------|---------|---------|
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password | `$2a$12$...` |
| `ADMIN_JWT_SECRET` | JWT signing secret | 64-char random string |

Existing env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `STRIPE_SECRET_KEY`, etc.) remain unchanged.

## Dependencies Added

| Package | Purpose | Size |
|---------|---------|------|
| `bcryptjs` | Password hashing (pure JS) | ~15KB |
| `jsonwebtoken` | JWT sign/verify | ~25KB |
