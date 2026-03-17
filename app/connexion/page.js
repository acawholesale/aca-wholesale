'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Connexion client à connecter à Supabase + NextAuth
  }

  return (
    <main className="bg-transparent min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-5 py-20 md:py-32">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-3xl mb-3">👤</div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wide mb-1">Connexion</h1>
            <p className="text-gray-500 text-sm">Accédez à votre espace client</p>
          </div>

          {/* Form */}
          <div
            className="rounded p-6 md:p-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 rounded text-white text-sm placeholder-gray-600 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded text-white text-sm placeholder-gray-600 outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 font-black text-sm uppercase tracking-widest rounded transition-all hover:opacity-90 text-black"
                style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
              >
                Se connecter
              </button>
            </form>

            <div className="mt-4 text-center">
              <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          {/* Admin link */}
          <div className="text-center mt-6">
            <Link
              href="/admin"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline underline-offset-2"
            >
              Accès administration →
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
