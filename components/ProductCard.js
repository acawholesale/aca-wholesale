'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const stars = Array(5).fill(0)

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="product-card bg-[#111] overflow-hidden group">
      <Link href={`/produits/${product.id}`}>
        <div className="relative aspect-square bg-[#1a1a1a] overflow-hidden">
          <div
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundColor: product.color || '#1a1a1a' }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-3 md:p-4">
                <div className="text-4xl md:text-5xl mb-2 md:mb-3">{product.emoji || '📦'}</div>
                <span className="text-[10px] text-gray-300 font-black bg-black/60 px-2 py-0.5 uppercase tracking-widest">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>
          {product.badge && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-2 right-2 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
              NEW
            </span>
          )}
        </div>
      </Link>

      <div className="p-3 md:p-4">
        <Link href={`/produits/${product.id}`}>
          <h3 className="font-black text-xs md:text-sm mb-1 text-white uppercase tracking-wide hover:text-[#E8B84B] transition-colors line-clamp-2">{product.name}</h3>
          <p className="text-[10px] text-gray-500 mb-2">{product.description}</p>
          <div className="flex items-center gap-0.5 mb-2">
            {stars.map((_, i) => (
              <span key={i} className={`text-[10px] ${i < product.rating ? 'star-filled' : 'text-white/10'}`}>★</span>
            ))}
            <span className="text-[10px] text-gray-600 ml-1">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="font-black text-base md:text-lg text-white">{product.price}€</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-600 line-through">{product.originalPrice}€</span>
            )}
            {discount && (
              <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5">-{discount}%</span>
            )}
          </div>
        </Link>
        <div className="flex gap-1.5">
          <Link
            href={`/produits/${product.id}`}
            className="flex-1 text-center bg-black border border-white/10 text-gray-400 text-xs py-2 font-black hover:border-white/30 transition-colors uppercase tracking-wide"
          >
            Détails
          </Link>
          <button
            onClick={handleAdd}
            className={`flex-1 text-center text-xs py-2 font-black transition-all uppercase tracking-wide ${added ? 'bg-green-600 text-white' : 'text-black'}`}
            style={added ? {} : { background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
          >
            {added ? '✓ Ajouté' : '+ Panier'}
          </button>
        </div>
      </div>
    </div>
  )
}
