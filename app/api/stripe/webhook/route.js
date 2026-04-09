export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendShippingNotification, sendAdminOrderNotification, sendOrderConfirmation } from '../../../../lib/emails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )
}

// Required for raw body access in App Router
export const runtime = 'nodejs'

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const meta = session.metadata || {}

    const orderId = meta.orderId || ('ACA-' + Date.now())
    const totalAmount = (session.amount_total || 0) / 100

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
      items_json: meta.itemsJson || '[]',
      total: totalAmount,
      gls_track_id: null,
      gls_label_base64: null,
      gls_label_url: null,
    }

    const supabase = getSupabase()

    // Save order to Supabase
    const { error: dbError } = await supabase
      .from('orders')
      .upsert([orderData], { onConflict: 'id' })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

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

    // Notify admin of new order
    try {
      await sendAdminOrderNotification({
        orderId,
        clientName: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
        email: meta.email || session.customer_email || '',
        total: totalAmount,
        items: meta.itemsSummary || '',
      })
    } catch (adminEmailErr) {
      console.error('Admin notification email error:', adminEmailErr.message)
    }

    // Send order confirmation to customer
    try {
      const customerEmail = meta.email || session.customer_email
      if (customerEmail) {
        let items = []
        try { items = JSON.parse(meta.itemsJson || '[]') } catch {}
        await sendOrderConfirmation({
          email: customerEmail,
          prenom: meta.prenom || '',
          orderId,
          items: items.length > 0 ? items : (meta.itemsSummary || ''),
          total: totalAmount,
        })
      }
    } catch (confirmEmailErr) {
      console.error('Order confirmation email error:', confirmEmailErr.message)
    }

    // Auto-create GLS shipment
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
          email: meta.email || session.customer_email || '',
          tel: meta.telephone || '',
        },
        weight: parseFloat(meta.weight) || 2,
        lots: meta.itemsSummary || '',
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

        // Send shipping notification email to customer
        try {
          const customerEmail = meta.email || session.customer_email
          if (customerEmail && glsData.trackID) {
            await sendShippingNotification({
              email: customerEmail,
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
      // Don't fail the webhook — order is saved, GLS label can be created manually
    }
  }

  return NextResponse.json({ received: true })
}
