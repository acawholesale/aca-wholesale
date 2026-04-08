'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ProductMarginBar({ price, pieces, vinteMin, vinteMax }) {
  const defaultResale = vinteMax ? Math.round((vinteMin + vinteMax) / 2) : 0
  const [resalePrice, setResalePrice] = useState(defaultResale)

  if (!pieces || !price) return null

  const revenue = pieces * resalePrice
  const profit = revenue - price
  const margin = price > 0 ? Math.round((profit / price) * 100) : 0
  const barWidth = Math.min(Math.max(margin, 0), 200)

  let tierColor, tierBg, tierLabel
  if (margin < 0) {
    tierColor = '#ef4444'; tierBg = 'rgba(239,68,68,0.1)'; tierLabel = 'Marge négative'
  } else if (margin < 30) {
    tierColor = '#f97316'; tierBg = 'rgba(249,115,22,0.1)'; tierLabel = 'Marge faible'
  } else if (margin < 80) {
    tierColor = '#22c55e'; tierBg = 'rgba(34,197,94,0.1)'; tierLabel = 'Bonne marge'
  } else {
    tierColor = '#C4962A'; tierBg = 'rgba(196,150,42,0.1)'; tierLabel = 'Excellente marge'
  }

  return (
    <div className="rounded p-4 md:p-5 mb-6" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Simulateur de marge</span>
        <Link href="/calculateur" className="text-[10px] font-bold uppercase tracking-wide hover:underline" style={{ color: '#C4962A' }}>
          Calculateur complet →
        </Link>
      </div>

      {/* Resale price slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Prix de revente par pièce</span>
          <span className="text-sm font-black text-white">{resalePrice}€</span>
        </div>
        <input
          type="range"
          min={Math.max(Math.round(price / pieces / 2), 1)}
          max={vinteMax ? vinteMax * 2 : Math.round(price / pieces * 3)}
          value={resalePrice}
          onChange={e => setResalePrice(parseInt(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${tierColor} 0%, ${tierColor} ${(resalePrice / (vinteMax ? vinteMax * 2 : price / pieces * 3)) * 100}%, rgba(255,255,255,0.1) ${(resalePrice / (vinteMax ? vinteMax * 2 : price / pieces * 3)) * 100}%, rgba(255,255,255,0.1) 100%)`,
          }}
          aria-label="Prix de revente par pièce"
        />
        {vinteMin && vinteMax && (
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-600">Min estimé : {vinteMin}€</span>
            <span className="text-[10px] text-gray-600">Max estimé : {vinteMax}€</span>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="text-xs text-gray-500 mb-0.5">CA total</div>
          <div className="text-sm font-black text-white">{revenue}€</div>
        </div>
        <div className="text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="text-xs text-gray-500 mb-0.5">Bénéfice</div>
          <div className="text-sm font-black" style={{ color: profit >= 0 ? '#22c55e' : '#ef4444' }}>
            {profit >= 0 ? '+' : ''}{profit}€
          </div>
        </div>
        <div className="text-center p-2 rounded" style={{ background: tierBg }}>
          <div className="text-xs text-gray-500 mb-0.5">Marge</div>
          <div className="text-sm font-black" style={{ color: tierColor }}>
            {margin >= 0 ? '+' : ''}{margin}%
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(barWidth / 2, 100)}%`,
              background: `linear-gradient(90deg, ${tierColor}, ${tierColor}cc)`,
            }}
            role="progressbar"
            aria-valuenow={margin}
            aria-valuemin={0}
            aria-valuemax={200}
            aria-label={`Marge: ${margin}%`}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: tierColor }}>{tierLabel}</span>
          <span className="text-[10px] text-gray-600">basé sur {pieces} pièces à {resalePrice}€</span>
        </div>
      </div>
    </div>
  )
}
