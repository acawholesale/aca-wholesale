'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
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
        setPassword('')
      }
    } catch {
      setError('Erreur de connexion')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '360px', background: '#111', border: '1px solid rgba(196,150,42,0.35)', borderRadius: '12px', padding: '40px' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 8px 0' }}>Administration</h1>
        <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>Entrez le mot de passe</p>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Mot de passe</label>
          <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" autoFocus style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          {error ? <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>{error}</div> : null}
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#6b7280' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '20px' }}>{loading ? 'Connexion...' : 'SE CONNECTER'}</button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => { window.location.href = '/' }} style={{ background: 'none', border: 'none', color: '#444', fontSize: '12px', cursor: 'pointer' }}>Retour</button>
        </div>
      </div>
    </div>
  )
}
