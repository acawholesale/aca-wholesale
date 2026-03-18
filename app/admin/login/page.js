'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async function(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
      })
      if (res.ok) {
        window.location.href = '/admin'
      } else {
        setError('Mot de passe incorrect.')
        setLoading(false)
      }
    } catch (err) {
      setError('Erreur de connexion.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{background:'#080808'}}>
      <div className="w-full max-w-xs">

        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex items-center">
            <div className="bg-white text-black px-2.5 py-1 font-black text-lg tracking-tighter rounded-l-lg">AC</div>
            <div className="px-1.5 py-1 font-black text-lg tracking-tighter rounded-r-lg" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)',color:'white'}}>A</div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wide" style={{color:'#C4962A'}}>Wholesale</span>
        </div>

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-white font-black text-xl uppercase tracking-wide mb-1">Administration</h1>
          <p className="text-gray-600 text-xs">Accès réservé</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={function(e){setPassword(e.target.value)}}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full px-4 py-3 text-sm text-white placeholder-gray-600 rounded-lg outline-none"
              style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)'}}
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center py-2 rounded-lg" style={{background:'rgba(239,68,68,0.08)'}}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-black text-sm uppercase tracking-wide rounded-lg text-black disabled:opacity-60"
            style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}
          >
            {loading ? 'Vérification...' : 'Entrer'}
          </button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={function(){ window.location.href = '/connexion' }}
            className="text-xs text-gray-700 hover:text-gray-500 transition-colors"
          >
            Retour connexion client
          </button>
        </div>

      </div>
    </main>
  )
}
