'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'

// Auth helper - swap these functions for real API calls later
function authLogin(email, password) {
  // TODO: replace with real API call, e.g.:
  // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  var users = JSON.parse(localStorage.getItem('aca_users') || '[]')
  var user = users.find(function(u) { return u.email === email && u.password === password })
  if (user) {
    var session = { id: user.id, email: user.email, prenom: user.prenom, nom: user.nom }
    localStorage.setItem('aca_session', JSON.stringify(session))
    return { ok: true, user: session }
  }
  return { ok: false, error: 'Email ou mot de passe incorrect' }
}

export default function LoginPage() {
  var emailState = useState('')
  var email = emailState[0]; var setEmail = emailState[1]
  var passwordState = useState('')
  var password = passwordState[0]; var setPassword = passwordState[1]
  var errorState = useState('')
  var error = errorState[0]; var setError = errorState[1]
  var loadingState = useState(false)
  var loading = loadingState[0]; var setLoading = loadingState[1]
  var showPwState = useState(false)
  var showPw = showPwState[0]; var setShowPw = showPwState[1]

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Veuillez remplir tous les champs'); return }
    setLoading(true)
    setTimeout(function() {
      var result = authLogin(email.trim().toLowerCase(), password)
      if (result.ok) {
        window.location.href = '/compte'
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '40px' }}>
        <span style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: '18px', borderRadius: '6px 0 0 6px' }}>AC</span>
        <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: '18px', borderRadius: '0 6px 6px 0' }}>A</span>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px' }}>Wholesale</span>
      </Link>

      <div style={{ width: '100%', maxWidth: '400px', background: '#111', border: '1px solid rgba(196,150,42,0.25)', borderRadius: '16px', padding: '40px' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 6px 0' }}>Connexion</h1>
        <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>Acces a votre espace client</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Email</label>
            <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); setError('') }} placeholder="votre@email.com" autoComplete="email"
              style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Mot de passe</label>
              <Link href="/mot-de-passe-oublie" style={{ color: '#C4962A', fontSize: '11px', textDecoration: 'none' }}>Oublie ?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={function(e) { setPassword(e.target.value); setError('') }} placeholder="••••••••" autoComplete="current-password"
                style={{ width: '100%', padding: '13px 44px 13px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              <button type="button" onClick={function() { setShowPw(!showPw) }}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontSize: '13px', fontWeight: 600 }}>{error}</div>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? 'rgba(196,150,42,0.5)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px' }}>
            {loading ? 'Connexion...' : 'SE CONNECTER'}
          </button>
        </form>

        <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
          <span style={{ color: '#555', fontSize: '13px' }}>Pas encore de compte ? </span>
          <Link href="/register" style={{ color: '#C4962A', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Creer un compte</Link>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#444', fontSize: '12px', textDecoration: 'none' }}>Retour a la boutique</Link>
      </div>
    </div>
  )
}
