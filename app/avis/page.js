'use client'

import Navbar from '../../components/Navbar'
import TestimonialsSection from '../../components/TestimonialsSection'

export default function AvisPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar />

      <div id="main-content" tabIndex={-1} style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 20px 0' }}>
          <p style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Transparence totale
          </p>
          <h1 style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', margin: '0 0 16px' }}>
            Avis de nos clients
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Des vrais clients, de vrais achats. Découvrez ce qu'ils pensent d'ACA Wholesale.
          </p>
        </div>

        {/* Badge note globale */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 20px 0' }}>
          <div style={{
            background: '#111',
            border: '1px solid #f59e0b',
            borderRadius: '16px',
            padding: '20px 40px',
            textAlign: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '48px', fontWeight: '800', color: '#f59e0b', lineHeight: 1 }}>5.0</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>8 avis vérifiés</span>
          </div>
        </div>

        {/* Grille de tous les avis */}
        <TestimonialsSection showAll={true} />

        {/* CTA — partager son avis avec photos */}
        <div style={{ padding: '0 20px 48px', maxWidth: '680px', margin: '0 auto' }}>
          <div style={{
            border: '1px solid #C4962A',
            borderRadius: '16px',
            padding: '32px 36px',
            background: 'linear-gradient(135deg, #111 0%, #0d0d0d 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4962A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <h2 style={{ color: '#C4962A', fontSize: '17px', fontWeight: '700', margin: 0 }}>
                Vous avez acheté un lot ?
              </h2>
            </div>
            <p style={{ color: '#d1d5db', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              Partagez votre expérience et envoyez-nous vos photos. Votre avis aide d'autres acheteurs et renforce la confiance dans notre communauté.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
              Envoyez vos photos et votre avis à{' '}
              <a
                href="mailto:contact@aca-wholesale.com"
                style={{ color: '#C4962A', fontWeight: '600', textDecoration: 'none' }}
              >
                contact@aca-wholesale.com
              </a>
            </p>
          </div>
        </div>

        {/* CTA produits */}
        <div style={{ textAlign: 'center', padding: '0 20px 60px' }}>
          <p style={{ color: '#9ca3af', fontSize: '15px', marginBottom: '20px' }}>
            Prêt à rejoindre nos clients satisfaits ?
          </p>
          <a
            href="/produits"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              background: '#fff',
              color: '#000',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            Voir nos produits →
          </a>
        </div>
      </div>
    </div>
  )
}
