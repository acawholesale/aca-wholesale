import { NextResponse } from 'next/server'
import redis from '../../../../lib/redis'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aca-wholesale.vercel.app'
const QSTASH_TOKEN = process.env.QSTASH_TOKEN
const CART_TTL = 86400 // 24h en secondes

// Planifie un message QStash differe vers /api/cart/reminder
async function scheduleReminder(email, type, delaySeconds) {
  if (!QSTASH_TOKEN) return // skip si pas configure

  const url = `${SITE_URL}/api/cart/reminder`
  const res = await fetch(`https://qstash.upstash.io/v2/publish/${encodeURIComponent(url)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${QSTASH_TOKEN}`,
      'Content-Type': 'application/json',
      'Upstash-Delay': `${delaySeconds}s`,
    },
    body: JSON.stringify({ email, type, secret: process.env.CRON_SECRET }),
  })

  if (!res.ok) {
    console.error(`QStash schedule error [${type}]:`, await res.text())
  }
}

export async function POST(request) {
  try {
    const { email, prenom, nom, items, total } = await request.json()

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Donnees manquantes' }, { status: 400 })
    }

    const key = `aca_cart:${email}`
    const existing = await redis.get(key)

    const now = Date.now()

    if (!existing) {
      const cartData = {
        email,
        prenom: prenom || '',
        nom: nom || '',
        items,
        total,
        firstSavedAt: now,
        savedAt: now,
        emailsSent: [],
      }
      await redis.set(key, cartData, CART_TTL)

      await scheduleReminder(email, '1h',  3600)
      await scheduleReminder(email, '8h',  28800)
      await scheduleReminder(email, '16h', 57600)
      await scheduleReminder(email, '24h', 86400)

    } else {
      const elapsed = Math.floor((now - existing.firstSavedAt) / 1000)
      const remainingTTL = Math.max(1, CART_TTL - elapsed)

      const updated = {
        ...existing,
        items,
        total,
        savedAt: now,
      }
      await redis.set(key, updated, remainingTTL)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('cart/save error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
