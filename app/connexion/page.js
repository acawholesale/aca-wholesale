'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
        <div style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: 18, letterSpacing: -1, borderRadius: '6px 0 0 6px' }}>AC</div>
        <div style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: 18, letterSpacing: -1, borderRadius: '0 6px 6px 0' }}>A</div>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, marginLeft: 10 }}>Wholesale</span>
      </div>

      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#111',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: 40,
      }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 22, textTransform: 'uppercase', letterSpacing: 3, textAlign: 'center', margin: '0 0 32px 0' }}>
          Mon compte
        </h1>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', color: '#666', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>
            Adresse email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com"
            style={{
              width: '100%',
              padding: '13px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#fff',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', color: '#666', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 8 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '13px 16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#fff',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button style={{
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
        }}>
          SE CONNECTER
        </button>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button
            onClick={() => { window.location.href = '/admin/login' }}
            style={{
              background: 'none',
              border: 'none',
              color: '#444',
              fontSize: 12,
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Accès administration
          </button>
        </div>
      </div>
    </div>
  )
}
