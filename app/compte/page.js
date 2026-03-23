'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function TrackingContent() {
  const searchParams = useSearchParams()
  const refParam = searchParams.get('ref') || ''

  const [ref, setRef] = useState(refParam)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (refParam) doSearch(refParam)
  }, [refParam])

  const doSearch = async (searchRef) => {
    const val = (searchRef || ref).trim()
    if (!val) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/gls/track?id=' + encodeURIComponent(val))
      const data = await res.json()
      if (data.error && !data.trackID) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (e) {
      setError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    DELIVERED: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#4ade80', icon: '✅' },
    IN_TRANSIT: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', text: '#60a5fa', icon: '🚚' },
    OUT_FOR_DELIVERY: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#fbbf24', icon: '📦' },
    EXCEPTION: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', text: '#f87171', icon: '⚠️' },
    CREATED: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#a78bfa', icon: '🏷️' },
    PICKED_UP: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.35)', text: '#22d3ee', icon: '📬' },
    AT_PARCELSHOP: { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', text: '#fb923c', icon: '🏪' },
  }
  const sc = result ? (statusColors[result.status] || { bg: 'rgba(107,114,128,0.12)', border: 'rgba(107,114,128,0.3)', text: '#9ca3af', icon: '📋' }) : null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)', fontFamily: "'Inter', sans-serif", padding: '24px 16px' }}>

      {/* Header */}
      <div style={{ maxWidth: 640, margin: '0 auto 32px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #C4962A, #E8B84B)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000', fontSize: 14 }}>A</div>
          <span style={{ color: '#C4962A', fontWeight: 800, fontSize: 18, letterSpacing: '0.05em' }}>ACA WHOLESALE</span>
        </a>
        <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.02em' }}>Suivi de colis</h1>
        <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>Entrez votre numéro de commande (ex&nbsp;: ACA-2026-001) ou votre numéro de suivi GLS.</p>
      </div>

      {/* Search box */}
      <div style={{ maxWidth: 640, margin: '0 auto 28px' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={ref}
            onChange={e => setRef(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="ACA-2026-001 ou N° GLS"
            style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 16px', color: '#fff', fontSize: 15, outline: 'none' }}
          />
          <button
            onClick={() => doSearch()}
            disabled={loading || !ref.trim()}
            style={{ background: (loading || !ref.trim()) ? 'rgba(196,150,42,0.35)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', border: 'none', borderRadius: 12, padding: '13px 22px', color: '#000', fontWeight: 800, fontSize: 14, cursor: (loading || !ref.trim()) ? 'default' : 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
            {loading ? '⏳' : '🔍 Rechercher'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ maxWidth: 640, margin: '0 auto 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 12, padding: '14px 18px', color: '#f87171', fontSize: 14 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {result && sc && (
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Status card */}
          <div style={{ background: sc.bg, border: '1.5px solid ' + sc.border, borderRadius: 16, padding: '22px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 32, lineHeight: 1 }}>{sc.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: sc.text, fontWeight: 900, fontSize: 19 }}>{result.statusLabel || result.status}</div>
                {result.lastUpdate && <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 3 }}>Mis à jour le {result.lastUpdate}</div>}
                {result.lastLocation && <div style={{ color: '#9ca3af', fontSize: 12 }}>📍 {result.lastLocation}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <div style={{ color: '#4b5563', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>N° de suivi GLS</div>
                <div style={{ color: '#e5e7eb', fontWeight: 800, fontSize: 17, marginTop: 2, letterSpacing: '0.02em' }}>{result.trackID}</div>
              </div>
              {result.trackingUrl && (
                <a href={result.trackingUrl} target="_blank" rel="noopener noreferrer"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 14px', color: '#d1d5db', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
                  Voir sur GLS.fr →
                </a>
              )}
            </div>
          </div>

          {/* Event history */}
          {result.history && result.history.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px', marginBottom: 16 }}>
              <div style={{ color: '#9ca3af', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Historique du colis</div>
              {result.history.map((event, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 12, paddingBottom: idx < result.history.length - 1 ? 14 : 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16, flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: idx === 0 ? sc.text : '#374151', border: '2px solid ' + (idx === 0 ? sc.text : '#4b5563'), marginTop: 3 }}></div>
                    {idx < result.history.length - 1 && <div style={{ width: 2, flex: 1, background: 'rgba(255,255,255,0.06)', minHeight: 14, marginTop: 2 }}></div>}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 2 }}>
                    <div style={{ color: '#d1d5db', fontWeight: 600, fontSize: 13 }}>{event.description}</div>
                    {event.location && <div style={{ color: '#6b7280', fontSize: 12, marginTop: 1 }}>📍 {event.location}</div>}
                    <div style={{ color: '#374151', fontSize: 11, marginTop: 2 }}>{event.date}{event.time ? ' · ' + event.time : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fallback when no history */}
          {result.error && (
            <div style={{ background: 'rgba(107,114,128,0.06)', border: '1px solid rgba(107,114,128,0.15)', borderRadius: 12, padding: '14px 18px', color: '#6b7280', fontSize: 13, textAlign: 'center' }}>
              Le suivi détaillé n&apos;est pas encore disponible.{' '}
              {result.trackingUrl && <a href={result.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#C4962A', textDecoration: 'none', fontWeight: 700 }}>Voir sur GLS.fr →</a>}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ maxWidth: 640, margin: '48px auto 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, color: '#374151', fontSize: 12 }}>
        Questions ? <a href="mailto:contact@aca-wholesale.fr" style={{ color: '#C4962A', textDecoration: 'none', fontWeight: 600 }}>contact@aca-wholesale.fr</a>
      </div>
    </div>
  )
}

export default function ComptePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#C4962A', fontSize: 16, fontWeight: 700 }}>⏳ Chargement...</span>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  )
}
