# Client Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add invoice PDF generation, email verification banner, structured error logging, and invoice button in admin.

**Architecture:** Invoice is a server-rendered HTML page (print-to-PDF pattern, same as GLS labels). Error logs go to a Supabase table via a shared utility. Email verification uses Supabase Auth's built-in `email_confirmed_at` field.

**Tech Stack:** Next.js 14 App Router, Supabase, HTML/CSS for invoices

**Note:** The `/compte` page already has order history with tracking — no changes needed for that feature.

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `app/api/orders/invoice/route.js` | Generate HTML invoice for an order |
| Create | `lib/errorLog.js` | Structured error logging utility |
| Create | `supabase/error-logs.sql` | Error logs table |
| Modify | `app/compte/page.js` | Add invoice button + email verification banner |
| Modify | `app/admin/page.js` | Add invoice button in order detail |
| Modify | `app/api/stripe/webhook/route.js` | Use logError instead of console.error |
| Modify | `app/api/stripe/checkout/route.js` | Use logError instead of console.error |

---

### Task 1: Create error logging utility + SQL

**Files:**
- Create: `lib/errorLog.js`
- Create: `supabase/error-logs.sql`

- [ ] **Step 1: Create lib/errorLog.js**

```javascript
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function logError(source, message, metadata = {}) {
  console.error(`[${source}] ${message}`, metadata)
  try {
    const supabase = getSupabase()
    if (supabase) {
      await supabase.from('error_logs').insert({
        source,
        message: String(message).slice(0, 1000),
        metadata,
      })
    }
  } catch {
    // Don't fail the caller if logging fails
  }
}
```

- [ ] **Step 2: Create supabase/error-logs.sql**

```sql
CREATE TABLE IF NOT EXISTS error_logs (
  id SERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_error_logs_source ON error_logs(source);
CREATE INDEX IF NOT EXISTS idx_error_logs_created ON error_logs(created_at);
```

- [ ] **Step 3: Commit**

```bash
git add lib/errorLog.js supabase/error-logs.sql
git commit -m "feat: structured error logging utility + SQL migration"
```

---

### Task 2: Wire logError into critical routes

**Files:**
- Modify: `app/api/stripe/webhook/route.js`
- Modify: `app/api/stripe/checkout/route.js`

- [ ] **Step 1: Add logError to webhook**

In `/tmp/aca-wholesale/app/api/stripe/webhook/route.js`, add import at top:
```javascript
import { logError } from '../../../../lib/errorLog'
```

Then replace every `console.error(...)` in the file with `logError(...)`:

- `console.error('Webhook signature error:', err.message)` → `logError('webhook', 'Signature error: ' + err.message)`
- `console.error('Supabase insert error:', dbError)` → `logError('webhook', 'Supabase insert error', { orderId, error: String(dbError) })`
- `console.error('Admin notification email error:', err.message)` → `logError('webhook', 'Admin email error: ' + err.message, { orderId })`
- `console.error('Order confirmation email error:', err.message)` → `logError('webhook', 'Confirmation email error: ' + err.message, { orderId })`
- `console.error('Post-order error:', err.message)` → `logError('webhook', 'Post-order error: ' + err.message, { orderId })`

- [ ] **Step 2: Add logError to checkout**

In `/tmp/aca-wholesale/app/api/stripe/checkout/route.js`, add import at top:
```javascript
import { logError } from '../../../../lib/errorLog'
```

Replace:
- `console.error('Stripe checkout error:', error)` → `logError('checkout', 'Stripe checkout error: ' + error.message, { items: items?.length })`

- [ ] **Step 3: Commit**

```bash
git add app/api/stripe/webhook/route.js app/api/stripe/checkout/route.js
git commit -m "feat: use structured logError in webhook and checkout routes"
```

---

### Task 3: Create invoice HTML route

**Files:**
- Create: `app/api/orders/invoice/route.js`

- [ ] **Step 1: Create the invoice route**

Create `/tmp/aca-wholesale/app/api/orders/invoice/route.js`:

