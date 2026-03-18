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
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: 18, letterSpacing: -1, borderRadius: '6px 0 0 6px' }}>AC</div>
        <div style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: 18, letterSpacing: -1, borderRadius: '0 6px 6px 0' }}>A</div>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, marginLeft: 10 }}>Wholesale</span>
      </div>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: 360,
        background: '#111',
        border: '1px solid rgba(196,150,42,0.35)',
        borderRadius: 10,
        padding: 40,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ color: '#C4962A', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 8 }}>Espace réservé</div>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22, textTransform: 'uppercase', letterSpacing: 3, margin: 0 }}>Administration</h1>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', color: '#666', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="••••••••"
            autoFocus
            style={{
              width: '100%',
              padding: '13px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#fff',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <div style={{ color: '#f87171', fontSize: 12, marginTop: 8, fontWeight: 600 }}>{error}</div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '14px 0',
            background: 'linear-gradient(135deg, #C4962A, #E8B84B)',
            color: '#000',
            fontWeight: 900,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: 3,
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          SE CONNECTER
        </button>

        {/* Back */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => { window.location.href = '/connexion' }}
            style={{ background: 'none', border: 'none', color: '#444', fontSize: 12, cursor: 'pointer' }}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  )
}
