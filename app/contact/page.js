'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: 'system-ui, sansserif' }}>
      <Navbar />

      {/* Header */}
      <section style={{ padding: '60px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', textAlign: 'center' }}>
        <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '12px' }}>Réponse rapide garantie</p>
        <h1 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 52px)', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 12px 0' }}>CONTACTEZ-NOUS</h1>
        <p style={{ color: '#555', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>Une question ? Notre équipe basée en Moselle vous répond rapidement.</p>
      </section>

      {/* Content */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

          {/* Infos de contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { emoji: '📧', title: 'Email', info: 'contact@aca-wholesale.com' },
              { emoji: '💬', title: 'Instagram', info: '@aca.wholesale' },
              { emoji: '📍', title: 'Localisation', info: 'Moselle, France' },
              { emoji: '⏰', title: 'Horaires', info: 'Lun-Ven : 9h-18h / Sam : 10h-16h' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{item.emoji}</span>
                <div>
                  <p style={{ color: '#555', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px 0' }}>{item.title}</p>
                  <p style={{ color: '#ccc', fontSize: '13px', whiteSpace: 'pre-line', margin: 0 }}>{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '32px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', margin: '0 0 8px 0' }}>Message envoyé !</h3>
                <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', margin: '0 0 24px 0' }}>Envoyez-nous un message</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  {[
                    { label: 'Prénom', placeholder: 'Votre prénom', type: 'text' },
                    { label: 'Nom', placeholder: 'Votre nom', type: 'text' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label style={{ display: 'block', color: '#555', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder} style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#555', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Email</label>
                  <input type="email" required placeholder="votre@email.com" style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', color: '#555', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Sujet</label>
                  <select style={{ width: '100%', padding: '11px 14px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ccc', fontSize: '13px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
                    <option>Demande d&apos;information</option>
                    <option>Devis personnalisé</option>
                    <option>Suivi de commande</option>
                    <option>Retour / Échange</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#555', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Message</label>
                  <textarea required rows={4} placeholder="Décrivez votre demande..." style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }}></textarea>
                </div>

                <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  ENVOYER LE MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
