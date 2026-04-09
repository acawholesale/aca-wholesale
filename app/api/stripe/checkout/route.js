export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { logError } from '../../../../lib/errorLog'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function POST(req) {
  const supabase = getSupabase()
  const reserved = []

  try {
    const { items, customer } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    // Reserve stock atomically for each item
    for (const item of items) {
      if (!item.id) continue
      const qty = parseInt(item.qty) || 1

      const { data: success, error: rpcErr } = await supabase.rpc('reserve_stock', {
        p_id: item.id,
        p_qty: qty,
      })

      if (rpcErr || !success) {
        // Rollback all previously reserved items
        for (const r of reserved) {
          await supabase.rpc('release_stock', { p_id: r.id, p_qty: r.qty })
        }

        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single()

        return NextResponse.json({
          error: 'Stock insuffisant',
          outOfStock: [{
            id: item.id,
            name: item.name,
            requested: qty,
            available: product?.stock || 0,
          }],
        }, { status: 400 })
      }

      reserved.push({ id: item.id, qty })
    }

    // Generate order ID
    const year = new Date().getFullYear()
    const rand = String(Math.floor(Math.random() * 90000) + 10000)
    const orderId = 'ACA-' + year + '-' + rand

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description ? item.description.slice(0, 200) : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }))

    const itemsSummary = items.map(i => i.name + ' x' + i.qty).join(', ').slice(0, 490)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aca-wholesale.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customer.email,
      success_url: baseUrl + '/panier/success?session_id={CHECKOUT_SESSION_ID}&order_id=' + orderId,
      cancel_url: baseUrl + '/panier',
      metadata: {
        orderId,
        prenom: customer.prenom || '',
        nom: customer.nom || '',
        email: customer.email || '',
        telephone: (customer.telephone || '').slice(0, 30),
        adresse: (customer.adresse || '').slice(0, 200),
        ville: (customer.ville || '').slice(0, 100),
        codePostal: (customer.codePostal || '').slice(0, 20),
        pays: (customer.pays || 'France').slice(0, 50),
        activite: (customer.activite || '').slice(0, 100),
        notes: (customer.notes || '').slice(0, 490),
        itemsSummary,
      },
    })

    // Save reservation with full items data (no truncation)
    await supabase.from('stock_reservations').insert({
      stripe_session_id: session.id,
      order_id: orderId,
      items_json: items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      customer_json: customer,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id, orderId })
  } catch (error) {
    for (const r of reserved) {
      await supabase.rpc('release_stock', { p_id: r.id, p_qty: r.qty }).catch(() => {})
    }
    logError('checkout', 'Stripe checkout error: ' + error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
