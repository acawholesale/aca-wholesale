'use client'
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/CartContext'
import { useState } from 'react'
import { allProducts, getProductById } from '../../data/products'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductCard from '../../../components/ProductCard'
import Link from 'next/link'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const product = getProductById(id)
  const stars = Array(5).fill(0)

  if (!product) {
    return (
      <main className="bg-[#f0f0f3] min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-black mb-4">Lot introuvable</h1>
          <Link href="/produits" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors inline-block">Voir tous nos lots</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="bg-[#f0f0f3] overflow-x-hidden">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 py-3 md:py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-black">Accueil</Link><span>›</span>
          <Link href="/produits" className="hover:text-black">Nos Lots</Link><span>›</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-5 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '8px 8px 16px rgba(0,0,0,0.07), -8px -8px 16px rgba(255,255,255,0.9)' }}>
            <div className="aspect-square flex items-center justify-center relative" style={{ backgroundColor: product.color }}>
              <div className="text-center">
                <div className="text-7xl md:text-9xl mb-4">{product.emoji}</div>
                <span className="text-sm md:text-base font-semibold bg-white/80 px-4 py-1.5 rounded-full shadow">{product.brand}</span>
              </div>
              {product.badge && <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">{product.badge}</span>}
              {product.isNew && <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">NOUVEAU</span>}
            </div>
            <div className="p-4 md:p-6 grid grid-cols-3 gap-3">
              {[{ icon: '📦', val: product.pieces, label: 'pièces' }, { icon: '📐', val: product.sizes, label: 'tailles' }, { icon: '✨', val: product.state, label: 'état' }].map(b => (
                <div key={b.label} className="bg-gray-50 rounded-2xl p-3 text-center">
                  <div className="text-xl mb-1">{b.icon}</div>
                  <div className="font-bold text-xs truncate">{b.val}</div>
                  <div className="text-[10px] text-gray-500">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">{product.brand}</div>
              <h1 className="text-2xl md:text-4xl font-black mb-3">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">{stars.map((_, i) => <span key={i} className={`text-base ${i < product.rating ? 'star-filled' : 'text-gray-300'}`}>★</span>)}</div>
                <span className="text-sm text-gray-500">{product.reviews} avis</span>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl md:text-5xl font-black">{product.price}€</span>
                {product.originalPrice && <>
                  <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice}€</span>
                  <span className="bg-green-100 text-green-700 font-bold text-sm px-2.5 py-1 rounded-full mb-1">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
                </>}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">{product.longDescription}</p>
              <div className="bg-white rounded-2xl p-4 mb-6" style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.06), -4px -4px 10px rgba(255,255,255,0.8)' }}>
                <h3 className="font-bold text-sm mb-3">Ce lot contient :</h3>
                <ul className="space-y-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold rounded-full flex-shrink-0">✓</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Quantité :</span>
                <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1" style={{ boxShadow: '4px 4px 8px rgba(0,0,0,0.06), -4px -4px 8px rgba(255,255,255,0.8)' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 font-bold text-lg">−</button>
                  <span className="w-8 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 font-bold text-lg">+</button>
                </div>
              </div>
              <button onClick={handleAdd} className={`w-full py-4 font-black text-base rounded-full transition-all ${added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-blue-600'}`}>
                {added ? '✓ Ajouté au panier !' : `Ajouter au panier — ${product.price * qty}€`}
              </button>
              <Link href="/panier" className="block w-full py-3.5 font-bold text-sm text-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors">Voir mon panier →</Link>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  )
}
