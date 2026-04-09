export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../../lib/adminAuth'

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

    return NextResponse.json({ success: true, order: data })
  } catch (err) {
    console.error('update-tracking error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// GET /api/admin/orders/update-tracking?limit=50&offset=0
export async function GET(req) {
  const auth = verifyAdmin(req)
  if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
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
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
