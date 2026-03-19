'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

export default function AdminLoginPage() {
  var pw = useState('')
  var password = pw[0]
  var setPassword = pw[1]
  var er = useState('')
  var error = er[0]
  var setError = er[1]

  function handleLogin() {
    if (password === 'admin2026') {
      document.cookie = 'admin_session=admin2026; path=/; max-age=86400'
      window.location.href = '/admin'
    } else {
      setError('Mot de passe incorrect')
      setPassword('')
    }
  }

  function onType(e) {
    setPassword(e.target.value)
    setError('')
  }

  function onKey(e) {
    if (e.key === 'Enter') handleLogin()
  }

  function goBack() {
    window.location.href = '/'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        <span style={{ background: '#fff', color: '#000', padding: '6px 10px', fontWeight: 900, fontSize: '18px', borderRadius: '6px 0 0 6px' }}>AC</span>
        <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '6px 8px', fontWeight: 900, fontSize: '18px', borderRadius: '0 6px 6px 0' }}>A</span>
        <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginLeft: '10px' }}>Wholesale</span>
      </div>
      <div style={{ width: '100%', maxWidth: '360px', background: '#111', border: '1px solid rgba(196,150,42,0.35)', borderRadius: '12px', padding: '40px' }}>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 8px 0' }}>Administration</h1>
        <p style={{ color: '#555', fontSize: '13px', textAlign: 'center', margin: '0 0 32px 0' }}>Entrez le mot de passe</p>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Mot de passe</label>
          <input type="password" value={password} onChange={onType} onKeyDown={onKey} placeholder="••••••••" autoFocus style={{ width: '100%', padding: '13px 16px', background: 'rgba(255,255,255,0.05)', border: error ? '1px solid #f87171' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
          {error ? <div style={{ color: '#f87171', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>{error}</div> : null}
        </div>
        <button onClick={handleLogin} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>SE CONNECTER</button>
        <div style={{ textAlign: 'center' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#444', fontSize: '12px', cursor: 'pointer' }}>Retour</button>
        </div>
      </div>
    </div>
  )
}
