import { NextResponse } from 'next/server'
import redis from '../../../../lib/redis'

// Appele quand le client finalise sa commande -> on supprime le panier Redis
// pour que les QStash rappels programmes ne declenchent plus d'email
export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email manquant' }, { status: 400 })
    }

    await redis.del(`aca_cart:${email}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('cart/clear error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
