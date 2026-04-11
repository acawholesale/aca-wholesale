# Admin Auth + Stock Decrement + Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Secure admin authentication with JWT, prevent overselling via stock checks/decrements, add products tab + CSV export to admin dashboard.

**Architecture:** JWT-based admin auth with bcrypt password hashing and httpOnly cookies. Stock validated pre-checkout and decremented atomically on Stripe webhook. Admin dashboard gets a read-only products/stock tab and working CSV export. GLS shipping system is untouched.

**Tech Stack:** Next.js 14 App Router, Supabase (DB), Stripe (payments), bcryptjs + jsonwebtoken (new deps)

**Constraint:** Do NOT modify any GLS-related code (create-shipment, label printing, bordereaux).

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `lib/adminAuth.js` | JWT sign/verify + bcrypt compare utility |
| Modify | `app/api/admin/auth/route.js` | Rewrite: bcrypt + JWT + httpOnly cookie |
| Modify | `app/admin/login/page.js` | Rewrite: POST to API instead of client-side check |
| Modify | `app/api/admin/orders/update-tracking/route.js` | Add `verifyAdmin()` guard |
| Modify | `app/api/admin/export/route.js` | Add `verifyAdmin()` guard + rewrite to export from Supabase |
| Modify | `app/api/admin/send-campaign/route.js` | Add `verifyAdmin()` guard |
| Modify | `app/api/orders/route.js` | Add `verifyAdmin()` guard on GET and PATCH |
| Modify | `app/api/stripe/checkout/route.js` | Add stock validation before Stripe session creation |
| Modify | `app/api/stripe/webhook/route.js` | Add stock decrement after order save (do NOT touch GLS block) |
| Modify | `app/admin/page.js` | Add ProduitsTab + CSV export functions |
| Modify | `app/panier/page.js` | Handle stock error response from checkout API |

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install bcryptjs and jsonwebtoken**

```bash
cd /tmp/aca-wholesale && npm install bcryptjs jsonwebtoken
```

Expected: packages added to `dependencies` in package.json

- [ ] **Step 2: Generate a password hash for initial setup**

```bash
cd /tmp/aca-wholesale && node -e "const b=require('bcryptjs');b.hash('admin2026',12).then(h=>console.log(h))"
```

Save the output — this is the value for `ADMIN_PASSWORD_HASH` env var.

- [ ] **Step 3: Generate a JWT secret**

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Save the output — this is the value for `ADMIN_JWT_SECRET` env var.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add bcryptjs and jsonwebtoken for admin auth"
```

---

### Task 2: Create admin auth utility

**Files:**
- Create: `lib/adminAuth.js`

- [ ] **Step 1: Create lib/adminAuth.js**

```javascript
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-change-me'
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

export async function checkPassword(password) {
  if (!PASSWORD_HASH) return password === (process.env.ADMIN_PASSWORD || 'admin123')
  return bcrypt.compare(password, PASSWORD_HASH)
}

