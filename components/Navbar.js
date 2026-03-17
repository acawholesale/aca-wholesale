'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#C4962A] text-black text-[10px] md:text-xs py-1.5 overflow-hidden font-bold">
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
      <nav className="bg-black sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="ACA Wholesale" width={120} height={40} className="h-9 md:h-10 w-auto object-contain" priority />
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
                <Link key={link.href} href={link.href} className="text-xs font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Icons + Toggle */}
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/produits" className="hidden sm:inline-block text-black text-xs px-5 py-2 font-black uppercase tracking-wide transition-all rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                Commander
              </Link>

              {/* Connexion */}
              <Link href="/connexion" className="relative flex items-center justify-center w-10 h-10 border border-white/20 hover:border-white/50 transition-colors rounded" aria-label="Compte">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Panier */}
              <Link href="/panier" className="relative flex items-center justify-center w-10 h-10 border border-white/20 hover:border-white/50 transition-colors rounded" aria-label="Panier">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile toggle */}
              <button className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
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
              {[
                { href: '/', label: 'Accueil' },
                { href: '/produits', label: 'Nos Lots' },
                { href: '/a-propos', label: 'À Propos' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="block text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href="/panier" className="flex items-center gap-2 text-sm font-medium py-3 px-3 text-gray-300 hover:text-white border-b border-white/5" onClick={() => setMenuOpen(false)}>
                🛒 Panier
                {totalItems > 0 && (
                  <span className="text-black text-[10px] font-black px-1.5 py-0.5 rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/connexion" className="flex items-center gap-2 text-sm font-medium py-3 px-3 text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
                👤 Mon compte
              </Link>
              <div className="pt-2">
                <Link href="/produits" className="block text-black text-sm px-5 py-3 font-black text-center rounded uppercase tracking-wide" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }} onClick={() => setMenuOpen(false)}>
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
