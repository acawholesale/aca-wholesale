export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendAdminOrderNotification, sendOrderConfirmation } from '../../../../lib/emails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export const runtime = 'nodejs'

async function handlePostOrder(supabase, orderId, meta, items, totalAmount) {
  // 1. Send admin notification email
  try {
    await sendAdminOrderNotification({
      orderId,
      clientName: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
      email: meta.email || '',
      total: totalAmount,
      items: meta.itemsSummary || items.map(i => i.name + ' x' + i.qty).join(', '),
    })
  } catch (err) {
    console.error('Admin notification email error:', err.message)
  }

  // 2. Send order confirmation to customer
  try {
    if (meta.email) {
      await sendOrderConfirmation({
        email: meta.email,
        prenom: meta.prenom || '',
        orderId,
        items: items.length > 0 ? items : (meta.itemsSummary || ''),
        total: totalAmount,
      })
    }
  } catch (err) {
    console.error('Order confirmation email error:', err.message)
  }

  // GLS shipment is NOT created here — admin reviews and creates it manually from the dashboard
}

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabase()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const meta = session.metadata || {}
    const orderId = meta.orderId || ('ACA-' + Date.now())
    const totalAmount = (session.amount_total || 0) / 100

    // Idempotency: skip if order already exists
    const { data: existing } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_session_id', session.id)
      .single()

    if (existing) {
      return NextResponse.json({ received: true })
    }

    // Fetch reservation to get full items data
    let items = []
    const { data: reservation } = await supabase
      .from('stock_reservations')
      .select('items_json')
      .eq('stripe_session_id', session.id)
      .single()

    if (reservation) {
      items = reservation.items_json || []
    }

    // Save order
    const orderData = {
      id: orderId,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent || null,
      status: 'À expédier',
      prenom: meta.prenom || '',
      nom: meta.nom || '',
      email: meta.email || session.customer_email || '',
      telephone: meta.telephone || '',
      adresse: meta.adresse || '',
      ville: meta.ville || '',
      code_postal: meta.codePostal || '',
      pays: meta.pays || 'France',
      activite: meta.activite || '',
      notes: meta.notes || '',
      items_summary: meta.itemsSummary || '',
      items_json: JSON.stringify(items),
      total: totalAmount,
      gls_track_id: null,
      gls_label_base64: null,
      gls_label_url: null,
    }

    const { error: dbError } = await supabase
      .from('orders')
      .upsert([orderData], { onConflict: 'id' })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // Mark reservation as consumed (stock already decremented at checkout)
    await supabase
      .from('stock_reservations')
      .update({ expired: true })
      .eq('stripe_session_id', session.id)

    // Emails — run async, don't block Stripe response
    const postOrderMeta = {
      prenom: meta.prenom || '',
      nom: meta.nom || '',
      email: meta.email || session.customer_email || '',
      itemsSummary: meta.itemsSummary || '',
    }

    // Fire and forget — don't await, don't block Stripe response
    handlePostOrder(supabase, orderId, postOrderMeta, items, totalAmount)
      .catch(err => console.error('Post-order error:', err.message))

    return NextResponse.json({ received: true })
  }

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object

    const { data: reservation } = await supabase
      .from('stock_reservations')
      .select('*')
      .eq('stripe_session_id', session.id)
      .eq('expired', false)
      .single()

    if (reservation) {
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
    }

    return NextResponse.json({ received: true })
  }

  return NextResponse.json({ received: true })
}
