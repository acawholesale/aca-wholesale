'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, profile } = useAuth()

  const initials = profile?.first_name
    ? `${profile.first_name[0]}${profile.last_name?.[0] || ''}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || '?'

  return (
    <>
      {/* Announcement Bar */}
      <div
        className="bg-black text-white text-[10px] md:text-xs py-1.5 md:py-2 overflow-hidden"
        style={{ borderBottom: '1px solid rgba(196,150,42,0.25)' }}
      >
        <div
          className="whitespace-nowrap flex gap-8 md:gap-12"
          style={{
            animation: 'scroll-left 25s linear infinite',
            willChange: 'transform',
            animationPlayState: 'running',
          }}
        >
          <span>♻️ VÊTEMENTS DE SECONDE MAIN</span>
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE</span>
          <span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span>
          <span>♻️ VÊTEMENTS DE SECONDE MAIN</span>
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE</span>
          <span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo CSS */}
            <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
              <div
                className="font-black tracking-tighter leading-none"
                style={{ fontSize: '1.6rem', lineHeight: 1 }}
              >
                <span className="text-black">AC</span>
                <span style={{ color: '#C4962A' }}>A</span>
              </div>
              <span
                className="font-bold uppercase tracking-widest hidden sm:block"
                style={{ fontSize: '0.5rem', color: '#C4962A', letterSpacing: '0.2em' }}
              >
                WHOLESALE
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-[#C4962A]">Accueil</Link>
              <Link href="/produits" className="text-sm font-medium transition-colors hover:text-[#C4962A]">Nos Lots</Link>
              <Link href="/a-propos" className="text-sm font-medium transition-colors hover:text-[#C4962A]">À Propos</Link>
              <Link href="/faq" className="text-sm font-medium transition-colors hover:text-[#C4962A]">FAQ</Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-[#C4962A]">Contact</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">

              {/* Bouton Commander — or */}
              <Link
                href="/produits"
                className="hidden sm:inline-block text-black text-sm px-5 py-2 font-bold transition-all rounded-full hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
              >
                Commander
              </Link>

              {/* Compte utilisateur */}
              {user ? (
                <Link
                  href="/compte"
                  className="flex items-center justify-center w-9 h-9 text-black text-xs font-black rounded-full hover:opacity-90 transition-all"
                  style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
                >
                  {initials}
                </Link>
              ) : (
                <Link
                  href="/connexion"
                  className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full"
                  aria-label="Connexion"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Panier */}
              <Link
                href="/panier"
                className="relative flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full"
                aria-label="Panier"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full"
                    style={{ background: '#C4962A' }}
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Menu mobile */}
              <button
                className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-b-2xl" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div className="px-5 py-4 space-y-1">
              <Link href="/" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link href="/produits" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Nos Lots</Link>
              <Link href="/a-propos" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>À Propos</Link>
              <Link href="/faq" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link href="/contact" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link href="/panier" className="flex items-center gap-2 text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                🛒 Panier
                {totalItems > 0 && (
                  <span className="text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#C4962A' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
              {user ? (
                <Link href="/compte" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                  👤 Mon compte
                </Link>
              ) : (
                <Link href="/connexion" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                  🔑 Connexion
                </Link>
              )}
              <div className="pt-2">
                <Link
                  href="/produits"
                  className="block text-black text-sm px-5 py-3 font-bold text-center rounded-full hover:opacity-90"
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
