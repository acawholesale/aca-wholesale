'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'

const statusColor = {
  'Payé':       { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)' },
  'Expédié':    { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)' },
  'Livré':      { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)'  },
  'En cours':   { color: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)' },
  'En attente': { color: '#C4962A', bg: 'rgba(196,150,42,0.1)',  border: 'rgba(196,150,42,0.25)' },
  'À expédier': { color: '#C4962A', bg: 'rgba(196,150,42,0.1)',  border: 'rgba(196,150,42,0.25)' },
}
const getStatusColor = s => statusColor[s] || { color: '#9ca3af', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.25)' }

const trackStatusLabel = {
  DELIVERED:        { label: 'Livré',              icon: '✅', color: '#22c55e' },
  IN_TRANSIT:       { label: 'En transit',          icon: '🚚', color: '#3b82f6' },
  OUT_FOR_DELIVERY: { label: 'En cours de livraison', icon: '📦', color: '#f59e0b' },
  EXCEPTION:        { label: 'Incident',            icon: '⚠️', color: '#ef4444' },
  CREATED:          { label: 'Étiquette créée',      icon: '🏷️', color: '#a78bfa' },
  PICKED_UP:        { label: 'Pris en charge',       icon: '📬', color: '#22d3ee' },
}

export default function Compte() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [activeTab, setActiveTab]       = useState('dashboard')
  const [loading, setLoading]           = useState(true)
  const [orders, setOrders]             = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const router = useRouter()

  // --- Tracking state ---
  const [selectedOrder, setSelectedOrder] = useState(null)

  const [trackRef, setTrackRef]         = useState('')
  const [trackLoading, setTrackLoading] = useState(false)
  const [trackResult, setTrackResult]   = useState(null)
  const [trackError, setTrackError]     = useState('')

  // Build session from Supabase user
  const session = user ? {
    email: user.email,
    prenom: user.user_metadata?.prenom || '',
    nom: user.user_metadata?.nom || user.email?.split('@')[0] || '',
  } : null

  // Auth check
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.push('/login'); return }
    setLoading(false)
  }, [user, authLoading, router])

  // Fetch real orders when session is ready
  useEffect(() => {
    if (!session?.email) return
    setOrdersLoading(true)
    fetch('/api/orders/customer?email=' + encodeURIComponent(session.email))
      .then(r => r.json())
      .then(data => { setOrders(data.orders || []) })
      .catch(err => console.error('Orders fetch error:', err))
      .finally(() => setOrdersLoading(false))
  }, [session?.email])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  // GLS tracking by order ID (looks up GLS number from DB) or direct GLS number
  const handleTrack = async (e) => {
    if (e) e.preventDefault()
    if (!trackRef.trim()) return
    setTrackLoading(true)
    setTrackError('')
    setTrackResult(null)
    try {
      const ref = trackRef.trim()
      let glsId = ref

      // If it's an ACA order ID, look up the GLS tracking number first
      if (ref.startsWith('ACA-')) {
        const lookupRes = await fetch('/api/orders/customer?orderId=' + encodeURIComponent(ref))
        const lookupData = await lookupRes.json()
        const order = (lookupData.orders || [])[0]
        if (!order) { setTrackError('Commande introuvable.'); setTrackLoading(false); return }
        if (!order.glsTrackId) {
          setTrackError('Votre commande est en cours de préparation. Le suivi sera disponible une fois le colis expédié.')
          setTrackLoading(false)
          return
        }
        glsId = order.glsTrackId
      }

      const res = await fetch('/api/gls/track?parcelNumber=' + encodeURIComponent(glsId))
      const data = await res.json()
      if (data.error) setTrackError(data.error)
      else setTrackResult(data)
    } catch (err) {
      setTrackError('Erreur de connexion au service de suivi.')
    }
    setTrackLoading(false)
  }

  const trackFromOrder = (order) => {
    setActiveTab('tracking')
    setTrackRef(order.glsTrackId || order.id)
    setTrackResult(null)
    setTrackError('')
  }

  if (loading) {
    return (
      <main style={{ background: '#080808', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Navbar />
        <div style={{ color: '#6b7280' }}>Chargement...</div>
        <Footer />
      </main>
    )
  }

  const tabs = [
    { id: 'dashboard', label: '🏠 Tableau de bord' },
    { id: 'orders',    label: '📦 Mes commandes' },
    { id: 'tracking',  label: '🔍 Suivi de colis' },
    { id: 'profile',   label: '👤 Mon profil' },
  ]

  const tsl = trackResult ? (trackStatusLabel[trackResult.status] || { label: trackResult.status, icon: '📍', color: '#9ca3af' }) : null

  return (
    <main style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '36px 0 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, margin: 0 }}>
              Bonjour, {session?.nom || 'Client'} 👋
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0' }}>Espace revendeur ACA Wholesale</p>
          </div>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
            Déconnexion
          </button>
        </div>
      </section>

      {user && !user.email_confirmed_at && (
        <div style={{ background: 'rgba(251,191,36,0.1)', borderBottom: '1px solid rgba(251,191,36,0.3)', padding: '12px 24px', textAlign: 'center' }}>
          <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 600 }}>Veuillez vérifier votre adresse email. Vérifiez vos spams si vous ne trouvez pas l&#39;email.</span>
        </div>
      )}

      {/* Tabs */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ background: activeTab === t.id ? 'rgba(196,150,42,0.15)' : 'none', border: 'none', borderBottom: activeTab === t.id ? '2px solid #C4962A' : '2px solid transparent', color: activeTab === t.id ? '#C4962A' : '#6b7280', padding: '14px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', scrollSnapAlign: 'start', flexShrink: 0 }}>
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* ── DASHBOARD ── */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Commandes totales',    value: orders.length,                                                       icon: '📦' },
                { label: 'À expédier / Expédiées', value: orders.filter(o => o.status === 'À expédier' || o.status === 'Expédié').length, icon: '🚚' },
                { label: 'Livrées',              value: orders.filter(o => o.status === 'Livré').length,                     icon: '✅' },
                { label: 'Total dépensé',        value: orders.reduce((s,o) => s + (o.total||0), 0).toFixed(0) + ' €',     icon: '💶' },
              ].map(card => (
                <div key={card.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                  <div style={{ color: '#C4962A', fontSize: 28, fontWeight: 900 }}>{ordersLoading ? '…' : card.value}</div>
                  <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>{card.label}</div>
                </div>
              ))}
            </div>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: 16 }}>Commandes récentes</h3>
            {ordersLoading ? (
              <div style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>Chargement des commandes…</div>
            ) : orders.length === 0 ? (
              <div style={{ color: '#6b7280', textAlign: 'center', padding: 40 }}>Aucune commande pour le moment.<br/><Link href="/produits" style={{ color: '#C4962A' }}>Voir le catalogue →</Link></div>
            ) : orders.slice(0,3).map(o => (
              <div key={o.id} onClick={() => setSelectedOrder(o)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '16px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,150,42,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                <div>
                  <span style={{ color: '#C4962A', fontWeight: 700, fontSize: 14 }}>{o.id}</span>
                  <span style={{ color: '#6b7280', fontSize: 13, marginLeft: 12 }}>{o.date}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ ...getStatusColor(o.status), padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: getStatusColor(o.status).bg, border: '1px solid ' + getStatusColor(o.status).border }}>{o.status}</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{(o.total||0).toFixed(2)} €</span>
                  {o.glsTrackId && (
                    <button onClick={(e) => { e.stopPropagation(); trackFromOrder(o) }} style={{ background: '#C4962A', color: '#000', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 700 }}>Suivre</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MES COMMANDES ── */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: 24 }}>Mes commandes</h2>
            {ordersLoading ? (
              <div style={{ color: '#6b7280', textAlign: 'center', padding: 60 }}>Chargement…</div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                <p style={{ color: '#6b7280' }}>Aucune commande trouvée.</p>
                <Link href="/produits" style={{ color: '#C4962A', fontWeight: 700 }}>Voir le catalogue →</Link>
              </div>
            ) : orders.map(o => (
              <div key={o.id} onClick={() => setSelectedOrder(o)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px', marginBottom: 16, cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,150,42,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                  <div>
                    <span style={{ color: '#C4962A', fontWeight: 800, fontSize: 16 }}>{o.id}</span>
                    <span style={{ color: '#6b7280', fontSize: 13, marginLeft: 12 }}>{o.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ background: getStatusColor(o.status).bg, color: getStatusColor(o.status).color, border: '1px solid ' + getStatusColor(o.status).border, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{o.status}</span>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>{(o.total||0).toFixed(2)} €</span>
                  </div>
                </div>
                <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 12 }}>{o.itemsSummary || 'Articles non détaillés'}</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {o.glsTrackId ? (
                    <button onClick={(e) => { e.stopPropagation(); trackFromOrder(o) }} style={{ background: '#C4962A', color: '#000', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>
                      Suivre le colis (GLS: {o.glsTrackId})
                    </button>
                  ) : (
                    <span style={{ color: '#6b7280', fontSize: 13, fontStyle: 'italic' }}>Expédition en préparation</span>
                  )}
                  <a href={'/api/orders/invoice?id=' + o.id + '&email=' + encodeURIComponent(session?.email || '')} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>
                    Facture
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SUIVI DE COLIS ── */}
        {activeTab === 'tracking' && (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: 8 }}>Suivi de colis</h2>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
              Entrez votre numéro de commande <strong style={{ color: '#C4962A' }}>(ACA-XXXX-XXXXX)</strong> ou votre numéro de suivi GLS directement.
            </p>
            <form onSubmit={handleTrack} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <input
                value={trackRef}
                onChange={e => setTrackRef(e.target.value)}
                placeholder="ACA-2026-XXXXX ou numéro GLS"
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none' }}
              />
              <button type="submit" disabled={trackLoading || !trackRef.trim()} style={{ background: '#C4962A', color: '#000', border: 'none', borderRadius: 10, padding: '12px 20px', fontWeight: 800, cursor: 'pointer', fontSize: 14 }}>
                {trackLoading ? '…' : 'Suivre'}
              </button>
            </form>

            {/* Quick links from orders */}
            {orders.filter(o => o.glsTrackId).length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ color: '#6b7280', fontSize: 12, marginBottom: 10 }}>Accès rapide :</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {orders.filter(o => o.glsTrackId).map(o => (
                    <button key={o.id} onClick={() => { setTrackRef(o.glsTrackId); setTrackResult(null); setTrackError('') }}
                      style={{ background: 'rgba(196,150,42,0.1)', border: '1px solid rgba(196,150,42,0.3)', color: '#C4962A', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                      {o.id}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {trackError && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '14px 18px', color: '#f87171', fontSize: 14, marginBottom: 16 }}>
                ⚠️ {trackError}
              </div>
            )}

            {trackResult && tsl && (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 32 }}>{tsl.icon}</span>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>{tsl.label}</div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>Colis {trackResult.parcelNumber}</div>
                  </div>
                </div>
                {trackResult.events && trackResult.events.length > 0 && (
                  <div>
                    <h4 style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Historique</h4>
                    {trackResult.events.slice(0, 6).map((ev, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14, borderBottom: i < Math.min(trackResult.events.length,6)-1 ? '1px solid rgba(255,255,255,0.06)' : 'none', marginBottom: i < Math.min(trackResult.events.length,6)-1 ? 14 : 0 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? tsl.color : '#374151', marginTop: 5, flexShrink: 0 }} />
                        <div>
                          <div style={{ color: i === 0 ? '#fff' : '#9ca3af', fontSize: 13, fontWeight: i === 0 ? 700 : 400 }}>{ev.description || ev.status}</div>
                          <div style={{ color: '#6b7280', fontSize: 12, marginTop: 2 }}>{ev.location || ''} · {ev.date || ''}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── PROFIL ── */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: 500 }}>
            <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: 24 }}>Mon profil</h2>
            {[
              { label: 'Nom',   value: session?.nom   || '-' },
              { label: 'Email', value: session?.email || '-' },
              { label: 'Rôle',  value: 'Revendeur'           },
            ].map(f => (
              <div key={f.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 20px', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontSize: 14 }}>{f.label}</span>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{f.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── ORDER DETAIL MODAL ── */}
      {selectedOrder && (
        <div onClick={() => setSelectedOrder(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', padding: '28px 32px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 900, margin: 0 }}>{selectedOrder.id}</h2>
                <p style={{ color: '#6b7280', fontSize: 13, margin: '4px 0 0' }}>{selectedOrder.date}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ background: getStatusColor(selectedOrder.status).bg, color: getStatusColor(selectedOrder.status).color, border: '1px solid ' + getStatusColor(selectedOrder.status).border, padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{selectedOrder.status}</span>
                <button onClick={() => setSelectedOrder(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#9ca3af', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ×
                </button>
              </div>
            </div>

            {/* Items */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: '#9ca3af', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Articles</h3>
              {selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < selectedOrder.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{item.name || item.nom || 'Article'}</div>
                    {(item.size || item.taille) && <span style={{ color: '#6b7280', fontSize: 12 }}>Taille: {item.size || item.taille}</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{((item.price || item.prix || 0) * (item.quantity || item.quantite || 1)).toFixed(2)} €</div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>{item.quantity || item.quantite || 1} × {(item.price || item.prix || 0).toFixed(2)} €</div>
                  </div>
                </div>
              )) : (
                <p style={{ color: '#6b7280', fontSize: 13 }}>{selectedOrder.itemsSummary || 'Détails non disponibles'}</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>Total</span>
                <span style={{ color: '#C4962A', fontSize: 16, fontWeight: 900 }}>{(selectedOrder.total || 0).toFixed(2)} €</span>
              </div>
            </div>

            {/* Delivery address */}
            {selectedOrder.adresse && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ color: '#9ca3af', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Adresse de livraison</h3>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{selectedOrder.client}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>{selectedOrder.adresse}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13 }}>{selectedOrder.codePostal} {selectedOrder.ville}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13 }}>{selectedOrder.pays}</div>
                </div>
              </div>
            )}

            {/* Tracking */}
            {selectedOrder.glsTrackId && (
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ color: '#9ca3af', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Suivi GLS</h3>
                <div style={{ background: 'rgba(196,150,42,0.08)', border: '1px solid rgba(196,150,42,0.2)', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#C4962A', fontSize: 14, fontWeight: 700 }}>{selectedOrder.glsTrackId}</span>
                  <button onClick={() => { setSelectedOrder(null); trackFromOrder(selectedOrder) }} style={{ background: '#C4962A', color: '#000', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontWeight: 700 }}>
                    Suivre
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href={'/api/orders/invoice?id=' + selectedOrder.id + '&email=' + encodeURIComponent(session?.email || '')} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 16px', fontSize: 14, cursor: 'pointer', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                Facture
              </a>
              <button onClick={() => setSelectedOrder(null)} style={{ flex: 1, background: 'none', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
