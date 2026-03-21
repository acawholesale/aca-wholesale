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

        {/* CTA */}
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
