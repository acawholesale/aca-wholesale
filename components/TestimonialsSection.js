'use client'

import { useEffect, useRef, useState } from 'react'

const reviews = [
  {
        username: 'ninisup',
        initial: 'n',
        color: '#f59e0b',
        rating: 5,
        date: '13/03/2026',
        text: 'Très bon vendeur, je suis satisfait de mon achat. Merci à toi 👌',
  },
  {
        username: 'lion66',
        initial: 'l',
        color: '#ef4444',
        rating: 5,
        date: '10/03/2026',
        text: 'Tous est parfait, les pulls sont magnifiques. Encore merci.',
  },
  {
        username: 'giovanni2205',
        initial: 'g',
        color: '#ef4444',
        rating: 5,
        date: '03/03/2026',
        text: 'Belle qualité Merci !! 🙏',
  },
  {
        username: 'evamid03',
        initial: 'e',
        color: '#8b5cf6',
        rating: 5,
        date: '18/02/2026',
        text: 'Au top ! Aucun soucis vraiment vous pouvez y allez les yeux fermés 😉',
  },
  {
        username: 'deldav1187',
        initial: 'd',
        color: '#ef4444',
        rating: 5,
        date: '13/02/2026',
        text: 'Correspond parfaitement à la description. Merci beaucoup.',
  },
  {
        username: 'doris237',
        initial: 'd',
        color: '#ef4444',
        rating: 5,
        date: '11/02/2026',
        text: 'Top 👍 vraiment bon et en plus avec des surprises dans le colis 📦. Je recommande',
  },
  {
        username: 'quentinrig',
        initial: 'q',
        color: '#6b7280',
        rating: 5,
        date: '10/02/2026',
        text: "Premier fois que j'achète et ça s'est très bien passé. Article au top et vendeur aussi, je recommande",
  },
  {
        username: 'Client vérifié',
        initial: 'c',
        color: '#10b981',
        rating: 5,
        date: null,
        text: "Franchement vente rapide, ça va vraiment pouvoir m'aider à chiffrer et merci beaucoup pour la réactivité 👍",
  },
  ]

function StarRating({ count = 5 }) {
    return (
          <div style={{ display: 'flex', gap: '2px' }} aria-label={`${count} étoiles sur 5`}>
{Array.from({ length: count }).map((_, i) => (
          <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
       ))}
</div>
  )
}

function ReviewCard({ review }) {
    return (
          <article
        style={{
                  background: '#111',
                  border: '1px solid #1f1f1f',
                  borderRadius: '12px',
                  padding: '20px',
                  width: '300px',
                  minWidth: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flexShrink: 0,
        }}
    >
{/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: review.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {review.initial}
            </div>
        <div>
                      <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px', margin: 0 }}>
{review.username}
</p>
{review.date && (
              <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
{review.date}
</p>
          )}
</div>
  </div>

{/* Stars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <StarRating count={review.rating} />
        <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600' }}>
{review.rating}.0
  </span>
  </div>

{/* Text */}
      <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
{review.text}
</p>
  </article>
  )
}

export default function TestimonialsSection({ showAll = false }) {
    const [paused, setPaused] = useState(false)
    const trackRef = useRef(null)

  // Inject keyframes once
  useEffect(() => {
        if (document.getElementById('aca-scroll-style')) return
        const style = document.createElement('style')
        style.id = 'aca-scroll-style'
        style.textContent = `
              @keyframes aca-scroll {
                      0%   { transform: translateX(0); }
                              100% { transform: translateX(-50%); }
                                    }
                                          .aca-track {
                                                  display: flex;
                                                          gap: 16px;
                                                                  width: max-content;
                                                                          animation: aca-scroll 30s linear infinite;
                                                                                }
                                                                                      .aca-track.paused {
                                                                                              animation-play-state: paused;
                                                                                                    }
                                                                                                        `
        document.head.appendChild(style)
  }, [])

  if (showAll) {
        // Version grille pour la page /avis
      return (
              <section style={{ padding: '40px 20px' }} aria-label="Tous les avis clients">
  {/* JSON-LD SEO */}
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                          __html: JSON.stringify({
                                          '@context': 'https://schema.org',
                                          '@type': 'Organization',
                                          name: 'ACA Wholesale',
                                          aggregateRating: {
                                                            '@type': 'AggregateRating',
                                                            ratingValue: '5',
                                                            reviewCount: String(reviews.length),
                                                            bestRating: '5',
                                          },
                                          review: reviews.map((r) => ({
                                                            '@type': 'Review',
                                                            author: { '@type': 'Person', name: r.username },
                                                            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                                                            reviewBody: r.text,
                                                            ...(r.date ? { datePublished: r.date.split('/').reverse().join('-') } : {}),
                                          })),
                          }),
            }}
        />
        <div
          style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '16px',
          }}
        >
{reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
</div>
  </section>
    )
}

  // Version carrousel infini pour la page d'accueil
  return (
        <section
      style={{ padding: '60px 0', background: '#0a0a0a', overflow: 'hidden' }}
      aria-label="Avis clients"
    >
      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                                  '@context': 'https://schema.org',
                                  '@type': 'Organization',
                                  name: 'ACA Wholesale',
                                  aggregateRating: {
                                                  '@type': 'AggregateRating',
                                                  ratingValue: '5',
                                                  reviewCount: String(reviews.length),
                                                  bestRating: '5',
                                  },
                    }),
        }}
      />

{/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
        <p style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
          Ce que disent nos clients
            </p>
        <h2 style={{ color: '#fff', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: '700', margin: '0 0 10px' }}>
          Ils nous font confiance ⭐
            </h2>
        <p style={{ color: '#9ca3af', fontSize: '15px', margin: 0 }}>
{reviews.length} avis vérifiés —{' '}
          <strong style={{ color: '#f59e0b' }}>Note moyenne 5.0 / 5</strong>
            </p>
            </div>

{/* Fade edges */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
                        background: 'linear-gradient(to right, #0a0a0a, transparent)',
                        pointerEvents: 'none',
          }}
        />
        <div
          style={{
                        position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 2,
                        background: 'linear-gradient(to left, #0a0a0a, transparent)',
                        pointerEvents: 'none',
          }}
        />

{/* Track — items + exact duplicate for seamless loop */}
        <div
          ref={trackRef}
          className={`aca-track${paused ? ' paused' : ''}`}
          style={{ padding: '8px 0' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-hidden="true"
        >
          {/* Original set */}
{reviews.map((r, i) => (
              <ReviewCard key={`a-${i}`} review={r} />
            ))}
{/* Exact duplicate — makes the loop seamless */}
{reviews.map((r, i) => (
              <ReviewCard key={`b-${i}`} review={r} />
            ))}
  </div>
  </div>

{/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '36px', padding: '0 20px' }}>
        <a
          href="/avis"
          style={{
                        display: 'inline-block',
                        padding: '11px 26px',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        color: '#f59e0b',
                        fontWeight: '600',
                        fontSize: '14px',
                        textDecoration: 'none',
          }}
        >
          Voir tous les avis ({reviews.length}) →
            </a>
            </div>
            </section>
  )
}
