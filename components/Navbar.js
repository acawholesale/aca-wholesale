'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

const dropMessages = [
  { text: '🔥 Nouveau drop vendredi 18h — Inscrivez-vous pour être alerté', cta: true },
  { text: '🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE', cta: false },
  { text: '✋ LOTS SÉLECTIONNÉS À LA MAIN', cta: false },
  { text: '📦 EXPÉDITION RAPIDE SOUS 48H', cta: false },
  { text: '⚡ STOCKS LIMITÉS — COMMANDEZ VITE', cta: false },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [alertEmail, setAlertEmail] = useState('')
  const [alertSent, setAlertSent] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % dropMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleAlertSubmit = (e) => {
    e.preventDefault()
    if (!alertEmail) return
    try { localStorage.setItem('aca_drop_alert', alertEmail) } catch {}
    setAlertSent(true)
    setTimeout(() => setShowAlert(false), 2000)
  }

  const currentMsg = dropMessages[msgIndex]

  return (
    <>
      {/* Announcement Bar */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', minHeight: '32px' }}>
        <div className="flex items-center justify-center px-4 py-1.5 gap-3">
          <p className="text-black text-[10px] md:text-xs font-black uppercase tracking-widest text-center transition-all duration-500">
            {currentMsg.text}
          </p>
          {currentMsg.cta && (
            <button
              onClick={() => setShowAlert(true)}
              className="text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wide flex-shrink-0 hover:opacity-80 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
            >
              M'alerter
            </button>
          )}
        </div>

        {/* Drop alert modal */}
        {showAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={() => setShowAlert(false)}>
            <div className="w-full max-w-sm rounded-2xl p-6 border border-yellow-600/30" style={{ background: '#0a0500' }} onClick={e => e.stopPropagation()}>
              <h3 className="text-white font-black text-lg mb-1">🔥 Alertes drops</h3>
              <p className="text-gray-400 text-sm mb-4">Soyez le premier informé de nos nouveaux lots.</p>
              {alertSent ? (
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-green-400 font-bold">Vous serez alerté !</p>
                </div>
              ) : (
                <form onSubmit={handleAlertSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={e => setAlertEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="flex-1 px-3 py-2.5 rounded-lg text-sm text-white border border-white/20 focus:outline-none focus:border-yellow-500"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                  />
                  <button type="submit" className="px-4 py-2.5 rounded-lg font-black text-black text-sm" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    OK
                  </button>
                </form>
              )}
              <button onClick={() => setShowAlert(false)} className="mt-3 text-gray-500 text-xs w-full text-center hover:text-gray-300">Fermer</button>
            </div>
          </div>
        )}
      </div>

      {/* Main Navbar */}
      <nav className="bg-black sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image src="/logo.png" alt="ACA Wholesale" width={38} height={38} className="object-contain" priority />
              <span className="text-[10px] font-black uppercase tracking-wide hidden sm:block" style={{ color: '#C4962A' }}>Wholesale</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/produits', label: 'Nos Lots' },
                { href: '/a-propos', label: 'À Propos' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              <Link href="/connexion" className="hidden md:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest">Compte</span>
              </Link>
              <Link href="/panier" className="relative flex items-center gap-1.5 text-white hover:text-[#E8B84B] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1">
                <div className="w-5 space-y-1">
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 px-4 space-y-1" style={{ background: '#0a0a0a' }}>
            {[
              { href: '/', label: 'Accueil' },
              { href: '/produits', label: 'Nos Lots' },
              { href: '/a-propos', label: 'À Propos' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
              { href: '/connexion', label: 'Mon Compte' },
            ].map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-bold text-gray-300 hover:text-white border-b border-white/5 uppercase tracking-widest">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
