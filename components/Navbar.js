'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

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
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const { totalItems } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const session = user ? {
    email: user.email,
    prenom: user.user_metadata?.prenom || '',
    nom: user.user_metadata?.nom || '',
  } : null

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 4000)
    return () => clearInterval(timer)
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

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchOpen(false)
    }
  }

  const handleAlertKeyDown = (e) => {
    if (e.key === 'Escape') {
      setAlertModal(false)
    }
  }

  const currentMsg = messages[msgIndex]
  const compteHref = session ? '/compte' : '/login'

  return (
    <>
      {/* Drop Alert Modal */}
      {alertModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="alert-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-overlay-heavy backdrop-blur-sm"
          onClick={() => setAlertModal(false)}
          onKeyDown={handleAlertKeyDown}
        >
          <div
            className="w-full max-w-sm p-6 rounded-lg bg-card border border-gold-medium"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-2xl mb-3 text-center">🔥</div>
            <h3 id="alert-modal-title" className="font-black text-white text-center uppercase tracking-wide mb-1">Alerte drop</h3>
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
                  className="flex-1 px-3 py-2 text-xs rounded text-white placeholder-gray-500 outline-none bg-glass border border-glass-hover"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-black rounded uppercase bg-gold-gradient text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
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
          role="dialog"
          aria-modal="true"
          aria-label="Recherche"
          className="fixed inset-0 z-[99] flex items-start justify-center pt-24 px-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSearchOpen(false)}
          onKeyDown={handleSearchKeyDown}
        >
          <div className="w-full max-w-[580px]" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="flex gap-2 items-center">
              <div className="flex-1 relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un lot, une marque (Nike, Adidas…)"
                  className="w-full bg-card border border-gold-strong rounded-md py-4 pl-12 pr-4 text-base text-white outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-gold-gradient text-black py-4 px-5 font-black text-[13px] uppercase tracking-[0.08em] rounded-md whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
              >
                Chercher
              </button>
            </form>
            <p className="text-gray-600 text-xs mt-3 text-center">Appuyez sur Échap pour fermer</p>
          </div>
        </div>
      )}

      {/* Announcement Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[52] text-black text-[10px] md:text-xs px-4 font-bold text-center flex items-center justify-center gap-2 h-8 overflow-hidden whitespace-nowrap bg-gold-gradient-90"
      >
        <span key={msgIndex} className="transition-opacity duration-300">
          {currentMsg.text}
        </span>
        {currentMsg.cta && (
          <button
            onClick={() => setAlertModal(true)}
            className="hidden sm:inline text-[10px] font-black px-2.5 py-0.5 rounded-sm underline hover:no-underline transition-all text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
          >
            M&apos;alerter →
          </button>
        )}
      </div>

      {/* Main Navbar */}
      <nav className="fixed top-[44px] left-3 right-3 z-50 rounded-2xl border border-white/15 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="ACA Wholesale"
                width={120}
                height={48}
                className="h-11 w-auto object-contain"
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
                  className="text-xs font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded"
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
                className="hidden sm:flex items-center justify-center w-10 h-10 min-w-[44px] min-h-[44px] border border-white/20 hover:border-white/50 transition-colors rounded text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Recherche"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/produits"
                className="hidden sm:inline-block text-black text-xs px-5 py-2 font-black uppercase tracking-wide transition-all rounded bg-gold-gradient focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Commander
              </Link>

              {/* Cart */}
              <Link
                href="/panier"
                className="relative flex items-center justify-center w-10 h-10 min-w-[44px] min-h-[44px] border border-white/20 hover:border-white/50 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Panier"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black text-black bg-gold-gradient">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href={compteHref}
                className="flex items-center justify-center w-10 h-10 min-w-[44px] min-h-[44px] border border-white/20 hover:border-white/50 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Mon compte"
              >
                {session ? (
                  <div className="w-7 h-7 rounded-sm flex items-center justify-center text-xs font-black text-black bg-gold-gradient">
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
                className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
                onClick={() => setMenuOpen(!menuOpen)}
                onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false) }}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
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
          <div id="mobile-menu" className="md:hidden bg-[#0a0a0a] border-t border-white/10">
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
                    className="w-full pl-9 pr-3 py-2.5 text-sm text-white rounded-sm outline-none bg-glass border border-glass"
                  />
                </div>
                <button type="submit" className="px-4 py-2 text-xs font-black rounded-sm uppercase bg-gold-gradient text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">OK</button>
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
                  className="block text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <Link
              href="/panier"
              className="flex items-center justify-between text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              <span>🛒 Panier</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-black bg-gold-gradient">
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
                  className="block text-black text-sm px-5 py-3 font-black text-center rounded uppercase tracking-wide bg-gold-gradient"
                  onClick={() => setMenuOpen(false)}
                >
                  Commander
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer pour compenser la navbar fixe (barre annonces 32px + gap + navbar ~64px) */}
      <div className="h-[108px] md:h-[116px]" />
    </>
  )
}
