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
    verified: true,
    photos: [],
  },
  {
    username: 'lion66',
    initial: 'l',
    color: '#ef4444',
    rating: 5,
    date: '10/03/2026',
    text: 'Tous est parfait, les pulls sont magnifiques. Encore merci.',
    verified: true,
    photos: [],
  },
  {
    username: 'giovanni2205',
    initial: 'g',
    color: '#ef4444',
    rating: 5,
    date: '03/03/2026',
    text: 'Belle qualité Merci !! 🙏',
    verified: false,
    photos: [],
  },
  {
    username: 'evamid03',
    initial: 'e',
    color: '#8b5cf6',
    rating: 5,
    date: '18/02/2026',
    text: 'Au top ! Aucun soucis vraiment vous pouvez y allez les yeux fermés 😉',
    verified: true,
    photos: [],
  },
  {
    username: 'deldav1187',
    initial: 'd',
    color: '#ef4444',
    rating: 5,
    date: '13/02/2026',
    text: 'Correspond parfaitement à la description. Merci beaucoup.',
    verified: false,
    photos: [],
  },
  {
    username: 'doris237',
    initial: 'd',
    color: '#ef4444',
    rating: 5,
    date: '11/02/2026',
    text: 'Top 👍 vraiment bon et en plus avec des surprises dans le colis 📦. Je recommande',
    verified: true,
    photos: [],
  },
  {
    username: 'quentinrig',
    initial: 'q',
    color: '#6b7280',
    rating: 5,
    date: '10/02/2026',
    text: "Premier fois que j'achète et ça s'est très bien passé. Article au top et vendeur aussi, je recommande",
    verified: false,
    photos: [],
  },
  {
    username: 'Client vérifié',
    initial: 'c',
    color: '#10b981',
    rating: 5,
    date: null,
    text: "Franchement vente rapide, ça va vraiment pouvoir m'aider à chiffrer et merci beaucoup pour la réactivité 👍",
    verified: true,
    photos: [],
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const hasPhotos = Array.isArray(review.photos) && review.photos.length > 0

  return (
    <article className="bg-card border border-[#1f1f1f] rounded-lg p-5 w-[280px] min-w-[280px] sm:w-[300px] sm:min-w-[300px] flex flex-col gap-3 shrink-0">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base uppercase shrink-0"
          style={{ background: review.color }}
          aria-hidden="true"
        >
          {review.initial}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-semibold text-sm m-0">{review.username}</p>
            {review.verified && (
              <span className="inline-flex items-center gap-1 bg-emerald-950 border border-emerald-700 text-emerald-400 text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Achat vérifié
              </span>
            )}
          </div>
          {review.date && (
            <p className="text-gray-400 text-xs m-0">{review.date}</p>
          )}
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-2">
        <StarRating count={review.rating} />
        <span className="text-amber-500 text-[13px] font-semibold">{review.rating}.0</span>
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed m-0">{review.text}</p>

      {/* Photo thumbnails */}
      {hasPhotos && (
        <div className="flex gap-2 flex-wrap mt-1">
          {review.photos.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxSrc(src)}
              className="w-[60px] h-[60px] rounded-lg overflow-hidden border border-[#2a2a2a] hover:border-amber-500 transition-colors duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label={`Voir photo ${idx + 1}`}
            >
              <img
                src={src}
                alt={`Photo avis ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Agrandissement de la photo"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 transition-colors rounded-full w-10 h-10 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={(e) => { e.stopPropagation(); setLightboxSrc(null) }}
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={lightboxSrc}
            alt="Photo de l'avis en grand"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
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
      @media (max-width: 640px) { .aca-track { animation-duration: 12s; } }
      @keyframes aca-scroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .aca-track {
        display: flex;
        gap: 16px;
        width: max-content;
        animation: aca-scroll 18s linear infinite;
      }
      .aca-track.paused { animation-play-state: paused; }
      @media (max-width: 640px) {
        .aca-track { animation-duration: 8s; }
      }
    `
    document.head.appendChild(style)
  }, [])

  if (showAll) {
    // Version grille pour la page /avis
    return (
      <section className="px-5 py-10" aria-label="Tous les avis clients">
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
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
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
      className="py-16 bg-[#0a0a0a] overflow-hidden"
      aria-label="Avis clients"
      aria-roledescription="carousel"
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
      <div className="text-center mb-10 px-5">
        <p className="text-amber-500 text-[13px] font-semibold tracking-[2px] uppercase mb-2">
          Ce que disent nos clients
        </p>
        <h2 className="text-white text-[clamp(22px,4vw,34px)] font-bold mt-0 mb-2.5">
          Ils nous font confiance ⭐
        </h2>
        <p className="text-gray-400 text-[15px] m-0">
          {reviews.length} avis vérifiés —{' '}
          <strong className="text-amber-500">Note moyenne 5.0 / 5</strong>
        </p>
      </div>

      {/* Screen-reader-accessible list of reviews (carousel track is aria-hidden) */}
      <ul className="sr-only">
        {reviews.map((r, i) => (
          <li key={i}>
            <article>
              <p>{r.username} — {r.rating} étoiles sur 5{r.date ? ` — ${r.date}` : ''}</p>
              <blockquote>{r.text}</blockquote>
            </article>
          </li>
        ))}
      </ul>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-[2] bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-[2] bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />

        {/* Track — items + exact duplicate for seamless loop */}
        <div
          ref={trackRef}
          className={`aca-track py-2${paused ? ' paused' : ''}`}
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
      <div className="text-center mt-9 px-5">
        <a
          href="/avis"
          className="inline-block py-[11px] px-[26px] border border-amber-500 rounded-md text-amber-500 font-semibold text-sm no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-md"
        >
          Voir tous les avis ({reviews.length}) →
        </a>
      </div>
    </section>
  )
}