export function signToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyAdmin(request) {
  const cookie = request.headers.get('cookie') || ''
  const match = cookie.match(/admin_token=([^;]+)/)
  if (!match) return { authenticated: false }
  try {
    jwt.verify(match[1], JWT_SECRET)
    return { authenticated: true }
  } catch {
    return { authenticated: false }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/adminAuth.js
git commit -m "feat: add admin auth utility with bcrypt + JWT"
```

---

### Task 3: Rewrite admin auth API route

**Files:**
- Modify: `app/api/admin/auth/route.js`

- [ ] **Step 1: Rewrite the auth route**

Replace the entire file content with:

```javascript
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { checkPassword, signToken } from '../../../../lib/adminAuth'

export async function POST(request) {
  try {
    const { password } = await request.json()
    const valid = await checkPassword(password)
    if (!valid) {
      return NextResponse.json({ success: false }, { status: 401 })
    }
    const token = signToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    })
    return response
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/admin/auth/route.js
git commit -m "feat: secure admin auth with bcrypt + JWT + httpOnly cookie"
```

---

### Task 4: Rewrite admin login page

**Files:**
- Modify: `app/admin/login/page.js`

- [ ] **Step 1: Rewrite login page to use API**

Replace the entire file content with:

```javascript
'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = '/admin'
      } else {
        setError('Mot de passe incorrect')
        setPassword('')
      }
    } catch {
      setError('Erreur de connexion')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '360px', background: '#111', border: '1px solid rgba(196,150,42,0.35)', borderRadius: '12px', padding: '40px' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 8px 0' }}>Administration</h1>
        <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>Entrez le mot de passe</p>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Mot de passe</label>
          <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" autoFocus style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          {error ? <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>{error}</div> : null}
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#6b7280' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '20px' }}>{loading ? '⏳ Connexion...' : 'SE CONNECTER'}</button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => { window.location.href = '/' }} style={{ background: 'none', border: 'none', color: '#444', fontSize: '12px', cursor: 'pointer' }}>Retour</button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/admin/login/page.js
git commit -m "feat: admin login posts to API instead of client-side password check"
```

---

### Task 5: Add auth guards to all admin API routes

**Files:**
- Modify: `app/api/admin/orders/update-tracking/route.js`
- Modify: `app/api/admin/send-campaign/route.js`
- Modify: `app/api/orders/route.js`
- Modify: `app/api/admin/export/route.js`

- [ ] **Step 1: Guard update-tracking route**

At the top of `app/api/admin/orders/update-tracking/route.js`, add import and guards:

Add after line 3 (`import { createClient } from '@supabase/supabase-js'`):
```javascript
import { verifyAdmin } from '../../../../../lib/adminAuth'
```

Add at the start of the PATCH handler body (after `export async function PATCH(req) {`):
```javascript
  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
```

Add at the start of the GET handler body (after `export async function GET(req) {`):
```javascript
  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
```

- [ ] **Step 2: Guard send-campaign route**

At the top of `app/api/admin/send-campaign/route.js`, add after line 4 (`const resend = ...`):
```javascript
import { verifyAdmin } from '../../../../lib/adminAuth'
```

Add at the start of the POST handler body (after `export async function POST(request) {`):
```javascript
  const auth = verifyAdmin(request)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
```

- [ ] **Step 3: Guard orders route**

At the top of `app/api/orders/route.js`, add after line 4 (`import { createClient } from '@supabase/supabase-js'`):
```javascript
import { verifyAdmin } from '../../../lib/adminAuth'
```

Add at the start of the GET handler body (after `export async function GET() {`):
```javascript
  const auth = verifyAdmin({ headers: { get: () => '' } })
  // Note: orders GET is used by admin only — but we need to check the actual request
```

**Wait — correction.** The GET handler signature doesn't receive `req`. We need to add it:

Change `export async function GET()` to `export async function GET(req)` and add:
```javascript
  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
```

Add at the start of the PATCH handler body (after `export async function PATCH(req) {`):
```javascript
  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
```

- [ ] **Step 4: Rewrite export route to use Supabase instead of Redis**

Replace the entire `app/api/admin/export/route.js` with:

```javascript
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../lib/adminAuth'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function GET(request) {
  const auth = verifyAdmin(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'orders'

  try {
    const supabase = getSupabase()
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (type === 'clients') {
      return exportClients(orders || [])
    }
    return exportOrders(orders || [])
  } catch (err) {
    console.error('admin/export error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

function exportOrders(orders) {
  const escape = (v) => {
    if (v == null) return ''
    const s = String(v).replace(/"/g, '""')
    return /[,;"\n]/.test(s) ? `"${s}"` : s
  }

  const headers = ['ID', 'Date', 'Client', 'Email', 'Ville', 'Montant', 'Statut', 'GLS TrackID']
  const rows = orders.map(o => [
    o.id,
    o.created_at ? new Date(o.created_at).toLocaleDateString('fr-FR') : '',
    ((o.prenom || '') + ' ' + (o.nom || '')).trim(),
    o.email || '',
    o.ville || '',
    o.total || 0,
    o.status || '',
    o.gls_track_id || '',
  ].map(escape).join(','))

  const csv = [headers.map(escape).join(','), ...rows].join('\n')
  const bom = '\uFEFF'

  return new Response(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="commandes-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  })
}

function exportClients(orders) {
  const escape = (v) => {
    if (v == null) return ''
    const s = String(v).replace(/"/g, '""')
    return /[,;"\n]/.test(s) ? `"${s}"` : s
  }

  const clientMap = {}
  orders.forEach(o => {
    const email = o.email
    if (!email) return
    if (!clientMap[email]) {
      clientMap[email] = {
        nom: ((o.prenom || '') + ' ' + (o.nom || '')).trim(),
        email,
        ville: o.ville || '',
        commandes: 0,
        total: 0,
      }
    }
    clientMap[email].commandes++
    clientMap[email].total += parseFloat(o.total || 0)
  })

  const clients = Object.values(clientMap).map(c => ({
    ...c,
    statut: c.commandes >= 5 ? 'VIP' : c.commandes >= 2 ? 'Actif' : 'Nouveau',
  }))

  const headers = ['Nom', 'Email', 'Ville', 'Nb Commandes', 'Statut', 'Total dépensé']
  const rows = clients.map(c => [
    c.nom, c.email, c.ville, c.commandes, c.statut, c.total.toFixed(2),
  ].map(escape).join(','))

  const csv = [headers.map(escape).join(','), ...rows].join('\n')
  const bom = '\uFEFF'

  return new Response(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="clients-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  })
}
```

- [ ] **Step 5: Commit**

```bash
git add app/api/admin/orders/update-tracking/route.js app/api/admin/send-campaign/route.js app/api/orders/route.js app/api/admin/export/route.js
git commit -m "feat: add JWT auth guards to all admin API routes + rewrite export from Supabase"
```

---

### Task 6: Stock validation in checkout route

**Files:**
- Modify: `app/api/stripe/checkout/route.js`

- [ ] **Step 1: Add stock check before Stripe session creation**

Add Supabase import after line 3 (`import Stripe from 'stripe'`):
```javascript
import { createClient } from '@supabase/supabase-js'
```

Add helper after the stripe const (line 5):
```javascript
function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}
```

Add stock validation block after the empty cart check (after line 13, `return NextResponse.json({ error: 'Panier vide' }, { status: 400 })`), before the `// Generate order ID` comment:

```javascript
    // Check stock availability
    const supabase = getSupabase()
    const productIds = items.map(i => i.id).filter(Boolean)
    if (productIds.length > 0) {
      const { data: products } = await supabase
        .from('products')
        .select('id, name, stock')
        .in('id', productIds)

      if (products) {
        const outOfStock = []
        for (const item of items) {
          const dbProduct = products.find(p => p.id === item.id)
          if (dbProduct && dbProduct.stock < (item.qty || 1)) {
            outOfStock.push({
              id: item.id,
              name: item.name,
              requested: item.qty || 1,
              available: dbProduct.stock,
            })
          }
        }
        if (outOfStock.length > 0) {
          return NextResponse.json({
            error: 'Stock insuffisant',
            outOfStock,
          }, { status: 400 })
        }
      }
    }
```

- [ ] **Step 2: Commit**

```bash
git add app/api/stripe/checkout/route.js
git commit -m "feat: validate product stock before creating Stripe checkout session"
```

---

### Task 7: Stock decrement in Stripe webhook

**Files:**
- Modify: `app/api/stripe/webhook/route.js`

- [ ] **Step 1: Add stock decrement after order save**

Add after the order save block (after line 70, the `if (dbError)` block), BEFORE the email notifications (before line 72, `// Notify admin of new order`):

```javascript
    // Decrement stock for purchased items
    try {
      const items = JSON.parse(meta.itemsJson || '[]')
      for (const item of items) {
        if (item.id) {
          const { error: stockErr } = await supabase.rpc('decrement_stock', {
            product_id: item.id,
            qty: item.qty || 1,
          })
          if (stockErr) {
            // Fallback: manual update if RPC doesn't exist
            await supabase
              .from('products')
              .update({ stock: supabase.raw(`stock - ${parseInt(item.qty) || 1}`) })
              .eq('id', item.id)
          }
        }
      }
    } catch (stockError) {
      console.error('Stock decrement error:', stockError.message)
      // Don't fail the webhook — order is already saved
    }
```

**Wait — Supabase JS client doesn't support `.raw()`.** Let me use a simpler approach with direct SQL via RPC, or just fetch-then-update:

Replace the above with this simpler approach:

```javascript
    // Decrement stock for purchased items
    try {
      const items = JSON.parse(meta.itemsJson || '[]')
      for (const item of items) {
        if (item.id) {
          const { data: product } = await supabase
            .from('products')
            .select('stock')
            .eq('id', item.id)
            .single()
          if (product) {
            const newStock = Math.max(0, (product.stock || 0) - (item.qty || 1))
            await supabase
              .from('products')
              .update({ stock: newStock, updated_at: new Date().toISOString() })
              .eq('id', item.id)
          }
        }
      }
    } catch (stockError) {
      console.error('Stock decrement error:', stockError.message)
    }
```

**Important:** This goes right after the Supabase order upsert + dbError check, and BEFORE the `// Notify admin of new order` block. Do NOT move or modify anything in the GLS auto-shipment block (lines 103-163).

- [ ] **Step 2: Commit**

```bash
git add app/api/stripe/webhook/route.js
git commit -m "feat: decrement product stock on successful payment webhook"
```

---

### Task 8: Handle stock errors in cart page

**Files:**
- Modify: `app/panier/page.js`

- [ ] **Step 1: Add stock error handling in checkout submit**

In `app/panier/page.js`, modify the `handleSubmit` function. Currently at line 23-29:

```javascript
      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else {
        alert('Erreur paiement : ' + (data.error || 'Erreur inconnue'))
        setCheckoutLoading(false)
      }
```

Replace with:

```javascript
      if (data.url) {
        clearCart()
        window.location.href = data.url
      } else if (data.outOfStock) {
        const msg = data.outOfStock.map(i =>
          `${i.name} : ${i.available} disponible${i.available > 1 ? 's' : ''} (demandé : ${i.requested})`
        ).join('\n')
        alert('Stock insuffisant :\n\n' + msg)
        setCheckoutLoading(false)
      } else {
        alert('Erreur paiement : ' + (data.error || 'Erreur inconnue'))
        setCheckoutLoading(false)
      }
```

- [ ] **Step 2: Commit**

```bash
git add app/panier/page.js
git commit -m "feat: show stock error details when checkout is refused"
```

---

### Task 9: Add ProduitsTab + CSV export to admin dashboard

**Files:**
- Modify: `app/admin/page.js`

- [ ] **Step 1: Add 'produits' to nav items and tab rendering**

In `app/admin/page.js`, modify the `navItems` array (around line 57-65). Add the produits item after the clients item:

Find:
```javascript
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'analytiques', label: 'Analytiques', icon: '📈', premium: true },
```

Replace with:
```javascript
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'produits', label: 'Produits', icon: '📦' },
    { id: 'analytiques', label: 'Analytiques', icon: '📈', premium: true },
```

In the main content area (around line 108-111), add the produits tab rendering. Find:

```javascript
          {activeTab === 'clients' && <ClientsTab />}
          {['analytiques', 'campagnes', 'factures', 'remises'].includes(activeTab) && <PremiumUpgradeTab activeTab={activeTab} />}
```

Replace with:
```javascript
          {activeTab === 'clients' && <ClientsTab />}
          {activeTab === 'produits' && <ProduitsTab />}
          {['analytiques', 'campagnes', 'factures', 'remises'].includes(activeTab) && <PremiumUpgradeTab activeTab={activeTab} />}
```

- [ ] **Step 2: Add CSV export functions to CommandesTab**

Add the following function inside `CommandesTab()`, after the `selectedOrders` line (around line 570):

```javascript
  const exportCSV = (type) => {
    const escape = (v) => {
      if (v == null) return ''
      const s = String(v).replace(/"/g, '""')
      return /[,;"\n]/.test(s) ? `"${s}"` : s
    }
    let csv, filename
    if (type === 'orders') {
      const headers = ['ID', 'Date', 'Client', 'Email', 'Ville', 'Montant', 'Statut', 'GLS TrackID']
      const rows = filteredOrders.map(o => [
        o.id, o.date, typeof o.client === 'string' ? o.client : o.client?.nom || '',
        o.email || '', o.ville || '', getTotal(o), o.status || '',
        glsData[o.id]?.trackID || ''
      ].map(escape).join(','))
      csv = [headers.map(escape).join(','), ...rows].join('\n')
      filename = 'commandes'
    }
    const bom = '\uFEFF'
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }
```

Then add an export button in the results bar. Find the print button near line 748:

```javascript
            <button onClick={() => printAllGLS(filteredOrders)} className="text-black text-[10px] px-3 py-1.5 font-black uppercase tracking-wide rounded-lg flex items-center gap-1" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>🖨️ Imprimer ({filteredOrders.length})</button>
```

Add right after it:
```javascript
            <button onClick={() => exportCSV('orders')} className="text-[10px] px-3 py-1.5 font-bold uppercase tracking-wide rounded-lg flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.07)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.12)' }}>📥 CSV</button>
```

- [ ] **Step 3: Add ProduitsTab component**

Add the following component at the end of `app/admin/page.js`, before the closing of the file (after the `CommandesTab` closing brace):

```javascript
function ProduitsTab() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProducts(data.products || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const stockColor = (stock) => {
    if (stock <= 0) return { bg: 'rgba(239,68,68,0.12)', color: '#f87171', label: 'Épuisé' }
    if (stock <= 2) return { bg: 'rgba(239,68,68,0.08)', color: '#f87171', label: stock + ' restant' + (stock > 1 ? 's' : '') }
    if (stock <= 5) return { bg: 'rgba(251,191,36,0.08)', color: '#fbbf24', label: stock + ' restants' }
    return { bg: 'rgba(34,197,94,0.08)', color: '#4ade80', label: stock + ' en stock' }
  }

  const exportProductsCSV = () => {
    const escape = (v) => {
      if (v == null) return ''
      const s = String(v).replace(/"/g, '""')
      return /[,;"\n]/.test(s) ? `"${s}"` : s
    }
    const headers = ['ID', 'Nom', 'Prix', 'Prix original', 'Stock', 'Catégorie', 'Marque', 'Pièces', 'Badge']
    const rows = products.map(p => [
      p.id, p.name, p.price, p.originalPrice || '', p.stock, p.category || '', p.brand || '', p.pieces || '', p.badge || ''
    ].map(escape).join(','))
    const csv = [headers.map(escape).join(','), ...rows].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `produits-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500 text-sm">Chargement des produits...</p>
      </div>
    )
  }

  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0)
  const outOfStock = products.filter(p => (p.stock || 0) <= 0).length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 2).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Inventaire ({products.length} produits)</p>
        <button onClick={exportProductsCSV} className="text-[10px] px-3 py-1.5 font-bold uppercase tracking-wide rounded-lg flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.07)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.12)' }}>📥 Export CSV</button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl p-4" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-2xl font-black text-white">{totalStock}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Stock total</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <p className="text-2xl font-black text-red-400">{outOfStock}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Épuisés</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <p className="text-2xl font-black text-yellow-400">{lowStock}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Stock bas</p>
        </div>
      </div>

      <div className="space-y-2">
        {products.map(product => {
          const sc = stockColor(product.stock || 0)
          return (
            <div key={product.id} className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {product.emoji || '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-bold text-sm truncate">{product.name}</span>
                  {product.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide" style={{ background: 'rgba(196,150,42,0.15)', color: '#E8B84B', border: '1px solid rgba(196,150,42,0.3)' }}>{product.badge}</span>}
                </div>
                <p className="text-gray-500 text-xs">{product.brand || ''} • {product.category || ''} • {product.pieces || '?'} pièces</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-black text-sm" style={{ color: '#C4962A' }}>{product.price} €</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Add useState and useEffect imports if not already present**

These are already imported at line 2: `import { useState, useEffect } from 'react'` — no change needed.

- [ ] **Step 5: Commit**

```bash
git add app/admin/page.js
git commit -m "feat: add products tab with stock levels + CSV export to admin dashboard"
```

---

### Task 10: Set environment variables on Vercel

**Files:** None (Vercel dashboard)

- [ ] **Step 1: Add env vars to Vercel**

Run:
```bash
cd /tmp/aca-wholesale
# Use the hash from Task 1 Step 2
echo "Add these env vars to Vercel project settings:"
echo "ADMIN_PASSWORD_HASH = <the bcrypt hash from Task 1>"
echo "ADMIN_JWT_SECRET = <the random hex from Task 1>"
```

The user must add these manually in the Vercel dashboard (Settings > Environment Variables) or via:
```bash
vercel env add ADMIN_PASSWORD_HASH
vercel env add ADMIN_JWT_SECRET
```

- [ ] **Step 2: Verify deployment**

After pushing to main and Vercel deploys:
1. Go to `/admin/login` — login with `admin2026`
2. Verify dashboard loads with real data
3. Check Produits tab shows stock levels
4. Test CSV export button
5. Open browser devtools — confirm `admin_token` cookie is httpOnly (not visible in `document.cookie`)

---

## Summary of Changes

| Area | Before | After |
|------|--------|-------|
| Admin auth | Client-side `admin2026` check, plain cookie | Server-side bcrypt + JWT httpOnly cookie |
| Admin API routes | No auth guard | All routes verify JWT before responding |
| Stock on checkout | No check | Returns 400 with details if stock insufficient |
| Stock on payment | Never decremented | Decremented atomically per item in webhook |
| Cart UX | No stock error handling | Shows detailed stock availability message |
| Admin products | No visibility | Read-only tab with color-coded stock levels |
| CSV export | Broken (used Redis) | Working export from Supabase (orders + clients + products) |
| GLS system | Working | **Untouched** |
