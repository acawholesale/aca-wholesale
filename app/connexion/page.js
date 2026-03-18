'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 40, width: 380 }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: 28, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', fontSize: 20 }}>
          Mon compte
        </h2>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Email</label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, color: 'white', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#888', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, color: 'white', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        <button style={{ width: '100%', padding: '13px 0', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          SE CONNECTER
        </button>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '24px 0' }} />

        <button
          onClick={() => { window.location.href = '/admin/login' }}
          style={{ width: '100%', padding: '13px 0', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, color: '#666', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
        >
          Acces administration
        </button>
      </div>
    </div>
  )
}
