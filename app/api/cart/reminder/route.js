export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import redis from '../../../../lib/redis'
import {
  emailReminder1h,
  emailReminder8h,
  emailReminder16h,
  emailReminder24h,
} from '../../../../lib/emailTemplates'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM = process.env.RESEND_FROM || 'ACA Wholesale <noreply@aca-wholesale.fr>'

async function sendEmail(to, { subject, html }) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY non configurée — email non envoyé')
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: RESEND_FROM, to, subject, html }),
  })
  if (!res.ok) {
    console.error('Resend error:', await res.text())
  }
}

export async function POST(request) {
  try {
    // Vérification du secret CRON (header OU body pour rétrocompatibilité QStash)
    const body = await request.json()
    const { email, type, secret } = body
    const authHeader = request.headers.get('authorization')
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || (secret !== cronSecret && headerToken !== cronSecret)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }
    if (!email || !type) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
    }

    // Récupère le panier Redis
    const cart = await redis.get(`cart:${email}`)
    if (!cart || !cart.products?.length) {
      // Panier vidé ou expiré — ne pas envoyer
      return NextResponse.json({ skipped: true, reason: 'cart_empty' })
    }

    const { products } = cart

    // Sélectionne le bon template selon le type
    let emailPayload
    switch (type) {
      case 'reminder_1h':
        emailPayload = emailReminder1h(email, products)
        break
      case 'reminder_8h':
        emailPayload = emailReminder8h(email, products)
        break
      case 'reminder_16h':
        emailPayload = emailReminder16h(email, products)
        break
      case 'reminder_24h':
        emailPayload = emailReminder24h(email, products)
        break
      default:
        return NextResponse.json({ error: 'Type inconnu' }, { status: 400 })
    }

    await sendEmail(email, emailPayload)
    return NextResponse.json({ success: true, type, email })
  } catch (err) {
    console.error('cart/reminder error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
