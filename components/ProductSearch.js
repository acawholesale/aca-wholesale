'use client'

import { useState, useMemo, useCallback } from 'react'

const PAGE_SIZE = 6

/**
 * Barre de recherche + pagination pour la liste de lots.
 *
 * Usage dans app/produits/page.js :
 *   import ProductSearch from '../../components/ProductSearch'
 *   // Entourer la grille de produits avec ce composant
 *   <ProductSearch products={products} renderCard={(p) => <ProductCard key={p.id} product={p} />} />
 *
 * Props :
 *   products    {Array}    Tableau complet des produits (déjà filtrés par catégorie/tri)
 *   renderCard  {Function} (product) => JSX  —  rendu d'une carte
 *   className   {string}   Classes supplémentaires sur le wrapper
 */
export default function ProductSearch({ products = [], renderCard, className = '' }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  // Recherche : nom, description, marques, badges
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(p => {
      const haystack = [
        p.name,
        p.description,
        p.badge,
        p.id,
        ...(p.tags || []),
      ].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [products, query])

  // Remise à la page 1 dès qu'on change la recherche
  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
    setPage(1)
  }, [])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className={className}>
      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-sm">
          <span
            className="absolute inset-y-0 left-3 flex items-center text-white/40 pointer-events-none"
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Rechercher un lot, une marque…"
            aria-label="Rechercher parmi les lots"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/8 transition"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(1); }}
              aria-label="Effacer la recherche"
              className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white/70 transition"
            >
              ✕
            </button>
          )}
        </div>

        {/* Résultat count */}
        {query && (
          <p className="mt-2 text-sm text-white/40" aria-live="polite">
            {filtered.length === 0
              ? 'Aucun lot trouvé'
              : `${filtered.length} lot${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`}
          </p>
        )}
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-semibold">Aucun lot ne correspond à &ldquo;{query}&rdquo;</p>
          <p className="text-sm mt-1">Essayez avec un autre mot-clé</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map(renderCard)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="flex items-center justify-center gap-2 mt-10"
              aria-label="Pagination des lots"
            >
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Page précédente"
                className="px-3 py-2 rounded-lg border border-white/10 text-white/60 hover:border-white/30 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm"
              >
                ← Préc.
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={n === safePage ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    n === safePage
                      ? 'bg-white text-black'
                      : 'border border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Page suivante"
                className="px-3 py-2 rounded-lg border border-white/10 text-white/60 hover:border-white/30 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm"
              >
                Suiv. →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
