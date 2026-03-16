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

  let filtered = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory)

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sortBy === 'popular') filtered = [...filtered].sort((a, b) => b.reviews - a.reviews)
  if (sortBy === 'new') filtered = [...filtered].filter(p => p.isNew)

  return (
    <main className="bg-[#f0f0f3] overflow-x-hidden">
      <Navbar />
      <section className="bg-black text-white py-12 md:py-16 rounded-b-[24px] md:rounded-b-[40px]">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-3">NOS LOTS</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            {allProducts.length} lots sélectionnés avec soin, pensés pour la revente. Expédiés depuis la Moselle.
          </p>
        </div>
      </section>
      <section className="bg-white/90 backdrop-blur-md sticky top-14 md:top-16 z-40 rounded-b-2xl border-b border-gray-100" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="filter-scroll flex gap-2 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-semibold px-3.5 md:px-4 py-2 transition-all rounded-full whitespace-nowrap flex-shrink-0 ${
                    activeCategory === cat.id ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' } : {}}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs md:text-sm border border-gray-200 px-2 md:px-3 py-2 bg-white rounded-full flex-shrink-0 cursor-pointer"
            >
              <option value="popular">Populaires</option>
              <option value="price-asc">Prix ↑</option>
              <option value="price-desc">Prix ↓</option>
              <option value="new">Nouveautés</option>
            </select>
          </div>
        </div>
      </section>
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              {filtered.length} lot{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            </p>
            {activeCategory !== 'all' && (
              <button onClick={() => setActiveCategory('all')} className="text-xs font-semibold hover:underline" style={{ color: '#C4962A' }}>
                Voir tous →
              </button>
            )}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">😕</div>
              <p className="text-gray-500 font-medium">Aucun lot trouvé dans cette catégorie.</p>
              <button onClick={() => setActiveCategory('all')} className="mt-4 font-bold hover:underline text-sm" style={{ color: '#C4962A' }}>
                Voir tous les lots
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section
        className="text-white py-12 md:py-16 rounded-[24px] md:rounded-[40px] mx-3 md:mx-4 mb-6 md:mb-8"
        style={{ background: '#0a0a0a', border: '1px solid #C4962A33' }}
      >
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-xl md:text-3xl font-black mb-3 md:mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-gray-400 mb-5 md:mb-6 text-sm">Contactez-nous pour un lot personnalisé selon vos besoins.</p>
          <a href="/contact" className="inline-block text-black px-6 md:px-8 py-3 font-bold text-sm transition-all rounded-full" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
            NOUS CONTACTER
          </a>
        </div>
      </section>
      <Footer />
    </main>
  )
}
