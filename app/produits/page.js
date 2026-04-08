'use client'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import { allProducts, getStockStatus } from '../data/products'
import { supabase } from '../../lib/supabase'

const categories = [
  { id: 'all', name: 'Tous', emoji: '🛍️' },
  { id: 'sweats', name: 'Sweats', emoji: '🧥' },
  { id: 'tshirts', name: 'T-Shirts', emoji: '👕' },
  { id: 'doudounes', name: 'Doudounes', emoji: '🧥' },
  { id: 'jeans', name: 'Jeans', emoji: '👖' },
  { id: 'sportswear', name: 'Sport', emoji: '🏃' },
]

const budgetRanges = [
  { id: 'all', label: 'Tous les prix' },
  { id: 'low', label: '< 150€', min: 0, max: 150 },
  { id: 'mid', label: '150€ – 250€', min: 150, max: 250 },
  { id: 'high', label: '250€ – 400€', min: 250, max: 400 },
  { id: 'premium', label: '400€+', min: 400, max: Infinity },
]

export default function Produits() {
  const [products, setProducts] = useState(allProducts)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [search, setSearch] = useState('')
  const [budgetFilter, setBudgetFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.from('products').select('*').order('id').then(({ data, error }) => {
      if (error || !data || data.length === 0) return
      setProducts(data.map(p => ({
        id: p.id, name: p.name, description: p.description, longDescription: p.long_description,
        price: parseFloat(p.price), originalPrice: p.original_price ? parseFloat(p.original_price) : null,
        rating: p.rating, reviews: p.reviews, badge: p.badge, isNew: p.is_new, emoji: p.emoji,
        brand: p.brand, color: p.color, category: p.category, pieces: p.pieces, sizes: p.sizes,
        state: p.state, details: p.details || [], stock: p.stock, vinteMin: p.vinte_min, vinteMax: p.vinte_max,
      })))
    })
  }, [])

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }
    if (budgetFilter !== 'all') {
      const range = budgetRanges.find(r => r.id === budgetFilter)
      if (range) list = list.filter(p => p.price >= range.min && p.price < range.max)
    }
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    else if (sortBy === 'popular') list = [...list].sort((a, b) => b.reviews - a.reviews)
    else if (sortBy === 'new') list = list.filter(p => p.isNew)
    else if (sortBy === 'margin') list = [...list].sort((a, b) => (b.vinteMax * b.pieces - b.price) - (a.vinteMax * a.pieces - a.price))
    return list
  }, [products, activeCategory, search, budgetFilter, sortBy])

  const activeFiltersCount = [activeCategory !== 'all', budgetFilter !== 'all', search.trim() !== ''].filter(Boolean).length
  const clearAll = () => { setActiveCategory('all'); setBudgetFilter('all'); setSearch(''); setSortBy('popular') }

  return (
    <main id="main-content" tabIndex={-1} className="bg-black overflow-x-hidden min-h-screen">
      <Navbar />
      <section className="bg-black text-white py-10 md:py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">ACA Wholesale</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-6xl font-black uppercase mb-2">NOS LOTS</h1>
              <p className="text-gray-500 text-sm">{products.length} lots sélectionnés avec soin — Expédiés depuis la Moselle</p>
            </div>
            <div className="relative max-w-xs w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un lot, une marque..." className="w-full pl-10 pr-4 py-2.5 text-sm text-white rounded-sm outline-none" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }} onFocus={e => e.target.style.borderColor = '#C4962A'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-lg leading-none">×</button>}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black sticky top-14 md:top-16 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="filter-scroll flex gap-2 flex-1 overflow-x-auto">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className="text-[10px] font-black px-3.5 py-2 transition-all uppercase tracking-widest whitespace-nowrap flex-shrink-0 rounded-sm" style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'transparent', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setShowFilters(!showFilters)} className="text-[10px] font-black px-3 py-2 rounded-sm uppercase tracking-wide flex items-center gap-1.5 transition-all" style={showFilters || budgetFilter !== 'all' ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { border: '1px solid rgba(255,255,255,0.15)', color: '#9ca3af' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
                Budget {budgetFilter !== 'all' && <span className="bg-black/30 px-1 rounded-full text-[9px]">1</span>}
              </button>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs border border-white/10 px-3 py-2 bg-black text-white rounded-sm flex-shrink-0 cursor-pointer uppercase tracking-wide font-bold">
                <option value="popular">Populaires</option>
                <option value="price-asc">Prix ↑</option>
                <option value="price-desc">Prix ↓</option>
                <option value="new">Nouveautés</option>
                <option value="margin">Meilleure marge</option>
              </select>
            </div>
          </div>
          {showFilters && (
            <div className="pt-3 pb-1 border-t border-white/10 mt-3 flex flex-wrap gap-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest self-center mr-1">Budget :</span>
              {budgetRanges.map(r => (
                <button key={r.id} onClick={() => setBudgetFilter(r.id)} className="text-[10px] font-black px-3 py-1.5 rounded-sm uppercase tracking-wide transition-all" style={budgetFilter === r.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { border: '1px solid rgba(255,255,255,0.12)', color: '#9ca3af' }}>
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
              {filtered.length} lot{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
              {search && <span className="text-[#C4962A] ml-1">pour &quot;{search}&quot;</span>}
            </p>
            {activeFiltersCount > 0 && <button onClick={clearAll} className="text-xs font-black hover:text-white transition-colors uppercase tracking-widest" style={{ color: '#C4962A' }}>Effacer filtres ({activeFiltersCount}) ×</button>}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-white font-black text-lg uppercase mb-2">Aucun lot trouvé</p>
              <p className="text-gray-500 text-sm mb-6">{search ? `Aucun résultat pour "${search}"` : 'Essayez de modifier vos filtres'}</p>
              <button onClick={clearAll} className="font-black text-sm uppercase tracking-widest px-6 py-3 rounded-sm transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>Voir tous les lots →</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          )}
        </div>
      </section>
      <section className="border-t border-white/10 py-12 md:py-16 mx-3 md:mx-4 mb-6 md:mb-8">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-xl md:text-3xl font-black uppercase mb-3 text-white">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-gray-500 mb-6 text-sm">Contactez-nous pour un lot personnalisé selon vos besoins.</p>
          <a href="/contact" className="inline-block text-black px-8 py-3 font-black text-xs uppercase tracking-widest transition-all hover:opacity-90 rounded-sm" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>NOUS CONTACTER</a>
        </div>
      </section>
      <Footer />
    </main>
  )
}
