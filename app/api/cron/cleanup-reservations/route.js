export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function GET(req) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
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
