'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: resetError } = await resetPassword(email)
      if (resetError) {
        setError(resetError.message)
        setLoading(false)
        return
      }
      setSent(true)
    } catch {
      setError('Une erreur est survenue.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', padding: '13px 16px', fontSize: '14px', color: '#fff',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <main style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <a href="/" style={{ marginBottom: '40px', display: 'block' }}>
        <img src="/logo.png" alt="ACA Wholesale" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
      </a>

      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '36px 32px' }}>
          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '12px' }}>Email envoyé !</h1>
              <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
                Si un compte existe avec l&apos;adresse <strong style={{ color: '#fff' }}>{email}</strong>, vous recevrez un lien de réinitialisation dans les prochaines minutes.
              </p>
              <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '24px' }}>
                Pensez à vérifier vos spams.
              </p>
              <Link href="/login" style={{ display: 'block', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', padding: '13px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '6px', textDecoration: 'none', textAlign: 'center' }}>
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', textAlign: 'center' }}>
                Mot de passe oublié
              </h1>
              <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', marginBottom: '28px', lineHeight: 1.6 }}>
                Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', color: '#ef4444', fontSize: '13px' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="votre@email.com" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', color: loading ? '#666' : '#000', padding: '14px', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '6px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Envoi...' : 'ENVOYER LE LIEN'}
                </button>
              </form>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '13px', marginTop: '20px' }}>
          <Link href="/login" style={{ color: '#C4962A', fontWeight: 700, textDecoration: 'none' }}>
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  )
}
