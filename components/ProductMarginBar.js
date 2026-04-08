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
  const sliderMax = vinteMax ? vinteMax * 2 : Math.round(price / pieces * 3)
  const sliderMin = Math.max(Math.round(price / pieces / 2), 1)
  const sliderPercent = ((resalePrice - sliderMin) / (sliderMax - sliderMin)) * 100

  let tierColor, tierLabel
  if (margin < 0) {
    tierColor = '#ef4444'; tierLabel = 'Marge négative'
  } else if (margin < 30) {
    tierColor = '#f97316'; tierLabel = 'Marge faible'
  } else if (margin < 80) {
    tierColor = '#22c55e'; tierLabel = 'Bonne marge'
  } else {
    tierColor = '#C4962A'; tierLabel = 'Excellente marge'
  }

  return (
    <div className="rounded p-4 md:p-5 mb-6" style={{ background: 'rgba(196,150,42,0.08)', border: '1px solid rgba(196,150,42,0.25)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-black uppercase tracking-widest text-white">Simulateur de marge</span>
        <Link href="/calculateur" className="text-[10px] font-bold uppercase tracking-wide hover:underline" style={{ color: '#C4962A' }}>
          Calculateur complet →
        </Link>
      </div>

      {/* Resale price slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Prix de revente par pièce</span>
          <span className="text-base font-black text-white">{resalePrice}€</span>
        </div>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={resalePrice}
          onChange={e => setResalePrice(parseInt(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${tierColor} 0%, ${tierColor} ${sliderPercent}%, rgba(255,255,255,0.08) ${sliderPercent}%, rgba(255,255,255,0.08) 100%)`,
          }}
          aria-label="Prix de revente par pièce"
        />
        {vinteMin && vinteMax && (
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-gray-500">Min estimé : {vinteMin}€</span>
            <span className="text-[10px] text-gray-500">Max estimé : {vinteMax}€</span>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">CA total</div>
          <div className="text-lg font-black text-white">{revenue}€</div>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">Bénéfice</div>
          <div className="text-lg font-black" style={{ color: profit >= 0 ? '#22c55e' : '#ef4444' }}>
            {profit >= 0 ? '+' : ''}{profit}€
          </div>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wide">Marge</div>
          <div className="text-lg font-black" style={{ color: tierColor }}>
            {margin >= 0 ? '+' : ''}{margin}%
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(barWidth / 2, 100)}%`,
              background: tierColor,
            }}
            role="progressbar"
            aria-valuenow={margin}
            aria-valuemin={0}
            aria-valuemax={200}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: tierColor }}>{tierLabel}</span>
          <span className="text-[10px] text-gray-500">basé sur {pieces} pièces à {resalePrice}€</span>
        </div>
      </div>
    </div>
  )
}
