'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      router.push(`/produits?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push('/produits')
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center">
        {/* Ambient glow spot */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(196,150,42,0.12) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-xl w-full">

          {/* 404 display number */}
          <p
            className="text-gold-gradient font-black select-none leading-none"
            style={{ fontSize: 'clamp(6rem, 20vw, 10rem)' }}
          >
            404
          </p>

          {/* Divider line */}
          <div className="w-16 h-px bg-gold-gradient mt-2 mb-6 opacity-60" />

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mb-3">
            Page introuvable
          </h1>

          {/* Sub-message */}
          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-sm mb-10">
            Le lot que vous cherchez n&apos;existe pas ou a été déplacé.
            Utilisez la recherche ou revenez à nos lots disponibles.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="w-full flex gap-2 mb-8"
            role="search"
            aria-label="Rechercher un lot"
          >
            <label htmlFor="404-search" className="sr-only">
              Rechercher un lot
            </label>
            <input
              id="404-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un lot…"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30
                         focus:outline-none focus:border-gold-medium focus:ring-1 focus:ring-gold
                         transition-colors duration-200"
            />
            <button
              type="submit"
              className="btn-gold px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              Chercher
            </button>
          </form>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/produits"
              className="btn-gold px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-center cursor-pointer"
            >
              Voir nos lots
            </Link>
            <Link
              href="/"
              className="px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-center border border-white/20 text-white
                         hover:border-white/50 hover:bg-white/5 transition-colors duration-200 cursor-pointer"
            >
              Retour à l&apos;accueil
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
