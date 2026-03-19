'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
  const [session, setSession] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const { totalItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    try {
      const s = localStorage.getItem('aca_session')
      if (s) setSession(JSON.parse(s))
    } catch {}
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchOpen])

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

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/produits?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const currentMsg = messages[msgIndex]
  const compteHref = session ? '/compte' : '/login'

  return (
    <>
      {/* Drop Alert Modal */}
      {alertModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={() => setAlertModal(false)}
        >
          <div
            className="w-full max-w-sm p-6 rounded-lg"
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
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black rounded uppercase"
                  style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}
                >
                  OK
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[99] flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSearchOpen(false)}
        >
          <div style={{ width: '100%', maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un lot, une marque (Nike, Adidas…)"
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(196,150,42,0.5)', borderRadius: '8px', padding: '16px 16px 16px 48px', fontSize: '16px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', padding: '16px 20px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Chercher
              </button>
            </form>
            <p style={{ color: '#4b5563', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>Appuyez sur Échap pour fermer</p>
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      <div
        className="text-black text-[10px] md:text-xs py-1.5 px-4 font-bold text-center flex items-center justify-center gap-3 min-h-[32px]"
        style={{ background: 'linear-gradient(90deg, #C4962A, #E8B84B, #C4962A)' }}
      >
        <span key={msgIndex} className="transition-opacity duration-300">
          {currentMsg.text}
        </span>
        {currentMsg.cta && (
          <button
            onClick={() => setAlertModal(true)}
            className="text-[10px] font-black px-2.5 py-0.5 rounded-sm underline hover:no-underline transition-all"
            style={{ color: '#000' }}
          >
            M&apos;alerter →
          </button>
        )}
      </div>

      {/* Main Navbar */}
      <nav className="bg-black sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ACA Wholesale"
                width={120}
                height={48}
                style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
                priority
              />
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Search + Cart + Account + Toggle */}
            <div className="flex items-center gap-2 md:gap-3">

              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center justify-center w-9 h-9 border border-white/20 hover:border-white/50 transition-colors rounded text-white"
                aria-label="Recherche"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/produits"
                className="hidden sm:inline-block text-black text-xs px-5 py-2 font-black uppercase tracking-wide transition-all rounded"
                style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
              >
                Commander
              </Link>

              {/* Cart */}
              <Link
                href="/panier"
                className="relative flex items-center justify-center w-10 h-10 border border-white/20 hover:border-white/50 transition-colors rounded"
                aria-label="Devis"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href={compteHref}
                className="flex items-center justify-center w-10 h-10 border border-white/20 hover:border-white/50 transition-colors rounded"
                aria-label="Mon compte"
              >
                {session ? (
                  <div
                    className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-black text-black"
                    style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
                  >
                    {(session.prenom || session.email || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-white/10">
            <div className="px-5 py-4 space-y-1">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-3 pb-3 border-b border-white/10">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-white rounded-sm outline-none"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <button type="submit" className="px-4 py-2 text-xs font-black rounded-sm uppercase" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>OK</button>
              </form>

              {[
                { href: '/', label: 'Accueil' },
                { href: '/produits', label: 'Nos Lots' },
                { href: '/a-propos', label: 'À Propos' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/panier"
                className="flex items-center gap-2 text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                🛒 Mon devis
                {totalItems > 0 && (
                  <span className="text-black text-[10px] font-black px-1.5 py-0.5 rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link
                href={compteHref}
                className="flex items-center gap-2 text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5"
                onClick={() => setMenuOpen(false)}
              >
                👤 {session ? `Mon compte (${session.prenom || session.email})` : 'Connexion'}
              </Link>
              <div className="pt-2">
                <Link
                  href="/produits"
                  className="block text-black text-sm px-5 py-3 font-black text-center rounded uppercase tracking-wide"
                  style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Commander
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
