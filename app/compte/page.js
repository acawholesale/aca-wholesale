'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const mockOrders = [
  { id: 'ACA-2026-001', date: '12 Mar 2026', status: 'Livré', items: [{ name: 'Lot Premium Nike / Adidas', qty: 1, price: 189 }], total: 189 },
  { id: 'ACA-2026-002', date: '28 Fév 2026', status: 'En cours', items: [{ name: 'Lot Streetwear Mix', qty: 2, price: 349 }], total: 698 },
]

const statusColor = {
  'Livré': { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
  'En cours': { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
  'En attente': { color: '#C4962A', bg: 'rgba(196,150,42,0.1)', border: 'rgba(196,150,42,0.2)' },
}

export default function Compte() {
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // --- Tracking state ---
  const [trackRef, setTrackRef] = useState('')
  const [trackLoading, setTrackLoading] = useState(false)
  const [trackResult, setTrackResult] = useState(null)
  const [trackError, setTrackError] = useState('')

  useEffect(() => {
    try {
      const s = localStorage.getItem('aca_session')
      if (!s) { router.push('/login'); return }
      setSession(JSON.parse(s))
    } catch { router.push('/login') }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('aca_session')
    router.push('/')
  }

  const doTrack = async () => {
    const val = trackRef.trim()
    if (!val) return
    setTrackLoading(true)
    setTrackError('')
    setTrackResult(null)
    try {
      const res = await fetch('/api/gls/track?id=' + encodeURIComponent(val))
      const data = await res.json()
      if (data.error && !data.trackID) setTrackError(data.error)
      else setTrackResult(data)
    } catch (e) { setTrackError('Erreur de connexion. Veuillez réessayer.') }
    finally { setTrackLoading(false) }
  }

  if (loading || !session) {
    return (
      <main style={{ background: '#080808', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <div style={{ color: '#C4962A', fontSize: '24px' }}>⏳</div>
        </div>
      </main>
    )
  }

  const tabs = [
    { id: 'dashboard', label: '📊 Tableau de bord' },
    { id: 'orders', label: '📦 Mes commandes' },
    { id: 'tracking', label: '🚚 Suivi de colis' },
    { id: 'profile', label: '👤 Mon profil' },
  ]

  const trackStatusColors = {
    DELIVERED: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#4ade80', icon: '✅' },
    IN_TRANSIT: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', text: '#60a5fa', icon: '🚚' },
    OUT_FOR_DELIVERY: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#fbbf24', icon: '📦' },
    EXCEPTION: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', text: '#f87171', icon: '⚠️' },
    CREATED: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', text: '#a78bfa', icon: '🏷️' },
    PICKED_UP: { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.35)', text: '#22d3ee', icon: '📬' },
  }
  const tsc = trackResult ? (trackStatusColors[trackResult.status] || { bg: 'rgba(107,114,128,0.12)', border: 'rgba(107,114,128,0.3)', text: '#9ca3af', icon: '📋' }) : null

  return (
    <main style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '36px 0 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
              Bonjour, {session?.nom || 'Client'} 👋
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0' }}>Espace revendeur ACA Wholesale</p>
          </div>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '10px 18px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '8px', cursor: 'pointer' }}>
            Déconnexion
          </button>
        </div>
      </section>

      {/* Tabs navigation */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none', border: 'none', padding: '16px 18px',
                color: activeTab === tab.id ? '#C4962A' : '#6b7280',
                fontWeight: activeTab === tab.id ? 800 : 500,
                fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
                borderBottom: activeTab === tab.id ? '2px solid #C4962A' : '2px solid transparent',
                letterSpacing: '0.02em',
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 0 60px' }}>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, padding: '0 24px', marginBottom: 32 }}>
              {[
                { label: 'Commandes totales', value: mockOrders.length, icon: '📦' },
                { label: 'Commandes livrées', value: mockOrders.filter(o => o.status === 'Livré').length, icon: '✅' },
                { label: 'En cours', value: mockOrders.filter(o => o.status === 'En cours').length, icon: '🚚' },
                { label: 'Total dépensé', value: mockOrders.reduce((s, o) => s + o.total, 0) + ' €', icon: '💰' },
              ].map((stat, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 22px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ color: '#C4962A', fontWeight: 900, fontSize: 26 }}>{stat.value}</div>
                  <div style={{ color: '#6b7280', fontSize: 12, fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '0 24px' }}>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Dernières commandes</h3>
              {mockOrders.slice(0, 3).map(order => {
                const sc = statusColor[order.status] || statusColor['En attente']
                return (
                  <div key={order.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '16px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{order.id}</div>
                      <div style={{ color: '#6b7280', fontSize: 12, marginTop: 2 }}>{order.date} · {order.total} €</div>
                    </div>
                    <span style={{ background: sc.bg, border: '1px solid ' + sc.border, color: sc.color, padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{order.status}</span>
                  </div>
                )
              })}
              <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', padding: '10px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}>
                Voir toutes les commandes →
              </button>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div style={{ padding: '0 24px' }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 20, marginBottom: 20 }}>Mes commandes</h2>
            {mockOrders.map(order => {
              const sc = statusColor[order.status] || statusColor['En attente']
              return (
                <div key={order.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '20px 24px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{order.id}</div>
                      <div style={{ color: '#6b7280', fontSize: 13, marginTop: 3 }}>Passée le {order.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ background: sc.bg, border: '1px solid ' + sc.border, color: sc.color, padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>{order.status}</span>
                      <button onClick={() => { setTrackRef(order.id); setActiveTab('tracking') }}
                        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa', padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                        🔍 Suivre
                      </button>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: 13, marginBottom: 4 }}>
                        <span>{item.name} × {item.qty}</span>
                        <span style={{ color: '#d1d5db', fontWeight: 600 }}>{item.price} €</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: 800, fontSize: 14, marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span>Total</span>
                      <span style={{ color: '#C4962A' }}>{order.total} €</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Suivi de colis */}
        {activeTab === 'tracking' && (
          <div style={{ padding: '0 24px' }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 20, marginBottom: 8 }}>🚚 Suivi de colis</h2>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
              Entrez votre numéro de commande (ex&nbsp;: ACA-2026-001) ou votre numéro de suivi GLS.
            </p>

            {/* Search */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, maxWidth: 540 }}>
              <input
                value={trackRef}
                onChange={e => setTrackRef(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doTrack()}
                placeholder="ACA-2026-001 ou N° de suivi GLS"
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 14px', color: '#fff', fontSize: 14, outline: 'none' }}
              />
              <button onClick={doTrack} disabled={trackLoading || !trackRef.trim()}
                style={{ background: (trackLoading || !trackRef.trim()) ? 'rgba(196,150,42,0.3)' : 'linear-gradient(135deg, #C4962A, #E8B84B)', border: 'none', borderRadius: 10, padding: '12px 20px', color: '#000', fontWeight: 800, fontSize: 13, cursor: (trackLoading || !trackRef.trim()) ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                {trackLoading ? '⏳' : '🔍 Rechercher'}
              </button>
            </div>

            {/* Shortcut buttons for own orders */}
            {mockOrders.length > 0 && !trackResult && !trackLoading && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: '#4b5563', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Mes commandes récentes :</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {mockOrders.map(o => (
                    <button key={o.id} onClick={() => { setTrackRef(o.id); setTimeout(doTrack, 0) }}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                      {o.id}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {trackError && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 16px', color: '#f87171', fontSize: 13, marginBottom: 16 }}>
                ⚠️ {trackError}
              </div>
            )}

            {/* Result */}
            {trackResult && tsc && (
              <div style={{ maxWidth: 600 }}>
                <div style={{ background: tsc.bg, border: '1.5px solid ' + tsc.border, borderRadius: 14, padding: '20px', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                    <span style={{ fontSize: 30 }}>{tsc.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: tsc.text, fontWeight: 900, fontSize: 18 }}>{trackResult.statusLabel || trackResult.status}</div>
                      {trackResult.lastUpdate && <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 2 }}>Mis à jour le {trackResult.lastUpdate}</div>}
                      {trackResult.lastLocation && <div style={{ color: '#9ca3af', fontSize: 12 }}>📍 {trackResult.lastLocation}</div>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <div style={{ color: '#4b5563', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>N° de suivi GLS</div>
                      <div style={{ color: '#e5e7eb', fontWeight: 800, fontSize: 16, marginTop: 2 }}>{trackResult.trackID}</div>
                    </div>
                    {trackResult.trackingUrl && (
                      <a href={trackResult.trackingUrl} target="_blank" rel="noopener noreferrer"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '7px 12px', color: '#d1d5db', textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>
                        Voir sur GLS.fr →
                      </a>
                    )}
                  </div>
                </div>
                {trackResult.history && trackResult.history.length > 0 && (
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '18px 20px' }}>
                    <div style={{ color: '#6b7280', fontWeight: 800, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Historique</div>
                    {trackResult.history.map((event, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 12, paddingBottom: idx < trackResult.history.length - 1 ? 12 : 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14, flexShrink: 0 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: idx === 0 ? tsc.text : '#374151', border: '2px solid ' + (idx === 0 ? tsc.text : '#4b5563'), marginTop: 3 }}></div>
                          {idx < trackResult.history.length - 1 && <div style={{ width: 2, flex: 1, background: 'rgba(255,255,255,0.05)', minHeight: 12, marginTop: 2 }}></div>}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#d1d5db', fontWeight: 600, fontSize: 13 }}>{event.description}</div>
                          {event.location && <div style={{ color: '#6b7280', fontSize: 12, marginTop: 1 }}>📍 {event.location}</div>}
                          <div style={{ color: '#374151', fontSize: 11, marginTop: 2 }}>{event.date}{event.time ? ' · ' + event.time : ''}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div style={{ padding: '0 24px', maxWidth: 500 }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 20, marginBottom: 24 }}>Mon profil</h2>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 22, color: '#000' }}>
                  {(session?.nom || 'C')[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>{session?.nom || '—'}</div>
                  <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>{session?.email || '—'}</div>
                </div>
              </div>
              {[
                { label: 'Nom', value: session?.nom },
                { label: 'Email', value: session?.email },
                { label: 'Statut', value: 'Revendeur actif' },
              ].map((field, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ color: '#6b7280', fontSize: 13 }}>{field.label}</span>
                  <span style={{ color: '#e5e7eb', fontWeight: 600, fontSize: 13 }}>{field.value || '—'}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', padding: '12px 20px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '6px', textDecoration: 'none' }}>
                  Modifier mes infos →
                </Link>
                <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '12px 20px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '6px', cursor: 'pointer' }}>
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  )
}
