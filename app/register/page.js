'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', confirm: '', activite: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (form.password.length < 6) { setError('Le mot de passe doit faire au moins 6 caractères.'); return }
    setLoading(true)
    try {
      if (!signUp) {
        setError('Service d\'authentification non disponible. Vérifiez la configuration Supabase.')
        setLoading(false)
        return
      }
      const { data, error: authError } = await signUp(form.email, form.password, {
        prenom: form.prenom,
        nom: form.nom,
        activite: form.activite,
      })
      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Un compte existe déjà avec cet email.')
        } else {
          setError(authError.message)
        }
        setLoading(false)
        return
      }
      if (data?.user?.identities?.length === 0) {
        setError('Un compte existe déjà avec cet email.')
        setLoading(false)
        return
      }
      // If email confirmation is required, show message
      if (data?.user && !data?.session) {
        setError('')
        router.push('/login?message=confirm')
      } else {
        router.push('/compte')
      }
    } catch (err) {
      setError('Erreur : ' + (err?.message || 'Connexion au service impossible'))
      setLoading(false)
    }
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

  return (
    <main id="main-content" tabIndex={-1} style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
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
                <input name="prenom" type="text" required value={form.prenom} onChange={handleChange} style={inputStyle} placeholder="Jean" />
              </div>
              <div>
                <label style={labelStyle}>Nom *</label>
                <input name="nom" type="text" required value={form.nom} onChange={handleChange} style={inputStyle} placeholder="Dupont" />
              </div>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="votre@email.com" />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Activité de revente</label>
              <select name="activite" value={form.activite} onChange={handleChange} style={inputStyle}>
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
              <input name="password" type="password" required value={form.password} onChange={handleChange} style={inputStyle} placeholder="Minimum 6 caractères" />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Confirmer le mot de passe *</label>
              <input name="confirm" type="password" required value={form.confirm} onChange={handleChange} style={inputStyle} placeholder="Répéter le mot de passe" />
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
