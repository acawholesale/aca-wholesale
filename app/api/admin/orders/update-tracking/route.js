export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../../lib/adminAuth'
import { sendShippingNotification } from '../../../../../lib/emails'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

// PATCH /api/admin/orders/update-tracking
// Body: { orderId, glsTrackId, status }
export async function PATCH(req) {
  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const body = await req.json()
    const { orderId, glsTrackId, status } = body

    if (!orderId) {
      return NextResponse.json({ error: 'orderId requis' }, { status: 400 })
    }

    const supabase = getSupabase()
    const updates = { updated_at: new Date().toISOString() }
    if (glsTrackId !== undefined) updates.gls_track_id = glsTrackId
    if (status !== undefined) updates.status = status

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error

    // Send shipping notification when tracking is added
    if (glsTrackId && data?.email) {
      try {
        await sendShippingNotification({
          email: data.email,
          prenom: data.prenom || '',
          orderId,
          trackID: glsTrackId,
          trackingUrl: 'https://gls-group.eu/track/' + glsTrackId,
        })
      } catch (emailErr) {
        console.error('Shipping email error:', emailErr.message)
      }
    }

    return NextResponse.json({ success: true, order: data })
  } catch (err) {
    console.error('update-tracking error:', err)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du suivi' }, { status: 500 })
  }
}

// GET /api/admin/orders/update-tracking?cleanup=reservations — cron endpoint
// GET /api/admin/orders/update-tracking?limit=50&offset=0 — list orders
export async function GET(req) {
  const { searchParams } = new URL(req.url)

  // Cron cleanup: called by Vercel Cron or manually
  if (searchParams.get('cleanup') === 'reservations') {
    const authHeader = req.headers.get('authorization')
    const auth = verifyAdmin(req)
    const isCron = authHeader === `Bearer ${process.env.CRON_SECRET}`
    if (!auth.authenticated && !isCron) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    const supabase = getSupabase()
    const cutoff = new Date(Date.now() - 35 * 60 * 1000).toISOString()
    const { data: stale } = await supabase
      .from('stock_reservations')
      .select('*')
      .eq('expired', false)
      .lt('created_at', cutoff)
    if (!stale || stale.length === 0) return NextResponse.json({ cleaned: 0 })
    let cleaned = 0
    for (const reservation of stale) {
      for (const item of (reservation.items_json || [])) {
        if (item.id) {
          await supabase.rpc('release_stock', { p_id: item.id, p_qty: parseInt(item.qty) || 1 })
        }
      }
      await supabase.from('stock_reservations').update({ expired: true }).eq('id', reservation.id)
      cleaned++
    }
    return NextResponse.json({ cleaned })
  }

  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')

    const supabase = getSupabase()
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) query = query.eq('status', status)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ orders: data || [], total: count })
  } catch (err) {
    console.error('list orders error:', err)
    return NextResponse.json({ error: 'Erreur lors de la récupération des commandes' }, { status: 500 })
  }
}
