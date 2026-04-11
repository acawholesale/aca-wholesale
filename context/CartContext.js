'use client'
import { createContext, useContext, useState, useEffect, useRef } from 'react'

const CartContext = createContext(null)

const CART_KEY     = 'aca_cart'     // cle localStorage panier
const SESSION_KEY  = 'aca_session'  // cle localStorage session
const CART_TTL_MS  = 24 * 60 * 60 * 1000 // 24h en ms

export function CartProvider({ children }) {
  const [items, setItems]     = useState([])
  const [isOpen, setIsOpen]   = useState(false)
  const [session, setSession] = useState(null)
  const saveTimer             = useRef(null)
  const isFirstRender         = useRef(true)

  // Chargement initial : session + panier localStorage
  useEffect(() => {
    try {
      // Session
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) setSession(JSON.parse(raw))

      // Panier (avec verification expiration 24h)
      const stored = localStorage.getItem(CART_KEY)
      if (stored) {
        const { items: saved, savedAt } = JSON.parse(stored)
        if (Date.now() - savedAt < CART_TTL_MS && saved.length > 0) {
          setItems(saved)
        } else {
          localStorage.removeItem(CART_KEY)
        }
      }
    } catch { /* localStorage inaccessible (SSR guard) */ }
  }, [])

  // Sync quand les articles changent
  useEffect(() => {
    // Ignorer le premier render (chargement depuis localStorage)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (items.length > 0) {
      // 1. Persist dans localStorage
      try {
        localStorage.setItem(CART_KEY, JSON.stringify({ items, savedAt: Date.now() }))
      } catch { }

      // 2. Sync vers Redis (debounce 2s) si connecte
      if (session?.email) {
        if (saveTimer.current) clearTimeout(saveTimer.current)
        saveTimer.current = setTimeout(() => syncToServer(session, items), 2000)
      }
    } else {
      // Panier vide -> nettoyage localStorage
      try { localStorage.removeItem(CART_KEY) } catch { }
    }
  }, [items]) // eslint-disable-line react-hooks/exhaustive-deps

  // Envoi vers l'API /api/cart/save
  async function syncToServer(sess, cartItems) {
    try {
      const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)
      await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:  sess.email,
          prenom: sess.prenom || '',
          nom:    sess.nom    || '',
          products: cartItems,
          total,
        }),
      })
    } catch (err) {
      console.error('Sync panier echoue:', err)
    }
  }

  // Actions
  const addToCart = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  // clearCart : vide le panier ET supprime de Redis (commande finalisee)
  const clearCart = async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setItems([])
    try { localStorage.removeItem(CART_KEY) } catch { }

    if (session?.email) {
      try {
        await fetch('/api/cart/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.email }),
        })
      } catch (err) {
        console.error('Clear panier Redis echoue:', err)
      }
    }
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQty, clearCart,
      totalItems, totalPrice, isOpen, setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
