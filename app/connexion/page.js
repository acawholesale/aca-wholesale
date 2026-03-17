'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ConnexionPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{
      background: 'radial-gradient(ellipse at 0% 40%, rgba(196,120,10,0.25) 0%, transparent 55%), #0a0500'
    }}>
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image src="/logo.png" alt="ACA Wholesale" width={140} height={48} className="h-12 w-auto object-contain" />
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm rounded-xl p-8" style={{
        background: 'rgba(15,10,0,0.9)',
        border: '1px solid rgba(196,150,42,0.2)',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Tabs */}
        <div className="flex mb-8 border-b border-white/10">
          <button
            onClick={() => setIsLogin(true)}
            className="flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-all"
            style={{ color: isLogin ? '#C4962A' : '#6b7280', borderBottom: isLogin ? '2px solid #C4962A' : '2px solid transparent' }}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className="flex-1 pb-3 text-xs font-black uppercase tracking-widest transition-all"
            style={{ color: !isLogin ? '#C4962A' : '#6b7280', borderBottom: !isLogin ? '2px solid #C4962A' : '2px solid transparent' }}
          >
            Créer un compte
          </button>
        </div>

        {isLogin ? (
          /* LOGIN FORM */
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={(e) => e.target.style.borderColor = '#C4962A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={(e) => e.target.style.borderColor = '#C4962A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-black text-sm uppercase tracking-widest text-black rounded-lg transition-opacity hover:opacity-90 mt-2"
              style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
            >
              Se connecter →
            </button>
            <p className="text-center text-[10px] text-gray-600 pt-1">
              Mot de passe oublié ?{' '}
              <span className="text-gray-400 cursor-pointer hover:text-white transition-colors">Réinitialiser</span>
            </p>
          </form>
        ) : (
          /* REGISTER FORM */
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={(e) => e.target.style.borderColor = '#C4962A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={(e) => e.target.style.borderColor = '#C4962A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={(e) => e.target.style.borderColor = '#C4962A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-black text-sm uppercase tracking-widest text-black rounded-lg transition-opacity hover:opacity-90 mt-2"
              style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
            >
              Créer mon compte →
            </button>
          </form>
        )}

        {/* Lien admin discret */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link
            href="/admin/login"
            className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-widest"
          >
            Espace administrateur
          </Link>
        </div>
      </div>

      <Link href="/" className="mt-6 text-gray-600 text-xs hover:text-gray-400 transition-colors">
        ← Retour à l&apos;accueil
      </Link>
    </div>
  )
}
