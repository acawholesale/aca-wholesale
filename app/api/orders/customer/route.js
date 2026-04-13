export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../lib/adminAuth'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

// Verify Supabase auth token and return user email
async function getAuthenticatedEmail(req) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace('Bearer ', '')
  if (!token) return null
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return null
  return user.email
}

// GET /api/orders/customer?email=xxx
// Returns all orders for the authenticated customer, or any customer for admin
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const orderId = searchParams.get('orderId')
    const sessionId = searchParams.get('session_id')

    if (!email && !orderId && !sessionId) {
      return NextResponse.json({ error: 'email, orderId, or session_id required' }, { status: 400 })
    }

    // Auth check: must be logged-in customer or admin
    // Exception: session_id lookup is allowed without auth (proof of payment)
    const admin = verifyAdmin(req)
    const authenticatedEmail = await getAuthenticatedEmail(req)

    if (!admin.authenticated && !authenticatedEmail && !sessionId) {
      return NextResponse.json({ error: 'Authentification requise' }, { status: 401 })
    }

    // Non-admin can only query their own orders
    if (!admin.authenticated) {
      if (email && email.toLowerCase() !== authenticatedEmail.toLowerCase()) {
        return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 })
      }
    }

    const supabase = getSupabase()
    let query = supabase
      .from('orders')
      .select('id,prenom,nom,email,status,total,items_summary,items_json,adresse,ville,code_postal,pays,gls_track_id,gls_label_url,created_at')
      .order('created_at', { ascending: false })

    if (sessionId) {
      query = query.eq('stripe_session_id', sessionId).limit(1)
    } else if (orderId) {
      query = query.eq('id', orderId)
    } else {
      // Non-admin: force query to their own email only
      query = query.ilike('email', admin.authenticated ? email.trim() : authenticatedEmail)
    }

    const { data, error } = await query

    if (error) throw error

    // Non-admin querying by orderId: verify they own the order
    if (orderId && !admin.authenticated && data?.length > 0) {
      const order = data[0]
      if (order.email?.toLowerCase() !== authenticatedEmail.toLowerCase()) {
        return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 })
      }
    }

    const orders = (data || []).map(o => ({
      id: o.id,
      client: ((o.prenom || '') + ' ' + (o.nom || '')).trim(),
      email: o.email || '',
      status: o.status || 'Payé',
      total: o.total || 0,
      items: (() => { try { return JSON.parse(o.items_json || '[]') } catch { return [] } })(),
      itemsSummary: o.items_summary || '',
      adresse: o.adresse || '',
      ville: o.ville || '',
      codePostal: o.code_postal || '',
      pays: o.pays || 'France',
      glsTrackId: o.gls_track_id || null,
      glsLabelUrl: o.gls_label_url || null,
      date: o.created_at ? new Date(o.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
      createdAt: o.created_at,
    }))

    return NextResponse.json({ orders })
  } catch (err) {
    console.error('Customer orders error:', err)
    return NextResponse.json({ error: 'Erreur lors de la récupération des commandes' }, { status: 500 })
  }
}
