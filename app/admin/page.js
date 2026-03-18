'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = function(e) {
    e.preventDefault()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{background:'#080808'}}>
      <div className="w-full max-w-sm">

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center">
            <div className="bg-white text-black px-2.5 py-1 font-black text-lg tracking-tighter rounded-l-lg">AC</div>
            <div className="px-1.5 py-1 font-black text-lg tracking-tighter rounded-r-lg" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)',color:'white'}}>A</div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wide" style={{color:'#C4962A'}}>Wholesale</span>
        </div>

        <h1 className="text-white font-black text-2xl text-center uppercase tracking-wide mb-1">Mon compte</h1>
        <p className="text-gray-500 text-xs text-center mb-8">Connectez-vous pour suivre vos commandes</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={function(e){setEmail(e.target.value)}}
              placeholder="votre@email.com"
              required
              className="w-full px-4 py-3 text-sm text-white placeholder-gray-600 rounded outline-none"
              style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)'}}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={function(e){setPassword(e.target.value)}}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 text-sm text-white placeholder-gray-600 rounded outline-none"
              style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)'}}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-black text-sm uppercase tracking-wide rounded text-black mt-2"
            style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}
          >
            Se connecter
          </button>
        </form>

        <div className="text-center mt-8">
          <Link href="/admin" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">
            Accès administration →
          </Link>
        </div>

      </div>
    </main>
  )
}
