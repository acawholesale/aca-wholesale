import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )
}

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform to match admin panel format
    const orders = (data || []).map(o => ({
      id: o.id,
      client: ((o.prenom || '') + ' ' + (o.nom || '')).trim(),
      email: o.email || '',
      telephone: o.telephone || '',
      adresse: o.adresse || '',
      ville: o.ville || '',
      codePostal: o.code_postal || '',
      pays: o.pays || 'France',
      lots: o.items_summary || '',
      montant: o.total || 0,
      statut: o.status || 'Payé',
      date: new Date(o.created_at).toLocaleDateString('fr-FR'),
      notes: o.notes || '',
      activite: o.activite || '',
      glsTrackId: o.gls_track_id || null,
      glsLabelBase64: o.gls_label_base64 || null,
      glsLabelUrl: o.gls_label_url || null,
      stripeSessionId: o.stripe_session_id || null,
      paymentIntentId: o.stripe_payment_intent || null,
    }))

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Orders GET error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const { id, updates } = await req.json()
    const supabase = getSupabase()

    const dbUpdates = {}
    if (updates.statut !== undefined) dbUpdates.status = updates.statut
    if (updates.glsTrackId !== undefined) dbUpdates.gls_track_id = updates.glsTrackId
    if (updates.glsLabelBase64 !== undefined) dbUpdates.gls_label_base64 = updates.glsLabelBase64
    if (updates.glsLabelUrl !== undefined) dbUpdates.gls_label_url = updates.glsLabelUrl

    const { error } = await supabase
      .from('orders')
      .update(dbUpdates)
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Orders PATCH error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
