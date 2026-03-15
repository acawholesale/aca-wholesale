'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap flex gap-12">
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE, FRANCE</span>
          <span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span>
          <span>♻️ VÊTEMENTS DE SECONDE MAIN DE QUALITÉ</span>
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE, FRANCE</span>
          <span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span>
          <span>♻️ VÊTEMENTS DE SECONDE MAIN DE QUALITÉ</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-black text-white px-3 py-1.5 font-black text-xl tracking-tighter">
                ACA
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide hidden sm:block">
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
            <div className="flex items-center gap-4">
              <Link href="/produits" className="hidden sm:inline-block bg-black text-white text-sm px-5 py-2 font-semibold hover:bg-gray-800 transition-colors">
                Commander
              </Link>
              <button
                className="md:hidden p-2"
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
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Accueil</Link>
              <Link href="/produits" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Nos Lots</Link>
              <Link href="/a-propos" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>À Propos</Link>
              <Link href="/faq" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <Link href="/contact" className="block text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link href="/produits" className="block bg-black text-white text-sm px-5 py-2.5 font-semibold text-center" onClick={() => setMenuOpen(false)}>
                Commander
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
