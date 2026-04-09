export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendShippingNotification, sendAdminOrderNotification, sendOrderConfirmation } from '../../../../lib/emails'

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

  // 3. Auto-create GLS shipment
  try {
    const glsOrder = {
      id: orderId,
      client: {
        nom: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
        entreprise: meta.entreprise || '',
        adresse: meta.adresse || '',
        ville: meta.ville || '',
        codePostal: meta.codePostal || '',
        pays: meta.pays || 'FR',
        email: meta.email || '',
        tel: meta.telephone || '',
      },
      weight: parseFloat(meta.weight) || 2,
      lots: meta.itemsSummary || items.map(i => i.name + ' x' + i.qty).join(', '),
      montant: totalAmount,
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aca-wholesale.vercel.app'
    const glsRes = await fetch(baseUrl + '/api/gls/create-shipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: glsOrder, deliveryType: meta.deliveryType || 'standard' }),
    })

    const glsData = await glsRes.json()

    if (glsData.success) {
      await supabase
        .from('orders')
        .update({
          gls_track_id: glsData.trackID || null,
          gls_label_base64: glsData.labelBase64 || null,
          gls_label_url: glsData.trackingUrl || null,
          status: 'En préparation',
        })
        .eq('id', orderId)

      try {
        if (meta.email && glsData.trackID) {
          await sendShippingNotification({
            email: meta.email,
            prenom: meta.prenom || '',
            orderId,
            trackID: glsData.trackID,
            trackingUrl: glsData.trackingUrl,
          })
        }
      } catch (emailErr) {
        console.error('Shipping email error:', emailErr.message)
      }
    } else {
      console.error('GLS error:', glsData.error)
    }
  } catch (glsError) {
    console.error('GLS auto-shipment error:', glsError.message)
  }
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
      status: 'Payé',
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

    // Emails + GLS — run async, don't block response
    const postOrderMeta = {
      prenom: meta.prenom || '',
      nom: meta.nom || '',
      email: meta.email || session.customer_email || '',
      telephone: meta.telephone || '',
      adresse: meta.adresse || '',
      ville: meta.ville || '',
      codePostal: meta.codePostal || '',
      pays: meta.pays || 'France',
      activite: meta.activite || '',
      notes: meta.notes || '',
      itemsSummary: meta.itemsSummary || '',
      entreprise: meta.entreprise || '',
      weight: meta.weight || '2',
      deliveryType: meta.deliveryType || 'standard',
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
