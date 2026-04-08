'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error)
    // Report error to admin
    try {
      fetch('/api/error-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error?.message || 'Unknown error',
          stack: error?.stack || '',
          url: typeof window !== 'undefined' ? window.location.href : '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {})
    } catch {}
  }, [error])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl font-black text-white/10 select-none mb-2">500</p>
      <h1 className="text-3xl font-bold mb-3">Une erreur est survenue</h1>
      <p className="text-white/50 mb-8 max-w-md">
        Quelque chose s&apos;est mal passé de notre côté.
        Réessayez ou revenez à l&apos;accueil.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={reset}
          className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition"
          aria-label="Réessayer"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:border-white/50 transition"
        >
          Accueil
        </Link>
      </div>
    </main>
  )
}
