'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = '/admin'
      } else {
        setError('Mot de passe incorrect')
        setLoading(false)
      }
    } catch (err) {
      setError('Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#0a0a0a' }}
    >
      <div
        className="w-full max-w-sm p-8 rounded"
        style={{ background: '#111', border: '1px solid rgba(196,150,42,0.3)' }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1 mb-4">
            <div className="bg-white text-black px-2.5 py-1 font-black text-lg tracking-tighter rounded-l-lg">
              AC
            </div>
            <div
              className="px-1.5 py-1 font-black text-lg tracking-tighter rounded-r-lg"
              style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: 'white' }}
            >
              A
            </div>
          </div>
          <h1 className="text-white font-black text-xl uppercase tracking-wide">Administration</h1>
          <p className="text-gray-500 text-xs mt-1">Accès réservé</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full px-4 py-3 text-sm text-white rounded outline-none"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
          </div>

          {error && (
            <div className="text-red-400 text-xs font-bold text-center py-1">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-black text-sm uppercase tracking-widest rounded transition-opacity"
            style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Connexion...' : 'SE CONNECTER'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { window.location.href = '/connexion' }}
            className="text-gray-600 text-xs hover:text-gray-400 transition-colors"
          >
            Retour connexion client
          </button>
        </div>
      </div>
    </div>
  )
}
