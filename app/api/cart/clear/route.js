export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import redis from '../../../../lib/redis'
import { rateLimit } from '../../../../lib/ratelimit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Appele quand le client finalise sa commande -> on supprime le panier Redis
// pour que les QStash rappels programmes ne declenchent plus d'email
export async function POST(request) {
  try {
    // Rate limiting — 10 requests/minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const rl = await rateLimit(ip, 'cart-clear', { limit: 10, window: 60 })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes, réessayez dans une minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const body = await request.json()
    const { email } = body

    // Input validation
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    await redis.del(`aca_cart:${email}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('cart/clear error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
