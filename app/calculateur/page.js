'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MarginCalculator from '../../components/MarginCalculator'

,
}

const TIER_CARDS = [
  {
    name: 'Basic',
    range: '30 – 50%',
    description: 'Lots mixtes, marques grand public. Idéal pour démarrer et tester la revente.',
    examples: 'H&M, Zara, Mango',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.06)',
    border: 'rgba(34,197,94,0.2)',
  },
  {
    name: 'Premium',
    range: '50 – 80%',
    description: 'Marques sportswear et lifestyle sélectionnées. Fort potentiel sur Vinted et Leboncoin.',
    examples: 'Nike, Adidas, Tommy Hilfiger',
    color: '#C4962A',
    bg: 'rgba(196,150,42,0.06)',
    border: 'rgba(196,150,42,0.3)',
    featured: true,
  },
  {
    name: 'Luxury',
    range: '80 – 120%',
    description: 'Pièces de luxe et streetwear rare. Marges maximales pour revendeurs expérimentés.',
    examples: "Ralph Lauren, Arc'teryx, Patagonia",
    color: '#E8B84B',
    bg: 'rgba(232,184,75,0.06)',
    border: 'rgba(232,184,75,0.25)',
  },
]

export default function CalculateurPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0500' }}>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section
          style={{
            padding: '80px 24px 56px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '300px',
              background: 'radial-gradient(ellipse, rgba(196,150,42,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <p
            style={{
              color: '#C4962A',
              fontWeight: 700,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '16px',
              position: 'relative',
            }}
          >
            Outil gratuit
          </p>
          <h1
            style={{
              color: '#fff',
              fontWeight: 900,
              fontSize: 'clamp(28px, 5vw, 52px)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
              position: 'relative',
            }}
          >
            Calculez votre{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C4962A, #E8B84B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              marge de revente
            </span>
          </h1>
          <p
            style={{
              color: '#888',
              fontSize: '16px',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.65,
              position: 'relative',
            }}
          >
            Estimez vos bénéfices avant d&apos;acheter un lot. Entrez le prix du lot, le
            nombre de pièces et votre prix de revente moyen.
          </p>
        </section>

        {/* Calculator */}
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '56px 24px' }}>
          <MarginCalculator />
        </section>

        {/* Typical margins */}
        <section
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 24px 72px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p
              style={{
                color: '#C4962A',
                fontWeight: 700,
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '10px',
              }}
            >
              Nos gammes
            </p>
            <h2
              style={{
                color: '#fff',
                fontWeight: 900,
                fontSize: 'clamp(22px, 3vw, 32px)',
                margin: 0,
              }}
            >
              Marges typiques par niveau de lot
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {TIER_CARDS.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.featured ? tier.bg : '#111',
                  border: `1px solid ${tier.featured ? tier.border : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '14px',
                  padding: '28px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {tier.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'linear-gradient(135deg, #C4962A, #E8B84B)',
                      color: '#000',
                      fontSize: '9px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    Populaire
                  </div>
                )}

                {/* Tier label */}
                <p
                  style={{
                    color: tier.color,
                    fontWeight: 700,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    margin: '0 0 8px 0',
                  }}
                >
                  {tier.name}
                </p>

                {/* Margin range */}
                <p
                  style={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '36px',
                    lineHeight: 1,
                    margin: '0 0 14px 0',
                  }}
                >
                  {tier.range}
                </p>

                <p
                  style={{
                    color: '#aaa',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0',
                  }}
                >
                  {tier.description}
                </p>

                {/* Examples */}
                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p
                    style={{
                      color: '#555',
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                      margin: '0 0 6px 0',
                    }}
                  >
                    Marques incluses
                  </p>
                  <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{tier.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '56px 24px 72px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#C4962A',
              fontWeight: 700,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '14px',
            }}
          >
            Prêt à commencer ?
          </p>
          <h2
            style={{
              color: '#fff',
              fontWeight: 900,
              fontSize: 'clamp(24px, 4vw, 40px)',
              margin: '0 0 12px 0',
            }}
          >
            Parcourez nos lots disponibles
          </h2>
          <p
            style={{
              color: '#888',
              fontSize: '15px',
              maxWidth: '400px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            Stock limité. Commandez aujourd&apos;hui et revendez dès cette semaine.
          </p>
          <Link
            href="/produits"
            style={{
              display: 'inline-block',
              padding: '15px 36px',
              background: 'linear-gradient(135deg, #C4962A, #E8B84B)',
              color: '#000',
              fontWeight: 900,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Voir nos lots
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
