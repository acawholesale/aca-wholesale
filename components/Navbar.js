'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-[10px] md:text-xs py-1.5 md:py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap flex gap-8 md:gap-12">
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE</span>
          <span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span>
          <span>♻️ VÊTEMENTS DE SECONDE MAIN</span>
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE</span>
          <span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span>
          <span>♻️ VÊTEMENTS DE SECONDE MAIN</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-black text-white px-2.5 md:px-3 py-1 md:py-1.5 font-black text-lg md:text-xl tracking-tighter rounded-lg md:rounded-xl">
                ACA
              </div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide hidden sm:block">
                Wholesale
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/produits" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Nos Lots
              </Link>
              <Link href="/a-propos" className="text-sm font-medium hover:text-blue-600 transition-colors">
                À Propos
              </Link>
              <Link href="/faq" className="text-sm font-medium hover:text-blue-600 transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link href="/produits" className="hidden sm:inline-block bg-black text-white text-sm px-5 py-2 font-semibold hover:bg-gray-800 transition-colors rounded-full">
                Commander
              </Link>
              <button
                className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
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
          <div className="md:hidden bg-white rounded-b-2xl" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <div className="px-5 py-4 space-y-1">
              <Link href="/" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50 active:bg-gray-100" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link href="/produits" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50 active:bg-gray-100" onClick={() => setMenuOpen(false)}>Nos Lots</Link>
              <Link href="/a-propos" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50 active:bg-gray-100" onClick={() => setMenuOpen(false)}>À Propos</Link>
              <Link href="/faq" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50 active:bg-gray-100" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link href="/contact" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50 active:bg-gray-100" onClick={() => setMenuOpen(false)}>Contact</Link>
              <div className="pt-2">
                <Link href="/produits" className="block bg-black text-white text-sm px-5 py-3 font-semibold text-center rounded-full active:bg-gray-800" onClick={() => setMenuOpen(false)}>
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
