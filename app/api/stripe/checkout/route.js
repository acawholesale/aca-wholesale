export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function POST(req) {
  try {
    const { items, customer } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 })
    }

    // Check stock availability
    const supabase = getSupabase()
    const productIds = items.map(i => i.id).filter(Boolean)
    if (productIds.length > 0) {
      const { data: products } = await supabase
        .from('products')
        .select('id, name, stock')
        .in('id', productIds)

      if (products) {
        const outOfStock = []
        for (const item of items) {
          const dbProduct = products.find(p => p.id === item.id)
          if (dbProduct && dbProduct.stock < (item.qty || 1)) {
            outOfStock.push({
              id: item.id,
              name: item.name,
              requested: item.qty || 1,
              available: dbProduct.stock,
            })
          }
        }
        if (outOfStock.length > 0) {
          return NextResponse.json({
            error: 'Stock insuffisant',
            outOfStock,
          }, { status: 400 })
        }
      }
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
    const itemsJson = JSON.stringify(
      items.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price }))
    ).slice(0, 490)

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
        itemsJson,
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id, orderId })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
