'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
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
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111', border: '1px solid #C4962A', borderRadius: 8, padding: 40, width: 340 }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: 24, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase' }}>Administration</h2>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, color: 'white', fontSize: 16, marginBottom: 12, boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '12px 0', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          SE CONNECTER
        </button>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button
            onClick={() => { window.location.href = '/connexion' }}
            style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer' }}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  )
}
