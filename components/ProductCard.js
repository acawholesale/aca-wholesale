'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const stars = Array(5).fill(0)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="product-card bg-white overflow-hidden group">
      <Link href={`/produits/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-[20px]">
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" style={{ backgroundColor: product.color || '#e5e7eb' }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-3 md:p-4">
                <div className="text-4xl md:text-5xl mb-2 md:mb-3">{product.emoji || '📦'}</div>
                <span className="text-[10px] md:text-xs text-gray-600 font-semibold bg-white/80 px-2 py-0.5 rounded-full">{product.brand}</span>
              </div>
            </div>
          </div>
          {product.badge && <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">{product.badge}</span>}
          {product.isNew && <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-blue-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full">NEW</span>}
        </div>
      </Link>
      <div className="p-3 md:p-4">
        <Link href={`/produits/${product.id}`}>
          <h3 className="font-bold text-xs md:text-sm mb-0.5 md:mb-1 line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2">{product.description}</p>
          <div className="flex items-center gap-0.5 md:gap-1 mb-2">
            {stars.map((_, i) => <span key={i} className={`text-[10px] md:text-xs ${i < product.rating ? 'star-filled' : 'text-gray-300'}`}>★</span>)}
            <span className="text-[10px] md:text-xs text-gray-400 ml-1">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 mb-2.5 md:mb-3">
            <span className="font-black text-base md:text-lg">{product.price}€</span>
            {product.originalPrice && <span className="text-xs md:text-sm text-gray-400 line-through">{product.originalPrice}€</span>}
            {discount && <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">-{discount}%</span>}
          </div>
        </Link>
        <div className="flex gap-1.5">
          <Link href={`/produits/${product.id}`} className="flex-1 text-center bg-gray-100 text-gray-800 text-xs py-2 font-semibold hover:bg-gray-200 transition-colors rounded-full">Détails</Link>
          <button onClick={handleAdd} className={`flex-1 text-center text-xs py-2 font-bold transition-all duration-300 rounded-full ${added ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-blue-600'}`}>
            {added ? '✓ Ajouté !' : '+ Panier'}
          </button>
        </div>
      </div>
    </div>
  )
}
