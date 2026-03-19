'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', confirm: '', activite: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (form.password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères.'); return }
    setLoading(true)
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('aca_users') || '[]')
        if (users.find(u => u.email === form.email)) {
          setError('Un compte existe déjà avec cet email.')
          setLoading(false)
          return
        }
        const newUser = { prenom: form.prenom, nom: form.nom, email: form.email, password: form.password, activite: form.activite, createdAt: Date.now() }
        users.push(newUser)
        localStorage.setItem('aca_users', JSON.stringify(users))
        localStorage.setItem('aca_session', JSON.stringify({ email: newUser.email, prenom: newUser.prenom, nom: newUser.nom }))
        router.push('/compte')
      } catch {
        setError('Une erreur est survenue.')
        setLoading(false)
      }
    }, 600)
  }

  const inputStyle = {
    width: '100%', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', padding: '13px 16px', fontSize: '14px', color: '#fff',
    outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 900, color: '#6b7280',
    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px',
  }
  const focusHandler = e => e.target.style.borderColor = '#C4962A'
  const blurHandler = e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'

  return (
    <main style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <a href="/" style={{ marginBottom: '40px', display: 'block' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </a>

      <div style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '36px 32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', textAlign: 'center' }}>
            Créer un compte
          </h1>
          <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', marginBottom: '28px' }}>
            Rejoignez la communauté ACA Wholesale
          </p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', color: '#ef4444', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>Prénom *</label>
                <input name="prenom" type="text" required value={form.prenom} onChange={handleChange} style={inputStyle} placeholder="Jean" onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>Nom *</label>
                <input name="nom" type="text" required value={form.nom} onChange={handleChange} style={inputStyle} placeholder="Dupont" onFocus={focusHandler} onBlur={blurHandler} />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="votre@email.com" onFocus={focusHandler} onBlur={blurHandler} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Activité de revente</label>
              <select name="activite" value={form.activite} onChange={handleChange} style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}>
                <option value="">Sélectionner...</option>
                <option>Revendeur Vinted</option>
                <option>Revendeur Leboncoin / Facebook</option>
                <option>Boutique en ligne</option>
                <option>Brocante / Vide-grenier</option>
                <option>Autre</option>
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Mot de passe *</label>
              <input name="password" type="password" required value={form.password} onChange={handleChange} style={inputStyle} placeholder="Minimum 6 caractères" onFocus={focusHandler} onBlur={blurHandler} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Confirmer le mot de passe *</label>
              <input name="confirm" type="password" required value={form.confirm} onChange={handleChange} style={inputStyle} placeholder="Répéter le mot de passe" onFocus={focusHandler} onBlur={blurHandler} />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: loading ? '#666' : '#000', padding: '14px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Création...' : 'CRÉER MON COMPTE'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginTop: '20px' }}>
          Déjà un compte ?{' '}
          <Link href="/login" style={{ color: '#C4962A', fontWeight: 700, textDecoration: 'none' }}>
            Se connecter →
          </Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/" style={{ color: '#4b5563', fontSize: '12px', textDecoration: 'none' }}>← Retour à l&apos;accueil</Link>
        </p>
      </div>
    </main>
  )
}
