'use client'
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/CartContext'
import { useState } from 'react'
import { allProducts, getProductById, getStockStatus } from '../../data/products'
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

  if (!product) {
    return (
      <main className="bg-transparent min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-black mb-4 text-white">Lot introuvable</h1>
          <Link href="/produits" className="inline-block text-black px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
            Voir tous nos lots
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const stockStatus = getStockStatus(product.stock ?? 99)
  const isSoldOut = product.stock === 0
  const pricePerPiece = product.pieces ? Math.round(product.price / product.pieces) : null
  const estimatedRevenue = product.vinteMax ? product.vinteMax * product.pieces : null
  const estimatedMargin = estimatedRevenue ? Math.round(((estimatedRevenue - product.price) / product.price) * 100) : null

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const handleAdd = () => {
    if (isSoldOut) return
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stars = Array(5).fill(0)

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 py-3 md:py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/produits" className="hover:text-white transition-colors">Nos Lots</Link>
          <span>›</span>
          <span className="text-gray-300 truncate max-w-[150px] md:max-w-none">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-5 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">

          {/* Visual */}
          <div className="rounded-2xl overflow-hidden border border-white/10" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
            <div className="aspect-square flex items-center justify-center relative" style={{ backgroundColor: isSoldOut ? '#111' : product.color }}>
              <div className="text-center">
                <div className={`text-7xl md:text-9xl mb-4 ${isSoldOut ? 'grayscale opacity-30' : ''}`}>{product.emoji}</div>
                <span className="text-sm font-bold px-4 py-1.5 rounded-sm" style={{ background: 'rgba(0,0,0,0.6)', color: '#E8B84B' }}>
                  {product.brand}
                </span>
              </div>
              {isSoldOut && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
                  <span className="text-white font-black text-xl uppercase tracking-widest border-2 border-white/40 px-6 py-3">ÉPUISÉ</span>
                </div>
              )}
              {product.badge && !isSoldOut && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest">
                  {product.badge}
                </span>
              )}
              {!isSoldOut && product.stock <= 3 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <span className="text-xs font-black px-4 py-1.5 uppercase tracking-wide" style={{ background: 'rgba(249,115,22,0.95)', color: '#fff', borderRadius: '4px' }}>
                    ⚡ Plus que {product.stock} disponible{product.stock > 1 ? 's' : ''} !
                  </span>
                </div>
              )}
            </div>

            {/* Info pills */}
            <div className="p-4 md:p-5 grid grid-cols-3 gap-3">
              {[
                { icon: '📦', value: product.pieces, label: 'pièces' },
                { icon: '📐', value: product.sizes, label: 'tailles' },
                { icon: '✨', value: product.state, label: 'état' },
              ].map((info, i) => (
                <div key={i} className="rounded-xl p-3 text-center border border-white/5" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-xl mb-1">{info.icon}</div>
                  <div className="font-bold text-white text-xs truncate">{info.value}</div>
                  <div className="text-[10px] text-gray-500">{info.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ background: stockStatus.color }}></span>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: stockStatus.color }}>{stockStatus.label}</span>
              </div>

              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#C4962A' }}>{product.brand}</div>
              <h1 className="text-2xl md:text-4xl font-black mb-3 leading-tight text-white uppercase">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {stars.map((_, i) => (
                    <span key={i} className={`text-base ${i < product.rating ? 'star-filled' : 'text-white/10'}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">{product.reviews} avis</span>
              </div>

              {/* Price */}
              <div className="rounded-xl p-4 mb-5 border border-white/10" style={{ background: 'rgba(196,150,42,0.07)' }}>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-white">{product.price}€</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through mb-1">{product.originalPrice}€</span>
                      <span className="text-green-400 font-bold text-sm mb-1">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
                    </>
                  )}
                </div>
                {pricePerPiece && (
                  <p className="text-sm text-gray-400">
                    soit <span className="font-black text-yellow-400">~{pricePerPiece}€/pièce</span>
                    {product.vinteMin && (
                      <span className="text-gray-500"> · revente estimée <span className="text-green-400 font-bold">{product.vinteMin}-{product.vinteMax}€/pièce</span> sur Vinted</span>
                    )}
                  </p>
                )}
                {estimatedMargin && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Marge estimée</span>
                    <span className="font-black text-green-400 text-lg">+{estimatedMargin}%</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-5 text-sm">{product.longDescription}</p>

              {/* Details */}
              <div className="rounded-xl p-4 md:p-5 mb-5 border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <h3 className="font-black text-sm mb-3 text-white uppercase tracking-wide">Ce lot contient :</h3>
                <ul className="space-y-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold flex-shrink-0 rounded-sm text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add to cart */}
            <div className="space-y-3">
              {!isSoldOut && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">Quantité :</span>
                  <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2 py-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white font-bold text-lg transition-colors">−</button>
                    <span className="w-8 text-center font-black text-white">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white font-bold text-lg transition-colors">+</button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAdd}
                disabled={isSoldOut}
                className={`w-full py-4 font-black text-base rounded-xl transition-all duration-300 uppercase tracking-widest ${
                  isSoldOut ? 'opacity-40 cursor-not-allowed border border-white/10 text-gray-400' :
                  added ? 'bg-green-600 text-white scale-98' : 'text-black hover:opacity-90 hover:scale-[1.02]'
                }`}
                style={isSoldOut || added ? {} : { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
              >
                {isSoldOut ? 'Lot épuisé' : added ? '✓ Ajouté au panier !' : `Ajouter au panier — ${product.price * qty}€`}
              </button>

              {!isSoldOut && (
                <Link href="/panier" className="block w-full py-3.5 font-bold text-sm text-center border border-white/20 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all text-white">
                  Voir mon panier →
                </Link>
              )}

              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { emoji: '🇫🇷', text: 'Expédié de France' },
                  { emoji: '✋', text: 'Sélection manuelle' },
                  { emoji: '📦', text: 'Livraison rapide' },
                ].map(b => (
                  <div key={b.text} className="text-center text-[10px] text-gray-500">
                    <div className="text-base mb-0.5">{b.emoji}</div>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-xl md:text-3xl font-black mb-6 text-white uppercase">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
