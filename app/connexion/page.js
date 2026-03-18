'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }
    setError('Identifiants incorrects')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: '18px', letterSpacing: '-1px', borderRadius: '6px 0 0 6px' }}>AC</span>
          <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: '18px', letterSpacing: '-1px', borderRadius: '0 6px 6px 0' }}>A</span>
        </div>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px' }}>Wholesale</span>
      </div>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '400px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '40px' }}>

        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 8px 0' }}>
          Mon compte
        </h1>
        <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>
          Connectez-vous pour suivre vos commandes
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="votre@email.com"
              style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="••••••••"
              style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {error && (
            <p style={{ color: '#f87171', fontSize: '13px', textAlign: 'center', marginBottom: '16px', fontWeight: 600 }}>{error}</p>
          )}

          <button
            type="submit"
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            SE CONNECTER
          </button>
        </form>

        {/* Admin access */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <button
            onClick={() => { window.location.href = '/admin/login' }}
            style={{ background: 'none', border: 'none', color: '#444', fontSize: '12px', cursor: 'pointer', textDecoration: 'none' }}
          >
            Accès administration
          </button>
        </div>

      </div>
    </div>
  )
}
