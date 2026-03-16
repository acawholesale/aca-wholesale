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
    ? profile.first_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || '?'

  return (
    <>
      <div className="bg-black text-white text-[10px] md:text-xs py-1.5 md:py-2 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap flex gap-8 md:gap-12">
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE</span><span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span><span>♻️ VÊTEMENTS DE SECONDE MAIN</span>
          <span>🇫🇷 EXPÉDIÉ DEPUIS LA MOSELLE</span><span>✋ LOTS SÉLECTIONNÉS À LA MAIN</span>
          <span>📦 EXPÉDITION RAPIDE</span><span>♻️ VÊTEMENTS DE SECONDE MAIN</span>
        </div>
      </div>
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-black text-white px-2.5 md:px-3 py-1 md:py-1.5 font-black text-lg md:text-xl tracking-tighter rounded-lg md:rounded-xl">ACA</div>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wide hidden sm:block">Wholesale</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">Accueil</Link>
              <Link href="/produits" className="text-sm font-medium hover:text-blue-600 transition-colors">Nos Lots</Link>
              <Link href="/a-propos" className="text-sm font-medium hover:text-blue-600 transition-colors">À Propos</Link>
              <Link href="/faq" className="text-sm font-medium hover:text-blue-600 transition-colors">FAQ</Link>
              <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/produits" className="hidden sm:inline-block bg-black text-white text-sm px-5 py-2 font-semibold hover:bg-gray-800 transition-colors rounded-full">Commander</Link>
              {user ? (
                <Link href="/compte" className="relative flex items-center justify-center w-10 h-10 bg-blue-600 text-white font-black text-sm rounded-full hover:bg-blue-700 transition-colors" aria-label="Mon compte">
                  {initials}
                </Link>
              ) : (
                <Link href="/connexion" className="relative flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full" aria-label="Se connecter">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}
              <Link href="/panier" className="relative flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full" aria-label="Panier">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              <button className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
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
                {totalItems > 0 && <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalItems}</span>}
              </Link>
              {user ? (
                <Link href="/compte" className="flex items-center gap-2 text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                  <span className="w-6 h-6 bg-blue-600 text-white font-black text-xs flex items-center justify-center rounded-full">{initials}</span>
                  Mon compte
                </Link>
              ) : (
                <Link href="/connexion" className="block text-sm font-medium py-3 px-3 rounded-xl hover:bg-gray-50" onClick={() => setMenuOpen(false)}>👤 Se connecter</Link>
              )}
              <div className="pt-2">
                <Link href="/produits" className="block bg-black text-white text-sm px-5 py-3 font-semibold text-center rounded-full" onClick={() => setMenuOpen(false)}>Commander</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
