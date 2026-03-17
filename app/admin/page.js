'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('accueil')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const navItems = [
    { id: 'accueil', label: 'Tableau de bord', icon: '📊' },
    { id: 'commandes', label: 'Commandes', icon: '📦' },
    { id: 'produits', label: 'Produits', icon: '👕' },
    { id: 'clients', label: 'Clients', icon: '👥' },
  ]

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0500' }}>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-60 border-r border-white/10 p-5" style={{ background: 'rgba(15,10,0,0.95)' }}>
        <div className="mb-8">
          <Image src="/logo.png" alt="ACA Wholesale" width={120} height={40} className="h-9 w-auto object-contain" />
          <div className="mt-2 text-[10px] uppercase tracking-widest font-bold px-1" style={{ color: '#C4962A' }}>
            Administration
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all text-left"
              style={activeTab === item.id
                ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }
                : { color: '#9ca3af' }
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-white transition-colors"
        >
          <span>🚪</span> Déconnexion
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/10" style={{ background: 'rgba(10,6,0,0.9)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-white font-black text-base uppercase tracking-widest">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden text-xs font-bold uppercase tracking-wide text-gray-400 hover:text-white"
          >
            Déco
          </button>
        </header>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-b border-white/10 px-4 py-3 space-y-1" style={{ background: 'rgba(15,10,0,0.98)' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMenuOpen(false) }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-left"
                style={activeTab === item.id
                  ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }
                  : { color: '#9ca3af' }
                }
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-5 md:p-8">
          {activeTab === 'accueil' && <DashboardHome />}
          {activeTab === 'commandes' && <ComingSoon label="Commandes" icon="📦" />}
          {activeTab === 'produits' && <ComingSoon label="Gestion des produits" icon="👕" />}
          {activeTab === 'clients' && <ComingSoon label="Clients" icon="👥" />}
        </main>
      </div>
    </div>
  )
}

function DashboardHome() {
  const stats = [
    { label: 'Commandes', value: '—', icon: '📦', sub: 'en attente' },
    { label: 'Produits', value: '—', icon: '👕', sub: 'en ligne' },
    { label: 'Clients', value: '—', icon: '👥', sub: 'inscrits' },
    { label: 'Chiffre du mois', value: '—', icon: '💰', sub: 'ce mois-ci' },
  ]

  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Vue d&apos;ensemble</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-xl p-5" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
            <div className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(196,150,42,0.08)', border: '1px solid rgba(196,150,42,0.2)' }}>
        <div className="text-3xl mb-3">⚙️</div>
        <p className="text-white font-black uppercase tracking-widest text-sm mb-1">Tableau de bord en construction</p>
        <p className="text-gray-500 text-xs">Les fonctionnalités seront ajoutées prochainement.</p>
      </div>
    </div>
  )
}

function ComingSoon({ label, icon }) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <p className="text-white font-black uppercase tracking-widest text-base mb-2">{label}</p>
        <p className="text-gray-500 text-sm">Cette section sera bientôt disponible.</p>
      </div>
    </div>
  )
}
