'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'

// Auth helper - swap for real API call later
function authRegister(prenom, nom, email, password) {
  // TODO: replace with real API call, e.g.:
  // const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ prenom, nom, email, password }) })
  var users = JSON.parse(localStorage.getItem('aca_users') || '[]')
  var exists = users.find(function(u) { return u.email === email })
  if (exists) return { ok: false, error: 'Un compte existe deja avec cet email' }
  var newUser = { id: Date.now().toString(), prenom: prenom, nom: nom, email: email, password: password, createdAt: new Date().toISOString() }
  users.push(newUser)
  localStorage.setItem('aca_users', JSON.stringify(users))
  var session = { id: newUser.id, email: newUser.email, prenom: newUser.prenom, nom: newUser.nom }
  localStorage.setItem('aca_session', JSON.stringify(session))
  return { ok: true, user: session }
}

export default function RegisterPage() {
  var prenomState = useState('')
  var prenom = prenomState[0]; var setPrenom = prenomState[1]
  var nomState = useState('')
  var nom = nomState[0]; var setNom = nomState[1]
  var emailState = useState('')
  var email = emailState[0]; var setEmail = emailState[1]
  var passwordState = useState('')
  var password = passwordState[0]; var setPassword = passwordState[1]
  var password2State = useState('')
  var password2 = password2State[0]; var setPassword2 = password2State[1]
  var errorState = useState('')
  var error = errorState[0]; var setError = errorState[1]
  var loadingState = useState(false)
  var loading = loadingState[0]; var setLoading = loadingState[1]
  var showPwState = useState(false)
  var showPw = showPwState[0]; var setShowPw = showPwState[1]

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!prenom || !nom || !email || !password || !password2) { setError('Veuillez remplir tous les champs'); return }
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caracteres'); return }
    if (password !== password2) { setError('Les mots de passe ne correspondent pas'); return }
    setLoading(true)
    setTimeout(function() {
      var result = authRegister(prenom.trim(), nom.trim(), email.trim().toLowerCase(), password)
      if (result.ok) {
        window.location.href = '/compte'
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 600)
  }

  var pwStrength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3
  var pwColors = ['transparent', '#f87171', '#f59e0b', '#10b981']
  var pwLabels = ['', 'Faible', 'Moyen', 'Fort']

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '40px' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </Link>

      <div style={{ width: '100%', maxWidth: '420px', background: '#111', border: '1px solid rgba(196,150,42,0.25)', borderRadius: '16px', padding: '40px' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 6px 0' }}>Creer un compte</h1>
        <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>Rejoignez la communaute ACA Wholesale</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Prenom</label>
              <input type="text" value={prenom} onChange={function(e) { setPrenom(e.target.value); setError('') }} placeholder="Jean" autoComplete="given-name"
                style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Nom</label>
              <input type="text" value={nom} onChange={function(e) { setNom(e.target.value); setError('') }} placeholder="Dupont" autoComplete="family-name"
                style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Email</label>
            <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); setError('') }} placeholder="votre@email.com" autoComplete="email"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={function(e) { setPassword(e.target.value); setError('') }} placeholder="Min. 8 caracteres" autoComplete="new-password"
                style={{ width: '100%', padding: '12px 44px 12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
              <button type="button" onClick={function() { setShowPw(!showPw) }}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '16px', padding: '4px' }}>
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
            {password.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: pwStrength === 1 ? '33%' : pwStrength === 2 ? '66%' : '100%', height: '100%', background: pwColors[pwStrength], transition: 'width 0.3s, background 0.3s', borderRadius: '2px' }} />
                </div>
                <span style={{ color: pwColors[pwStrength], fontSize: '11px', fontWeight: 700, minWidth: '40px' }}>{pwLabels[pwStrength]}</span>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Confirmer le mot de passe</label>
            <input type={showPw ? 'text' : 'password'} value={password2} onChange={function(e) { setPassword2(e.target.value); setError('') }} placeholder="••••••••" autoComplete="new-password"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid ' + (password2 && password !== password2 ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'), borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
            {password2 && password === password2 && <div style={{ color: '#10b981', fontSize: '11px', marginTop: '6px', fontWeight: 600 }}>✓ Mots de passe identiques</div>}
          </div>

          {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontSize: '13px', fontWeight: 600 }}>{error}</div>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? 'rgba(196,150,42,0.5)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px' }}>
            {loading ? 'Creation du compte...' : 'CREER MON COMPTE'}
          </button>
        </form>

        <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
          <span style={{ color: '#555', fontSize: '13px' }}>Deja un compte ? </span>
          <Link href="/login" style={{ color: '#C4962A', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>Se connecter</Link>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#444', fontSize: '12px', textDecoration: 'none' }}>Retour a la boutique</Link>
      </div>
    </div>
  )
}
