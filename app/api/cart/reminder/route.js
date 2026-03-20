import { NextResponse } from 'next/server'
import redis from '../../../../lib/redis'
import {
  send1hReminder,
  send8hReminder,
  send16hReminder,
  send24hExpired,
} from '../../../../lib/emails'

// Endpoint appele par QStash apres le delai programme
// Body attendu : { email, type: '1h'|'8h'|'16h'|'24h', secret }
export async function POST(request) {
  try {
    const body = await request.json()
    const { email, type, secret } = body

    // Verification du secret partage
    if (!secret || secret !== process.env.CRON_SECRET) {
      console.warn('cart/reminder: secret invalide')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!email || !type) {
      return NextResponse.json({ error: 'Parametres manquants' }, { status: 400 })
    }

    const key = `aca_cart:${email}`
    const cart = await redis.get(key)

    // Le client a finalise sa commande -> cle supprimee, on ne fait rien
    if (!cart) {
      console.log(`cart/reminder [${type}]: panier introuvable pour ${email}, skip`)
      return NextResponse.json({ skipped: true, reason: 'cart not found' })
    }

    // Email deja envoye pour ce type -> idempotence
    if (cart.emailsSent?.includes(type)) {
      console.log(`cart/reminder [${type}]: email deja envoye pour ${email}, skip`)
      return NextResponse.json({ skipped: true, reason: 'already sent' })
    }

    const payload = {
      email: cart.email,
      prenom: cart.prenom,
      items: cart.items,
      total: cart.total,
    }

    // Envoi de l'email correspondant
    switch (type) {
      case '1h':  await send1hReminder(payload);  break
      case '8h':  await send8hReminder(payload);  break
      case '16h': await send16hReminder(payload); break
      case '24h': await send24hExpired(payload);  break
      default:
        return NextResponse.json({ error: 'Type inconnu' }, { status: 400 })
    }

    // Mise a jour : marquer l'email comme envoye
    const updatedEmailsSent = [...(cart.emailsSent || []), type]

    if (type === '24h') {
      // Panier cloture -> suppression de Redis
      await redis.del(key)
    } else {
      // Conserver le TTL restant (recalcul approx)
      const elapsed = Math.floor((Date.now() - cart.firstSavedAt) / 1000)
      const remainingTTL = Math.max(1, 86400 - elapsed)
      await redis.set(key, { ...cart, emailsSent: updatedEmailsSent }, remainingTTL)
    }

    console.log(`cart/reminder [${type}]: email envoye a ${email}`)
    return NextResponse.json({ success: true, type, email })

  } catch (err) {
    console.error('cart/reminder error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
