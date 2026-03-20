import { NextResponse } from 'next/server'
import redis from '../../../../lib/redis'
import { rateLimit } from '../../../../lib/ratelimit'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aca-wholesale.vercel.app'
const QSTASH_TOKEN = process.env.QSTASH_TOKEN
const CART_TTL = 86400 // 24h en secondes

// Validation helpers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_ITEMS = 100
const MAX_STRING_LENGTH = 500

function validateItem(item) {
  if (!item || typeof item !== 'object') return false
  if (typeof item.id !== 'string' || item.id.length === 0 || item.id.length > 100) return false
  if (typeof item.name !== 'string' || item.name.length === 0 || item.name.length > MAX_STRING_LENGTH) return false
  if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 9999) return false
  if (item.price !== undefined && (typeof item.price !== 'number' || item.price < 0)) return false
  return true
}

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
    // Rate limiting — 8 requests/minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const rl = await rateLimit(ip, 'cart-save', { limit: 8, window: 60 })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes, réessayez dans une minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const body = await request.json()
    const { email, products } = body

    // Input validation
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Le panier est vide.' }, { status: 400 })
    }
    if (products.length > MAX_ITEMS) {
      return NextResponse.json({ error: 'Trop d\'articles dans le panier.' }, { status: 400 })
    }
    if (!products.every(validateItem)) {
      return NextResponse.json({ error: 'Articles invalides dans le panier.' }, { status: 400 })
    }

    const key = `cart:${email}`
    await redis.set(key, { email, products, savedAt: new Date().toISOString() }, CART_TTL)

    // Schedule email reminders: +1h, +8h, +16h, +24h
    await Promise.allSettled([
      scheduleReminder(email, 'reminder_1h', 3600),
      scheduleReminder(email, 'reminder_8h', 28800),
      scheduleReminder(email, 'reminder_16h', 57600),
      scheduleReminder(email, 'reminder_24h', 86400),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('cart/save error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
