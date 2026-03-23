'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      const s = localStorage.getItem('aca_session')
      if (s) router.push('/compte')
    } catch {}
  }, [router])

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('aca_users') || '[]')
        const user = users.find(u => u.email === form.email && u.password === form.password)
        if (!user) {
          setError('Email ou mot de passe incorrect.')
          setLoading(false)
          return
        }
        localStorage.setItem('aca_session', JSON.stringify({ email: user.email, prenom: user.prenom, nom: user.nom }))
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
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 900, color: '#6b7280',
    textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px',
  }

  return (
    <main id="main-content" tabIndex={-1} style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <a href="/" style={{ marginBottom: '40px', display: 'block' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </a>

      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '36px 32px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', textAlign: 'center' }}>
            Connexion
          </h1>
          <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', marginBottom: '28px' }}>
            Accédez à votre espace revendeur
          </p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', color: '#ef4444', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email</label>
              <input
                name="email" type="email" required value={form.email} onChange={handleChange}
                style={inputStyle} placeholder="votre@email.com"
                onFocus={e => e.target.style.borderColor = '#C4962A'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Mot de passe</label>
              <input
                name="password" type="password" required value={form.password} onChange={handleChange}
                style={inputStyle} placeholder="••••••••"
                onFocus={e => e.target.style.borderColor = '#C4962A'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <Link href="/mot-de-passe-oublie" style={{ fontSize: '12px', color: '#C4962A', textDecoration: 'none' }}>
                Mot de passe oublié ?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: loading ? '#666' : '#000', padding: '14px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
            >
              {loading ? 'Connexion...' : 'SE CONNECTER'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginTop: '20px' }}>
          Pas encore de compte ?{' '}
          <Link href="/register" style={{ color: '#C4962A', fontWeight: 700, textDecoration: 'none' }}>
            Créer un compte →
          </Link>
        </p>
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginTop: '16px' }}>
          📦 Vous avez une commande ?{' '}
          <Link href="/compte" style={{ color: '#C4962A', fontWeight: 700, textDecoration: 'none' }}>
            Suivre mon colis →
          </Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link href="/" style={{ color: '#4b5563', fontSize: '12px', textDecoration: 'none' }}>← Retour à l&apos;accueil</Link>
        </p>
      </div>
    </main>
  )
}
