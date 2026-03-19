'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  var emailState = useState('')
  var email = emailState[0]; var setEmail = emailState[1]
  var stepState = useState('form')
  var step = stepState[0]; var setStep = stepState[1]
  var errorState = useState('')
  var error = errorState[0]; var setError = errorState[1]
  var loadingState = useState(false)
  var loading = loadingState[0]; var setLoading = loadingState[1]

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email) { setError('Veuillez entrer votre adresse email'); return }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) { setError('Adresse email invalide'); return }
    setLoading(true)
    // TODO: replace with real API call:
    // await fetch('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) })
    setTimeout(function() {
      setLoading(false)
      setStep('sent')
    }, 1000)
  }

  if (step === 'sent') {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '40px' }}>
          <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div style={{ width: '100%', maxWidth: '400px', background: '#111', border: '1px solid rgba(196,150,42,0.25)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px' }}>✉️</div>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 12px 0' }}>Email envoye !</h1>
          <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6', margin: '0 0 8px 0' }}>Si un compte existe avec l adresse</p>
          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '14px', margin: '0 0 16px 0' }}>{email}</p>
          <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6', margin: '0 0 32px 0' }}>vous recevrez un lien de reinitialisation dans les prochaines minutes. Pensez a verifier vos spams.</p>
          <Link href="/login" style={{ display: 'block', width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', boxSizing: 'border-box' }}>
            RETOUR A LA CONNEXION
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '40px' }}>
        <span style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: '18px', borderRadius: '6px 0 0 6px' }}>AC</span>
        <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: '18px', borderRadius: '0 6px 6px 0' }}>A</span>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px' }}>Wholesale</span>
      </Link>

      <div style={{ width: '100%', maxWidth: '400px', background: '#111', border: '1px solid rgba(196,150,42,0.25)', borderRadius: '16px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(196,150,42,0.1)', border: '1px solid rgba(196,150,42,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px' }}>🔑</div>
          <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 8px 0' }}>Mot de passe oublie</h1>
          <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>Entrez votre email et nous vous enverrons un lien pour reinitialiser votre mot de passe.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Adresse email</label>
            <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); setError('') }} placeholder="votre@email.com" autoFocus autoComplete="email"
              style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontSize: '13px', fontWeight: 600 }}>{error}</div>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? 'rgba(196,150,42,0.5)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Envoi...' : 'ENVOYER LE LIEN'}
          </button>
        </form>

        <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
          <Link href="/login" style={{ color: '#C4962A', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>← Retour a la connexion</Link>
        </div>
      </div>
    </div>
  )
}