```javascript
export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../lib/adminAuth'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('id')
  const customerEmail = searchParams.get('email')

  if (!orderId) {
    return NextResponse.json({ error: 'id required' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error || !order) {
    return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
  }

  // Auth: either admin or the customer who owns the order
  const admin = verifyAdmin(req)
  const isOwner = customerEmail && order.email && customerEmail.toLowerCase() === order.email.toLowerCase()
  if (!admin.authenticated && !isOwner) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  // Parse items
  let items = []
  try { items = JSON.parse(order.items_json || '[]') } catch {}

  const totalTTC = parseFloat(order.total) || 0
  const totalHT = Math.round((totalTTC / 1.20) * 100) / 100
  const totalTVA = Math.round((totalTTC - totalHT) * 100) / 100
  const orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : ''

  const itemRows = items.map(item => {
    const qty = item.qty || 1
    const priceTTC = parseFloat(item.price) || 0
    const priceHT = Math.round((priceTTC / 1.20) * 100) / 100
    const totalItemHT = Math.round(priceHT * qty * 100) / 100
    return `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;">${item.name || 'Article'}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:center;">${qty}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">${priceHT.toFixed(2)} €</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">${totalItemHT.toFixed(2)} €</td>
    </tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Facture ${order.id} - ACAMAR SAS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; }
    .page { max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #C4962A; }
    .logo h1 { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
    .logo h1 span { color: #C4962A; }
    .logo p { color: #666; font-size: 11px; margin-top: 2px; }
    .invoice-ref { text-align: right; }
    .invoice-ref .num { font-size: 22px; font-weight: 900; color: #C4962A; }
    .invoice-ref .date { color: #666; font-size: 12px; margin-top: 4px; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 20px; margin-top: 6px; }
    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
    .party { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px 20px; }
    .party.buyer { border: 2px solid #C4962A; }
    .party h3 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 10px; }
    .party .name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .party p { color: #444; font-size: 12px; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    thead th { background: #f8f8f8; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #666; }
    thead th:nth-child(2) { text-align: center; }
    thead th:nth-child(3), thead th:nth-child(4) { text-align: right; }
    .totals { display: flex; justify-content: flex-end; margin-bottom: 32px; }
    .totals table { width: 280px; }
    .totals td { padding: 6px 12px; font-size: 13px; }
    .totals .total-row td { font-weight: 900; font-size: 16px; border-top: 2px solid #C4962A; padding-top: 10px; }
    .totals .total-row td:last-child { color: #C4962A; }
    .legal { border-top: 1px solid #eee; padding-top: 20px; color: #999; font-size: 10px; line-height: 1.8; }
    .print-bar { background: #111; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 10; }
    .print-bar button { background: linear-gradient(135deg, #C4962A, #E8B84B); color: #000; border: none; padding: 10px 24px; font-weight: 900; font-size: 13px; border-radius: 6px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
    .print-bar span { color: #fff; font-size: 14px; font-weight: 700; }
    @media print { .print-bar { display: none !important; } body { background: #fff; } .page { padding: 20px; } }
  </style>
</head>
<body>
  <div class="print-bar">
    <span>Facture ${order.id}</span>
    <button onclick="window.print()">Imprimer / PDF</button>
  </div>
  <div class="page">
    <div class="header">
      <div class="logo">
        <h1>AC<span>A</span> WHOLESALE</h1>
        <p>ACAMAR SAS</p>
        <p>60 Rue François 1er, 75008 Paris</p>
      </div>
      <div class="invoice-ref">
        <div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;">Facture</div>
        <div class="num">${order.id}</div>
        <div class="date">${orderDate}</div>
        <div class="badge">Acquittée</div>
      </div>
    </div>

    <div class="parties">
      <div class="party">
        <h3>Vendeur</h3>
        <div class="name">ACAMAR SAS</div>
        <p>60 Rue François 1er<br>75008 Paris, France<br>SIRET : 101 361 616 00010<br>TVA : FR45101361616</p>
      </div>
      <div class="party buyer">
        <h3>Acheteur</h3>
        <div class="name">${((order.prenom || '') + ' ' + (order.nom || '')).trim() || 'Client'}</div>
        <p>${order.adresse || ''}<br>${order.code_postal || ''} ${order.ville || ''}<br>${order.pays || 'France'}<br>${order.email || ''}</p>
      </div>
    </div>

    <table>
      <thead>
        <tr><th>Désignation</th><th>Qté</th><th>Prix unit. HT</th><th>Total HT</th></tr>
      </thead>
      <tbody>
        ${itemRows || '<tr><td colspan="4" style="padding:10px 12px;color:#999;">Détail non disponible</td></tr>'}
      </tbody>
    </table>

    <div class="totals">
      <table>
        <tr><td style="color:#666;">Total HT</td><td style="text-align:right;">${totalHT.toFixed(2)} €</td></tr>
        <tr><td style="color:#666;">TVA (20%)</td><td style="text-align:right;">${totalTVA.toFixed(2)} €</td></tr>
        <tr class="total-row"><td>Total TTC</td><td style="text-align:right;">${totalTTC.toFixed(2)} €</td></tr>
      </table>
    </div>

    <div class="legal">
      <p><strong>Mode de paiement :</strong> Carte bancaire (Stripe)</p>
      <p><strong>ACAMAR SAS</strong> — Capital social : non communiqué — RCS Paris — SIRET : 101 361 616 00010 — TVA intracommunautaire : FR45101361616</p>
      <p>60 Rue François 1er, 75008 Paris, France — contact@aca-wholesale.com</p>
    </div>
  </div>
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/orders/invoice/route.js
git commit -m "feat: HTML invoice generation route with legal mentions"
```

---

### Task 4: Add invoice button to client account page

**Files:**
- Modify: `app/compte/page.js`

- [ ] **Step 1: Add "À expédier" to statusColor**

In `/tmp/aca-wholesale/app/compte/page.js`, find the `statusColor` object at the top (around line 10):

```javascript
const statusColor = {
  'Payé':       { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)' },
```

Add after the `'Payé'` line:
```javascript
  'À expédier': { color: '#C4962A', bg: 'rgba(196,150,42,0.1)',  border: 'rgba(196,150,42,0.25)' },
```

- [ ] **Step 2: Add invoice button in orders list**

Find the order action buttons block (around line 266-274). Currently:

```javascript
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {o.glsTrackId ? (
                    <button onClick={() => trackFromOrder(o)} style={{ background: '#C4962A', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>
                      🔍 Suivre le colis (GLS: {o.glsTrackId})
                    </button>
                  ) : (
                    <span style={{ color: '#6b7280', fontSize: 13, fontStyle: 'italic' }}>Expédition en préparation</span>
                  )}
                </div>
```

Replace with:

```javascript
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {o.glsTrackId ? (
                    <button onClick={() => trackFromOrder(o)} style={{ background: '#C4962A', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>
                      🔍 Suivre le colis (GLS: {o.glsTrackId})
                    </button>
                  ) : (
                    <span style={{ color: '#6b7280', fontSize: 13, fontStyle: 'italic' }}>Expédition en préparation</span>
                  )}
                  <a href={'/api/orders/invoice?id=' + o.id + '&email=' + encodeURIComponent(session?.email || '')} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>
                    🧾 Facture
                  </a>
                </div>
```

- [ ] **Step 3: Add email verification banner**

Find the Header section (around line 172-185). After the closing `</section>` of the header, add:

```javascript
      {/* Email verification banner */}
      {user && !user.email_confirmed_at && (
        <div style={{ background: 'rgba(251,191,36,0.1)', borderBottom: '1px solid rgba(251,191,36,0.3)', padding: '12px 24px', textAlign: 'center' }}>
          <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 600 }}>Veuillez vérifier votre adresse email. Vérifiez vos spams si vous ne trouvez pas l'email.</span>
        </div>
      )}
```

- [ ] **Step 4: Update dashboard stat for "En cours"**

Find (around line 207):
```javascript
                { label: 'En cours / Expédiées', value: orders.filter(o => o.status === 'En cours' || o.status === 'Expédié').length, icon: '🚚' },
```

Replace with:
```javascript
                { label: 'À expédier / Expédiées', value: orders.filter(o => o.status === 'À expédier' || o.status === 'Expédié').length, icon: '🚚' },
```

- [ ] **Step 5: Commit**

```bash
git add app/compte/page.js
git commit -m "feat: invoice button + email verification banner + status update in client account"
```

---

### Task 5: Add invoice button in admin order detail

**Files:**
- Modify: `app/admin/page.js`

- [ ] **Step 1: Add invoice link in order detail view**

In `/tmp/aca-wholesale/app/admin/page.js`, find the order detail view in `CommandesTab`. Look for the "GLS – Étiquette d'expédition" button (around line 660):

```javascript
        <button onClick={() => printGLSLabel(order)} className="w-full py-4 font-black text-base uppercase tracking-widest text-black rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
          🏷️ GLS – Étiquette d&apos;expédition
        </button>
```

Add right AFTER that button:

```javascript
        <a href={'/api/orders/invoice?id=' + order.id + '&email=admin'} target="_blank" rel="noopener noreferrer" className="w-full py-3 mt-2 font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
          🧾 Voir la facture
        </a>
```

Note: The `email=admin` param won't match the order email, but the admin JWT cookie will authenticate the request via `verifyAdmin`.

- [ ] **Step 2: Commit**

```bash
git add app/admin/page.js
git commit -m "feat: add invoice button in admin order detail view"
```

---

### Task 6: SQL migration + push

- [ ] **Step 1: Document SQL for user**

The user must run `supabase/error-logs.sql` in the Supabase SQL Editor.

- [ ] **Step 2: Push**

```bash
git push origin main
```

---

## Summary

| Feature | Implementation | Existing code reused |
|---------|---------------|---------------------|
| Order history | Already exists in `/compte` | Yes — no changes needed |
| Invoice PDF | New `/api/orders/invoice` route, HTML rendered | Same pattern as GLS label print page |
| Email verification | Banner in `/compte` using `user.email_confirmed_at` | Supabase Auth built-in |
| Error logs | New `lib/errorLog.js` + Supabase table | Replaces console.error in critical paths |
| Admin invoice | Button in order detail view | Same route as client invoice |
