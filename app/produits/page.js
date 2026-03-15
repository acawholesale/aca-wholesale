'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'

const allProducts = [
  { id: 1, name: 'Ballot Premium Nike / Adidas', description: '10 pièces - Sweats & Hoodies', price: 189, originalPrice: 249, rating: 5, reviews: 127, badge: 'BEST SELLER', emoji: '👟', brand: 'Nike / Adidas', color: '#f0f4ff', category: 'sweats' },
  { id: 2, name: 'Ballot The North Face', description: '8 pièces - Doudounes & Polaires', price: 299, originalPrice: 399, rating: 5, reviews: 89, badge: '-25%', emoji: '🏔️', brand: 'The North Face', color: '#f0fdf4', category: 'doudounes' },
  { id: 3, name: 'Ballot Ralph Lauren', description: '12 pièces - Polos & Chemises', price: 219, originalPrice: 289, rating: 4, reviews: 64, emoji: '🐎', brand: 'Ralph Lauren', color: '#fefce8', category: 'tshirts' },
  { id: 4, name: 'Ballot Streetwear Mix', description: '15 pièces - Stüssy, Carhartt, Supreme', price: 349, originalPrice: 449, rating: 5, reviews: 201, badge: 'POPULAIRE', isNew: true, emoji: '🔥', brand: 'Multi-marques', color: '#fef2f2', category: 'sweats' },
  { id: 5, name: 'Ballot Printemps Nike', description: '10 pièces - T-shirts & Shorts', price: 149, rating: 5, reviews: 12, isNew: true, emoji: '☀️', brand: 'Nike', color: '#ecfdf5', category: 'tshirts' },
  { id: 6, name: 'Ballot Denim Levi\'s', description: '8 pièces - Jeans & Vestes', price: 199, originalPrice: 259, rating: 4, reviews: 8, isNew: true, emoji: '👖', brand: 'Levi\'s', color: '#eff6ff', category: 'jeans' },
  { id: 7, name: 'Ballot Adidas Originals', description: '12 pièces - Tracksuits & Tees', price: 179, rating: 5, reviews: 15, isNew: true, emoji: '⚡', brand: 'Adidas', color: '#f5f3ff', category: 'sportswear' },
  { id: 8, name: 'Ballot Luxury Mix', description: '6 pièces - Burberry, Tommy, CK', price: 399, originalPrice: 529, rating: 5, reviews: 6, badge: 'EXCLUSIF', isNew: true, emoji: '💎', brand: 'Luxury', color: '#fdf4ff', category: 'sweats' },
  { id: 9, name: 'Ballot Doudounes Mix', description: '6 pièces - TNF, Columbia, Patagonia', price: 349, originalPrice: 459, rating: 5, reviews: 43, emoji: '🧥', brand: 'Multi-marques', color: '#f0fdf4', category: 'doudounes' },
  { id: 10, name: 'Ballot Jogging Nike', description: '10 pièces - Pantalons & Sweats', price: 159, rating: 4, reviews: 31, emoji: '🏃', brand: 'Nike', color: '#fef2f2', category: 'sportswear' },
  { id: 11, name: 'Ballot T-Shirts Premium', description: '20 pièces - Multi-marques', price: 129, rating: 4, reviews: 56, badge: 'PETIT PRIX', emoji: '👕', brand: 'Multi-marques', color: '#fefce8', category: 'tshirts' },
  { id: 12, name: 'Ballot Jeans Mixte', description: '10 pièces - Levi\'s, Diesel, Lee', price: 229, originalPrice: 299, rating: 5, reviews: 38, emoji: '👖', brand: 'Multi-marques', color: '#eff6ff', category: 'jeans' },
]

const categories = [
  { id: 'all', name: 'Tous les ballots' },
  { id: 'sweats', name: 'Sweats & Hoodies' },
  { id: 'tshirts', name: 'T-Shirts & Polos' },
  { id: 'doudounes', name: 'Doudounes' },
  { id: 'jeans', name: 'Jeans & Pantalons' },
  { id: 'sportswear', name: 'Sportswear' },
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

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-3">NOS BALLOTS</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Découvrez notre sélection de ballots de vêtements de marque. Triés à la main, qualité garantie.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-semibold px-4 py-2 transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border px-3 py-2 bg-white"
            >
              <option value="popular">Plus populaires</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-500 mb-6">{filtered.length} ballot{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-gray-400 mb-6">Contactez-nous pour un ballot personnalisé selon vos besoins.</p>
          <a href="/contact" className="inline-block bg-white text-black px-8 py-3 font-bold text-sm hover:bg-gray-200 transition-colors">
            NOUS CONTACTER
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
