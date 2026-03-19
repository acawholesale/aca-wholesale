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

  if (loading || !session) {
    return (
      <main style={{ background: '#080808', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>Chargement...</div>
        </div>
      </main>
    )
  }

  const tabs = [
    { id: 'dashboard', label: '📊 Tableau de bord' },
    { id: 'orders', label: '📦 Mes commandes' },
    { id: 'profile', label: '👤 Mon profil' },
  ]

  return (
    <main style={{ background: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Header */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '36px 0 28px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '8px', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900, color: '#000', flexShrink: 0 }}>
                {(session.prenom || session.email).charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#C4962A', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Mon espace revendeur</p>
                <h1 style={{ fontSize: 'clamp(18px, 4vw, 28px)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  Bonjour, {session.prenom || session.email.split('@')[0]} 👋
                </h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 18px', color: '#9ca3af', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.borderColor = '#ef4444'; e.target.style.color = '#ef4444' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.color = '#9ca3af' }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '10px 16px', fontSize: '13px', fontWeight: 700, borderRadius: '4px 4px 0 0',
                color: activeTab === tab.id ? '#fff' : '#6b7280',
                borderBottom: activeTab === tab.id ? '2px solid #C4962A' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '28px 0 60px' }}>
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Commandes', value: mockOrders.length, emoji: '📦', color: '#C4962A' },
                  { label: 'Total investi', value: `${mockOrders.reduce((s, o) => s + o.total, 0)}€`, emoji: '💰', color: '#22c55e' },
                  { label: 'Lots achetés', value: mockOrders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0), emoji: '🛍️', color: '#E8B84B' },
                  { label: 'Statut', value: 'Revendeur', emoji: '⭐', color: '#a78bfa' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.emoji}</div>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: stat.color, marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Actions rapides</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
                {[
                  { href: '/produits', label: 'Voir les lots', emoji: '🛍️' },
                  { href: '/panier', label: 'Mon devis', emoji: '📋' },
                  { href: '/contact', label: 'Nous contacter', emoji: '💬' },
                  { href: '/faq', label: 'Aide & FAQ', emoji: '❓' },
                ].map(action => (
                  <Link
                    key={action.href}
                    href={action.href}
                    style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,150,42,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                  >
                    <span style={{ fontSize: '20px' }}>{action.emoji}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{action.label}</span>
                  </Link>
                ))}
              </div>

              <h2 style={{ fontSize: '14px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Commandes récentes</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {mockOrders.map(order => {
                  const sc = statusColor[order.status] || statusColor['En attente']
                  return (
                    <div key={order.id} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{order.id}</p>
                        <p style={{ fontSize: '12px', color: '#6b7280' }}>{order.date} · {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>{order.total}€</span>
                        <span style={{ fontSize: '11px', fontWeight: 900, color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: '4px', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{order.status}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '20px' }}>Historique des commandes</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mockOrders.map(order => {
                  const sc = statusColor[order.status] || statusColor['En attente']
                  return (
                    <div key={order.id} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 900, color: '#fff', marginBottom: '2px' }}>{order.id}</p>
                          <p style={{ fontSize: '12px', color: '#6b7280' }}>Passée le {order.date}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: '4px', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{order.status}</span>
                          <span style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>{order.total}€</span>
                        </div>
                      </div>
                      <div style={{ padding: '16px 20px' }}>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#9ca3af' }}>
                            <span>{item.name} ×{item.qty}</span>
                            <span style={{ fontWeight: 700, color: '#fff' }}>{item.price * item.qty}€</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div style={{ maxWidth: '500px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginBottom: '20px' }}>Informations du compte</h2>
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '24px' }}>
                {[
                  { label: 'Prénom', value: session.prenom || '—' },
                  { label: 'Nom', value: session.nom || '—' },
                  { label: 'Email', value: session.email },
                  { label: 'Statut', value: 'Revendeur actif' },
                ].map(field => (
                  <div key={field.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{field.label}</span>
                    <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{field.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000', padding: '12px 20px', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '6px', textDecoration: 'none' }}>
                  Modifier mes infos →
                </Link>
                <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '12px 20px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '6px', cursor: 'pointer' }}>
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
