export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

// GET /api/orders/customer?email=xxx
// Returns all orders for a given customer email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const orderId = searchParams.get('orderId')

    if (!email && !orderId) {
      return NextResponse.json({ error: 'email or orderId required' }, { status: 400 })
    }

    const supabase = getSupabase()
    let query = supabase
      .from('orders')
      .select('id,prenom,nom,email,status,total,items_summary,items_json,adresse,ville,code_postal,pays,gls_track_id,gls_label_url,created_at')
      .order('created_at', { ascending: false })

    if (orderId) {
      query = query.eq('id', orderId)
    } else {
      query = query.ilike('email', email.trim())
    }

    const { data, error } = await query

    if (error) throw error

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
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
