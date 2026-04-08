'use client'
import { useParams } from 'next/navigation'
import { useCart } from '../../../context/CartContext'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { allProducts, getProductById, getStockStatus } from '../../data/products'
import { supabase } from '../../../lib/supabase'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductCard from '../../../components/ProductCard'
import Link from 'next/link'

function formatProduct(p) {
  return {
    id: p.id, name: p.name, description: p.description, longDescription: p.long_description,
    price: parseFloat(p.price), originalPrice: p.original_price ? parseFloat(p.original_price) : null,
    rating: p.rating, reviews: p.reviews, badge: p.badge, isNew: p.is_new, emoji: p.emoji,
    brand: p.brand, color: p.color, category: p.category, pieces: p.pieces, sizes: p.sizes,
    state: p.state, details: p.details || [], stock: p.stock, vinteMin: p.vinte_min, vinteMax: p.vinte_max,
    imageUrl: p.image_url, images: Array.isArray(p.images) ? p.images : [],
  }
}

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState(() => getProductById(id))
  const [related, setRelated] = useState([])
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!supabase) return
    supabase.from('products').select('*').eq('id', parseInt(id)).single().then(({ data }) => {
      if (data) setProduct(formatProduct(data))
    })
    supabase.from('products').select('*').neq('id', parseInt(id)).order('id').then(({ data }) => {
      if (data) setRelated(data.map(formatProduct))
    })
  }, [id])

  if (!product) {
    return (
      <main className="bg-transparent min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-5 py-20 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-black mb-4 text-white">Lot introuvable</h1>
          <Link
            href="/produits"
            className="inline-block text-black px-8 py-3 font-bold uppercase tracking-wide rounded"
            style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
          >
            Voir tous nos lots
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = related
    .filter(p => product && p.category === product.category)
    .slice(0, 4)

  const stockStatus = getStockStatus(product.stock ?? 5)
  const isSoldOut = product.stock === 0
  const isUrgent = product.stock > 0 && product.stock <= 3
  const pricePerPiece = product.pieces ? Math.round(product.price / product.pieces) : null
  const estimatedMargin = (product.vinteMax && product.pieces)
    ? Math.round(((product.vinteMax * product.pieces - product.price) / product.price) * 100)
    : null

  const handleAdd = () => {
    if (isSoldOut) return
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stars = Array(5).fill(0)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <main className="bg-transparent overflow-x-hidden">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 py-3 md:py-4">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/produits" className="hover:text-gray-300 transition-colors">Nos Lots</Link>
          <span>›</span>
          <span className="text-gray-300 font-medium truncate max-w-[150px] md:max-w-none">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-5 pb-10 md:pb-16">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">

          {/* Visual — Gallery */}
          <div>
            <div
              className="overflow-hidden rounded relative"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="aspect-square flex items-center justify-center relative"
                style={{ backgroundColor: product.imageUrl || (product.images && product.images.length > 0) ? '#1a1a1a' : (product.color + '33') }}
              >
                {/* Main image or emoji */}
                {(() => {
                  const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean)
                  if (allImages.length > 0) {
                    return (
                      <Image
                        src={allImages[activeImage] || allImages[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    )
                  }
                  return (
                    <div className="text-center z-0">
                      <div className="text-7xl md:text-9xl mb-4">{product.emoji}</div>
                      <span className="text-sm font-bold px-4 py-1.5 rounded-sm uppercase tracking-wide" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(4px)' }}>
                        {product.brand}
                      </span>
                    </div>
                  )
                })()}

                {/* Navigation arrows */}
                {(() => {
                  const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean)
                  if (allImages.length <= 1) return null
                  return (
                    <>
                      <button
                        onClick={() => setActiveImage(i => i === 0 ? allImages.length - 1 : i - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                        aria-label="Image précédente"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setActiveImage(i => i === allImages.length - 1 ? 0 : i + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                        aria-label="Image suivante"
                      >
                        ›
                      </button>
                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                        {allImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-white scale-125' : 'bg-white/40'}`}
                            aria-label={`Image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )
                })()}

                {isSoldOut && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <span className="font-black text-xl tracking-widest uppercase" style={{ color: '#ef4444' }}>ÉPUISÉ</span>
                  </div>
                )}
                {isUrgent && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                    <span className="text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wide" style={{ background: 'rgba(249,115,22,0.9)', color: '#fff' }}>
                      🔥 Plus que {product.stock} lot{product.stock > 1 ? 's' : ''} disponible{product.stock > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {product.badge && !isSoldOut && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-sm z-20">
                    {product.badge}
                </span>
              )}
              {product.isNew && !isSoldOut && (
                <span
                  className="absolute top-4 right-4 text-black text-xs font-bold px-3 py-1.5 rounded-sm z-20"
                  style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
                >
                  NOUVEAU
                </span>
              )}
            </div>
            </div>

            {/* Thumbnails */}
            {(() => {
              const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean)
              if (allImages.length <= 1) return null
              return (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {allImages.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeImage ? 'border-[#C4962A]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={url} alt={`${product.name} - photo ${i + 1}`} fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )
            })()}

            <div className="p-4 md:p-6 grid grid-cols-3 gap-3">
              {[
                { emoji: '📦', val: product.pieces, label: 'pièces' },
                { emoji: '📐', val: product.sizes, label: 'tailles' },
                { emoji: '✨', val: product.state, label: 'état' },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded p-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="text-xl md:text-2xl mb-1">{item.emoji}</div>
                  <div className="font-bold text-xs md:text-sm text-white truncate">{item.val}</div>
                  <div className="text-[10px] md:text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-3"
                style={{ background: stockStatus.bg, border: `1px solid ${stockStatus.color}33` }}
              >
                <span className={`w-2 h-2 rounded-full${isUrgent ? ' animate-pulse' : ''}`} style={{ background: stockStatus.color }} />
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: stockStatus.color }}>
                  {stockStatus.label}
                </span>
              </div>
              {isUrgent && (
                <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-sm" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)' }}>
                  <span className="text-sm">🔥</span>
                  <span className="text-xs font-bold text-orange-400">
                    Attention — seulement {product.stock} lot{product.stock > 1 ? 's' : ''} restant{product.stock > 1 ? 's' : ''}. Les lots épuisés ne sont pas réapprovisionnés.
                  </span>
                </div>
              )}

              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#C4962A' }}>
                {product.brand}
              </div>
              <h1 className="text-2xl md:text-4xl font-black mb-3 leading-tight text-white uppercase">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {stars.map((_, i) => (
                    <span key={i} className={`text-base ${i < product.rating ? 'star-filled' : 'text-white/10'}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">{product.reviews} avis</span>
              </div>

              <div
                className="rounded p-4 md:p-5 mb-6"
                style={{ background: 'rgba(196,150,42,0.08)', border: '1px solid rgba(196,150,42,0.25)' }}
              >
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-white">{product.price}€</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through mb-1">{product.originalPrice}€</span>
                      <span className="bg-red-600 text-white font-bold text-xs px-2 py-0.5 rounded mb-1">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {pricePerPiece && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400">Prix / pièce :</span>
                      <span className="font-bold text-white">~{pricePerPiece}€</span>
                    </div>
                  )}
                  {product.vinteMin && product.vinteMax && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400">Revente Vinted :</span>
                      <span className="font-bold" style={{ color: '#E8B84B' }}>{product.vinteMin}-{product.vinteMax}€/pièce</span>
                    </div>
                  )}
                  {estimatedMargin !== null && (
                    <div className="flex items-center gap-1.5 col-span-2">
                      <span className="text-gray-400">Marge estimée :</span>
                      <span className="font-black" style={{ color: '#22c55e' }}>+{estimatedMargin}%</span>
                      <span className="text-gray-500">(si vendu au max)</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">{product.longDescription}</p>

              <div
                className="rounded p-4 md:p-5 mb-6"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h3 className="font-bold text-sm mb-3 text-white uppercase tracking-wide">Ce lot contient :</h3>
                <ul className="space-y-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span
                        className="w-5 h-5 flex items-center justify-center text-[10px] font-black rounded-sm flex-shrink-0 text-black"
                        style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
                      >
                        ✓
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              {!isSoldOut && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-400">Quantité :</span>
                  <div
                    className="flex items-center gap-2 rounded-full px-2 py-1"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors font-bold text-lg text-white"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-white">{qty}</span>
                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors font-bold text-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAdd}
                disabled={isSoldOut}
                className="w-full py-4 font-black text-base rounded transition-all duration-300 uppercase tracking-wide"
                style={
                  isSoldOut
                    ? { background: 'rgba(255,255,255,0.08)', color: '#666', cursor: 'not-allowed' }
                    : added
                    ? { background: '#16a34a', color: '#fff' }
                    : { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }
                }
              >
                {isSoldOut
                  ? 'Ce lot est épuisé'
                  : added
                  ? '✓ Ajouté au panier !'
                  : `Ajouter au panier — ${product.price * qty}€`}
              </button>

              <Link
                href="/panier"
                className="block w-full py-3.5 font-bold text-sm text-center rounded transition-colors text-white uppercase tracking-wide"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Voir mon panier →
              </Link>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {[
                  { emoji: '🇫🇷', text: 'Expédié de France' },
                  { emoji: '✋', text: 'Sélection manuelle' },
                  { emoji: '📦', text: 'Livraison rapide' },
                ].map((b) => (
                  <div key={b.text} className="text-center text-[10px] md:text-xs text-gray-500">
                    <div className="text-base md:text-lg mb-0.5">{b.emoji}</div>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-8 text-white uppercase">Vous aimerez aussi</h2>
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
