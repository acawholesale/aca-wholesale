'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { getStockStatus } from '../app/data/products'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const stars = Array(5).fill(0)

  const stock = typeof product.stock === 'number' ? product.stock : 5
  const stockStatus = getStockStatus(stock)
  const isSoldOut = stock === 0
  const isUrgent = stock > 0 && stock <= 3
  const pricePerPiece = product.pieces ? Math.round(product.price / product.pieces) : null

  const handleAdd = (e) => {
    e.preventDefault()
    if (isSoldOut) return
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div
      className={`product-card overflow-hidden group bg-glass backdrop-blur-md border border-glass rounded-xs${isSoldOut ? ' opacity-70' : ''}`}
    >
      {/* Image zone */}
      <Link href={`/produits/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
          <div
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundColor: product.color || '#1a1a1a' }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-3 md:p-4">
                <div className="text-4xl md:text-5xl mb-2 md:mb-3">{product.emoji || '📦'}</div>
                <span className="text-[10px] md:text-xs text-gray-300 font-bold bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-sm uppercase tracking-wide">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>

          {/* ÉPUISÉ overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/65">
              <span className="font-black text-sm tracking-widest uppercase text-red-500">ÉPUISÉ</span>
            </div>
          )}

          {/* Urgency badge */}
          {isUrgent && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide bg-orange-500/90 text-white">
                🔥 Plus que {product.stock} dispo
              </span>
            </div>
          )}

          {/* Badges */}
          {product.badge && !isSoldOut && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              {product.badge}
            </span>
          )}
          {product.isNew && !isSoldOut && (
            <span className="absolute top-2 right-2 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest bg-gold-gradient">
              NEW
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4">
        <Link href={`/produits/${product.id}`}>
          {/* Stock status */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: stockStatus.color }}
            />
            <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: stockStatus.color }}>
              {stockStatus.label}
            </span>
          </div>

          <h3 className="font-black text-xs md:text-sm mb-1 text-white uppercase tracking-wide hover:text-[#E8B84B] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-400 mb-2">{product.description}</p>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-2">
            {stars.map((_, i) => (
              <span key={i} className={`text-[10px] ${i < product.rating ? 'star-filled' : 'text-white/10'}`}>★</span>
            ))}
            <span className="text-[10px] text-gray-400 ml-1">({product.reviews})</span>
          </div>

          {/* Price block */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-black text-base md:text-lg text-white">{product.price}€</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through" aria-label={`Prix original ${product.originalPrice}€`}>{product.originalPrice}€</span>
              )}
              {discount && (
                <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5">
                  -{discount}%
                </span>
              )}
            </div>
            {pricePerPiece && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">~{pricePerPiece}€/pièce</span>
                {product.vinteMin && product.vinteMax && (
                  <span className="text-[10px] text-gold-light">
                    revente {product.vinteMin}-{product.vinteMax}€
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>

        {/* Buttons */}
        <div className="flex gap-1.5">
          <Link
            href={`/produits/${product.id}`}
            className="flex-1 text-center border text-gray-300 text-xs py-2 font-bold uppercase tracking-wide rounded-sm transition-colors bg-overlay-light border-glass focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1"
          >
            Détails
          </Link>
          <button
            onClick={handleAdd}
            disabled={isSoldOut}
            className={`flex-1 text-center text-xs py-2 font-black transition-all duration-300 uppercase tracking-wide rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1${
              !isSoldOut && !added ? ' bg-gold-gradient text-black' : ''
            }`}
            style={
              isSoldOut
                ? { background: 'rgba(255,255,255,0.08)', color: '#666', cursor: 'not-allowed' }
                : added
                ? { background: '#16a34a', color: '#fff' }
                : undefined
            }
          >
            {isSoldOut ? 'Épuisé' : added ? '✓ Ajouté' : '+ Panier'}
          </button>
        </div>
      </div>
    </div>
  )
}
