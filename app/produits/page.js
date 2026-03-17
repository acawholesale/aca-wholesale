'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import { allProducts } from '../data/products'

const categories = [
  { id: 'all', name: 'Tous', emoji: '🛍️' },
  { id: 'sweats', name: 'Sweats', emoji: '🧥' },
  { id: 'tshirts', name: 'T-Shirts', emoji: '👕' },
  { id: 'doudounes', name: 'Doudounes', emoji: '🧥' },
  { id: 'jeans', name: 'Jeans', emoji: '👖' },
  { id: 'sportswear', name: 'Sport', emoji: '🏃' },
]

export default function Produits() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  let filtered = activeCategory === 'all' ? allProducts : allProducts.filter(p => p.category === activeCategory)
  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'popular') filtered = [...filtered].sort((a, b) => b.reviews - a.reviews)
  if (sortBy === 'new') filtered = [...filtered].filter(p => p.isNew)

  return (
    <main className="bg-transparent overflow-x-hidden min-h-screen">
      <Navbar />

      <section className="text-white py-12 md:py-20 border-b border-white/10" style={{ background: 'rgba(8,5,0,0.4)' }}>
        <div className="max-w-7xl mx-auto px-5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-black mb-3">ACA Wholesale</p>
          <h1 className="text-3xl md:text-6xl font-black uppercase mb-2">NOS LOTS</h1>
          <p className="text-gray-500 text-sm">{allProducts.length} lots sélectionnés — Expédiés depuis la Moselle</p>
        </div>
      </section>

      <section className="sticky top-14 md:top-16 z-40 border-b border-white/10" style={{ background: 'rgba(5,3,0,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="filter-scroll flex gap-2 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] font-black px-3.5 py-2 transition-all uppercase tracking-widest whitespace-nowrap flex-shrink-0 ${activeCategory === cat.id ? 'text-black' : 'text-gray-500 border border-white/10 hover:border-white/30'}`}
                  style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' } : { background: 'transparent' }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[10px] border border-white/10 px-3 py-2 text-white flex-shrink-0 cursor-pointer uppercase tracking-widest font-black"
              style={{ background: 'transparent' }}
            >
              <option value="popular" style={{ background: '#0a0600' }}>Populaires</option>
              <option value="price-asc" style={{ background: '#0a0600' }}>Prix ↑</option>
              <option value="price-desc" style={{ background: '#0a0600' }}>Prix ↓</option>
              <option value="new" style={{ background: '#0a0600' }}>Nouveautés</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">
              {filtered.length} lot{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
            {activeCategory !== 'all' && (
              <button onClick={() => setActiveCategory('all')} className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors" style={{ color: '#C4962A' }}>
                VOIR TOUT →
              </button>
            )}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">😕</div>
              <p className="text-gray-500 font-black uppercase tracking-wide text-xs">Aucun lot trouvé.</p>
              <button onClick={() => setActiveCategory('all')} className="mt-4 font-black text-xs uppercase tracking-widest hover:text-white transition-colors" style={{ color: '#C4962A' }}>Voir tous les lots →</button>
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
          <p className="text-gray-500 mb-6 text-sm">Contactez-nous pour un lot personnalisé.</p>
          <a href="/contact" className="inline-block text-black px-8 py-3 font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
            NOUS CONTACTER
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
