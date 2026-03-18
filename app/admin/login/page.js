'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (password === 'admin2026') {
      window.location.href = '/admin'
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: 18, borderRadius: '6px 0 0 6px' }}>AC</div>
        <div style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: 18, borderRadius: '0 6px 6px 0' }}>A</div>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, marginLeft: 10 }}>Wholesale</span>
      </div>
      <div style={{ width: '100%', maxWidth: 360, background: '#111', border: '1px solid rgba(196,150,42,0.35)', borderRadius: 12, padding: 40 }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 20, textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center', margin: '0 0 8px 0' }}>Administration</h1>
        <p style={{ color: '#555', fontSize: 13, textAlign: 'center', margin: '0 0 32px 0' }}>Entrez le mot de passe</p>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Mot de passe</label>
          <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError('') }} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" autoFocus style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          {error && (<div style={{ color: '#f87171', fontSize: 12, marginTop: 8, fontWeight: 600 }}>{error}</div>)}
        </div>
        <button onClick={handleLogin} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>SE CONNECTER</button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => { window.location.href = '/connexion' }} style={{ background: 'none', border: 'none', color: '#444', fontSize: 12, cursor: 'pointer' }}>Retour</button>
        </div>
      </div>
    </div>
  )
}
