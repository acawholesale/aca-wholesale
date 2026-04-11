'use client'
export const dynamic = 'force-dynamic'
import { useState, useRef, useEffect } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [step, setStep] = useState('password') // 'password' | 'totp'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const totpRef = useRef(null)

  useEffect(() => {
    if (step === 'totp' && totpRef.current) totpRef.current.focus()
  }, [step])

  async function handleLogin(code) {
    setLoading(true)
    setError('')
    try {
      const body = { password }
      if (code) body.totp_code = code
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.success) {
        window.location.href = '/admin'
      } else if (data.needs_totp) {
        setStep('totp')
        setTotpCode('')
      } else {
        setError(data.error || (step === 'totp' ? 'Code 2FA invalide' : 'Mot de passe incorrect'))
        if (step === 'password') setPassword('')
        if (step === 'totp') setTotpCode('')
      }
    } catch {
      setError('Erreur de connexion')
    }
    setLoading(false)
  }

  const handleTotpChange = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 6)
    setTotpCode(clean)
    if (clean.length === 6) handleLogin(clean)
  }

  const inputSt = { width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '360px', background: '#111', border: '1px solid rgba(196,150,42,0.35)', borderRadius: '12px', padding: '40px' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 8px 0' }}>Administration</h1>

        {step === 'password' ? (
          <>
            <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>Entrez le mot de passe</p>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                autoFocus
                style={inputSt}
              />
              {error && <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>{error}</div>}
            </div>
            <button
              onClick={() => handleLogin()}
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#6b7280' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '20px' }}
            >
              {loading ? 'Vérification...' : 'CONTINUER'}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', margin: '0 0 8px 0' }}>Vérification en 2 étapes</p>
            <p style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center', margin: '0 0 32px 0' }}>Entrez le code à 6 chiffres de votre application d&apos;authentification</p>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Code 2FA</label>
              <input
                ref={totpRef}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={totpCode}
                onChange={e => { handleTotpChange(e.target.value); setError('') }}
                placeholder="000000"
                maxLength={6}
                style={{ ...inputSt, fontSize: '24px', fontWeight: 900, letterSpacing: '0.3em', textAlign: 'center', fontFamily: 'monospace' }}
              />
              {error && <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontWeight: 600, textAlign: 'center' }}>{error}</div>}
            </div>
            {loading && <p style={{ color: '#C4962A', fontSize: '12px', textAlign: 'center', marginBottom: '16px' }}>Vérification...</p>}
            <button
              onClick={() => setStep('password')}
              style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#6b7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginBottom: '20px' }}
            >
              ← Retour au mot de passe
            </button>
          </>
        )}

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => { window.location.href = '/' }} style={{ background: 'none', border: 'none', color: '#444', fontSize: '12px', cursor: 'pointer' }}>Retour au site</button>
        </div>
      </div>
    </div>
  )
}
