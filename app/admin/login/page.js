'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Mot de passe incorrect')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{
      background: 'radial-gradient(ellipse at 0% 40%, rgba(196,120,10,0.25) 0%, transparent 55%), #0a0500'
    }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="ACA Wholesale" width={140} height={48} className="h-12 w-auto object-contain" />
        </div>

        {/* Card */}
        <div className="rounded-xl p-8" style={{ background: 'rgba(15,10,0,0.9)', border: '1px solid rgba(196,150,42,0.2)', backdropFilter: 'blur(12px)' }}>
          <h1 className="text-white font-black text-xl uppercase tracking-widest mb-1 text-center">Espace Admin</h1>
          <p className="text-gray-500 text-xs text-center mb-8 uppercase tracking-wide">Accès restreint</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => e.target.style.borderColor = '#C4962A'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center font-bold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-black text-sm uppercase tracking-widest text-black rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
            >
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-[10px] mt-6 uppercase tracking-widest">
          ACA Wholesale © 2026
        </p>
      </div>
    </div>
  )
}
