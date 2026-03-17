'use client'
import { useEffect } from 'react'

export default function CartReminder() {
  useEffect(() => {
    const ONE_HOUR = 60 * 60 * 1000

    try {
      const raw = localStorage.getItem('aca_cart_reminder')
      if (!raw) return

      const cart = JSON.parse(raw)
      if (!cart || cart.sent) return
      if (!cart.email || !cart.items?.length) return
      if (Date.now() - cart.timestamp < ONE_HOUR) return

      // Marquer comme envoyé pour éviter les doublons
      localStorage.setItem('aca_cart_reminder', JSON.stringify({ ...cart, sent: true }))

      // Envoyer le rappel
      fetch('/api/cart/reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cart.email, items: cart.items, total: cart.total })
      })
    } catch {}
  }, [])

  return null
}
