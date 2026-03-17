'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

const messages = [
  { text: '🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE — Livraison 2-5 jours' },
  { text: '✋ LOTS SÉLECTIONNÉS À LA MAIN — Qualité garantie' },
  { text: '📦 EXPÉDITION RAPIDE — Commandez avant 14h' },
  { text: '🔥 Nouveau drop vendredi 18h — Inscrivez-vous pour être alerté', cta: true },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [alertModal, setAlertModal] = useState(false)
  const [alertEmail, setAlertEmail] = useState('')
  const [alertSent, setAlertSent] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleAlertSubmit = (e) => {
    e.preventDefault()
    if (!alertEmail) return
    try {
      localStorage.setItem('aca_drop_alert', JSON.stringify({ email: alertEmail, date: Date.now() }))
    } catch {}
    setAlertSent(true)
    setTimeout(() => {
      setAlertModal(false)
      setAlertSent(false)
    }, 2000)
  }

  const currentMsg = messages[msgIndex]

  return (
    <>
      {/* Drop Alert Modal */}
      {alertModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          onClick={() => setAlertModal(false)}
        >
          <div
            className="w-full max-w-sm p-6 rounded"
            style={{ background: '#111', border: '1px solid rgba(196,150,42,0.4)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-2xl mb-3 text-center">🔥</div>
            <h3 className="font-black text-white text-center uppercase tracking-wide mb-1">Alerte drop</h3>
            <p className="text-gray-400 text-xs text-center mb-4">Soyez alerté dès que le prochain drop est en ligne</p>
            {alertSent ? (
              <div className="text-center py-2">
                <div className="text-green-400 font-black text-sm">✓ Vous serez alerté !</div>
              </div>
            ) : (
              <form onSubmit={handleAlertSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={alertEmail}
                  onChange={e => setAlertEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-3 py-2 text-xs rounded text-white placeholder-gray-500 outline-none"
                  style
