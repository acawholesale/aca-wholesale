'use client'
import { useState, useCallback } from 'react'

const DEFAULT_VALUES = {
  lotPrice: '189',
  pieces: '10',
  resalePrice: '25',
}

function getRoiColor(margin) {
  if (margin === null) return { color: '#555', label: 'Entrez vos valeurs', bg: 'rgba(85,85,85,0.1)', border: 'rgba(85,85,85,0.2)' }
  if (margin < 0)   return { color: '#ef4444', label: 'Marge négative', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' }
  if (margin < 30)  return { color: '#f97316', label: 'Marge faible', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)' }
  if (margin < 80)  return { color: '#22c55e', label: 'Bonne marge', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' }
  return { color: '#C4962A', label: 'Excellente marge', bg: 'rgba(196,150,42,0.08)', border: 'rgba(196,150,42,0.35)' }
}

function RoiBar({ margin }) {
  const clamped = Math.min(Math.max(margin ?? 0, 0), 200)
  const width = (clamped / 200) * 100
  const { color } = getRoiColor(margin)
  return (
    <div
      style={{
        height: '6px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '3px',
        overflow: 'hidden',
        marginTop: '10px',
      }}
      role="progressbar"
      aria-valuenow={margin ?? 0}
      aria-valuemin={0}
      aria-valuemax={200}
      aria-label="Indicateur de marge"
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: color,
          borderRadius: '3px',
          transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease',
        }}
      />
    </div>
  )
}

export default function MarginCalculator() {
  const [values, setValues] = useState(DEFAULT_VALUES)
  const [focused, setFocused] = useState(null)

  const handleChange = useCallback((field) => (e) => {
    const raw = e.target.value.replace(',', '.')
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) {
      setValues((prev) => ({ ...prev, [field]: raw }))
    }
  }, [])

  const handleReset = () => setValues(DEFAULT_VALUES)

  const lotPrice    = parseFloat(values.lotPrice)   || 0
  const pieces      = parseInt(values.pieces, 10)   || 0
  const resalePrice = parseFloat(values.resalePrice) || 0

  const revenue = pieces * resalePrice
  const profit  = revenue - lotPrice
  const margin  = lotPrice > 0 ? (profit / lotPrice) * 100 : null

  const roiStyle = getRoiColor(margin)

  const inputStyle = (field) => ({
    width: '100%',
    padding: '13px 16px',
    background: '#0d0d0d',
    border: `1px solid ${focused === field ? '#C4962A' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(196,150,42,0.12)' : 'none',
  })

  const labelStyle = {
    display: 'block',
    color: '#888',
    fontWeight: 700,
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '8px',
  }

  const resultRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '12px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  }

  return (
    <div
      style={{
        background: '#111',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      {/* Header strip */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(196,150,42,0.12), rgba(196,150,42,0.04))',
          borderBottom: '1px solid rgba(196,150,42,0.15)',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <p style={{ color: '#C4962A', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 4px 0' }}>
            Outil gratuit
          </p>
          <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', margin: 0 }}>
            Calculateur de marge
          </h2>
        </div>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '6px',
            color: '#888',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, color 0.2s ease',
            minHeight: '36px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(196,150,42,0.4)'; e.currentTarget.style.color = '#C4962A' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#888' }}
          aria-label="Réinitialiser les valeurs"
        >
          Réinitialiser
        </button>
      </div>

      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {/* Lot price */}
          <div>
            <label htmlFor="calc-lot-price" style={labelStyle}>
              Prix du lot
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="calc-lot-price"
                type="text"
                inputMode="decimal"
                value={values.lotPrice}
                onChange={handleChange('lotPrice')}
                onFocus={() => setFocused('lotPrice')}
                onBlur={() => setFocused(null)}
                placeholder="189"
                style={inputStyle('lotPrice')}
                aria-describedby="lot-price-unit"
              />
              <span
                id="lot-price-unit"
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#C4962A',
                  fontWeight: 700,
                  fontSize: '14px',
                  pointerEvents: 'none',
                }}
              >
                €
              </span>
            </div>
          </div>

          {/* Pieces */}
          <div>
            <label htmlFor="calc-pieces" style={labelStyle}>
              Nombre de pièces
            </label>
            <input
              id="calc-pieces"
              type="text"
              inputMode="numeric"
              value={values.pieces}
              onChange={handleChange('pieces')}
              onFocus={() => setFocused('pieces')}
              onBlur={() => setFocused(null)}
              placeholder="10"
              style={inputStyle('pieces')}
            />
          </div>

          {/* Resale price */}
          <div>
            <label htmlFor="calc-resale" style={labelStyle}>
              Prix de revente moyen / pièce
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="calc-resale"
                type="text"
                inputMode="decimal"
                value={values.resalePrice}
                onChange={handleChange('resalePrice')}
                onFocus={() => setFocused('resalePrice')}
                onBlur={() => setFocused(null)}
                placeholder="25"
                style={inputStyle('resalePrice')}
                aria-describedby="resale-unit"
              />
              <span
                id="resale-unit"
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#C4962A',
                  fontWeight: 700,
                  fontSize: '14px',
                  pointerEvents: 'none',
                }}
              >
                €
              </span>
            </div>
          </div>
        </div>

        {/* Results card */}
        <div
          style={{
            background: roiStyle.bg,
            border: `1px solid ${roiStyle.border}`,
            borderRadius: '12px',
            padding: '20px 24px',
            transition: 'background 0.3s ease, border-color 0.3s ease',
          }}
          aria-live="polite"
          aria-label="Résultats du calcul"
        >
          <div style={resultRowStyle}>
            <span style={{ color: '#888', fontSize: '13px', fontWeight: 500 }}>Chiffre d&apos;affaires total</span>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>
              {revenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
          </div>

          <div style={resultRowStyle}>
            <span style={{ color: '#888', fontSize: '13px', fontWeight: 500 }}>Coût du lot</span>
            <span style={{ color: '#aaa', fontWeight: 600, fontSize: '15px' }}>
              − {lotPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
          </div>

          <div style={{ ...resultRowStyle, borderBottom: 'none', paddingBottom: '0' }}>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>Bénéfice net</span>
            <span
              style={{
                color: profit >= 0 ? '#fff' : '#ef4444',
                fontWeight: 900,
                fontSize: '22px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {profit >= 0 ? '+' : ''}
              {profit.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
          </div>

          <RoiBar margin={margin} />

          {/* ROI badge */}
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: roiStyle.color,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${roiStyle.color}`,
                  transition: 'background 0.3s ease',
                }}
              />
              <span style={{ color: roiStyle.color, fontSize: '13px', fontWeight: 700, transition: 'color 0.3s ease' }}>
                {roiStyle.label}
              </span>
            </div>
            <span
              style={{
                color: roiStyle.color,
                fontWeight: 900,
                fontSize: '20px',
                fontVariantNumeric: 'tabular-nums',
                transition: 'color 0.3s ease',
              }}
            >
              {margin !== null ? `${margin >= 0 ? '+' : ''}${margin.toFixed(1)}%` : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
