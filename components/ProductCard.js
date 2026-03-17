'use client'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { getStockStatus } from '../app/data/products'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const stars = Array(5).fill(0)
  const stockStatus = getStockStatus(product.stock ?? 99)
  const pricePerPiece = product.pieces ? Math.round(product.price / product.pieces) : null
  const isSoldOut = product.stock === 0

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
    <div className={`product-card overflow-hidden group relative ${isSoldOut ? 'opacity-75' : ''}`} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>

      {/* Image zone */}
      <Link href={`/produits/${product.id}`}>
        <div className="relative aspect-square overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundColor: isSoldOut ? '#1a1a1a' : (product.color || '#1a1a1a') }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-3 md:p-4">
                <div className={`text-4xl md:text-5xl mb-2 md:mb-3 ${isSoldOut ? 'grayscale opacity-40' : ''}`}>{product.emoji || '📦'}</div>
                <span className="text-[10px] md:text-xs text-gray-300 font-bold bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-sm uppercase tracking-wide">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>

          {/* SOLD OUT overlay */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <span className="text-white font-black text-sm uppercase tracking-widest border border-white/40 px-4 py-2">ÉPUISÉ</span>
            </div>
          )}

          {/* Badges top-left */}
          {product.badge && !isSoldOut && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
              {product.badge}
            </span>
          )}

          {/* NEW badge top-right */}
          {product.isNew && !isSoldOut && (
            <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>
              NEW
            </span>
          )}

          {/* Urgence stock */}
          {!isSoldOut && product.stock <= 3 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              <span className="text-[10px] font-black px-2 py-0.5 uppercase tracking-wide rounded-sm" style={{ background: 'rgba(249,115,22,0.9)', color: '#fff' }}>
                ⚡ Plus que {product.stock} disponible{product.stock > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 md:p-4">
        <Link href={`/produits/${product.id}`}>
          {/* Stock status dot */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1
