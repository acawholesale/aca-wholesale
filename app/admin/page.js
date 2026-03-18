'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

const EXPEDITEUR = {
  nom: 'ACA Wholesale',
  adresse: '12 Rue du Commerce',
  codePostal: '57000',
  ville: 'Metz',
  pays: 'France',
  tel: '+33 6 00 00 00 00',
}

const mockOrders = [
  { id: 'CMD-001', date: '2024-01-15', client: 'Sophie Martin', email: 'sophie@email.com', adresse: '5 rue des Lilas, 75001 Paris', articles: [{ nom: "Veste Vintage Levi's", taille: 'M', qty: 1, prix: 45 }], total: 45, statut: 'à expédier' },
  { id: 'CMD-002', date: '2024-01-15', client: 'Lucas Bernard', email: 'lucas@email.com', adresse: '12 av Victor Hugo, 69001 Lyon', articles: [{ nom: "Jean 501 Levi's", taille: '32', qty: 2, prix: 35 }], total: 70, statut: 'à expédier' },
  { id: 'CMD-003', date: '2024-01-14', client: 'Emma Dubois', email: 'emma@email.com', adresse: '8 bd Gambetta, 13001 Marseille', articles: [{ nom: 'Hoodie Champion', taille: 'L', qty: 1, prix: 38 }], total: 38, statut: 'expédié' },
  { id: 'CMD-004', date: '2024-01-13', client: 'Noah Petit', email: 'noah@email.com', adresse: '3 rue Nationale, 59000 Lille', articles: [{ nom: 'T-shirt Vintage', taille: 'S', qty: 3, prix: 20 }], total: 60, statut: 'livré' },
  { id: 'CMD-005', date: '2024-01-12', client: 'Chloé Leroy', email: 'chloe@email.com', adresse: '17 rue Alsace, 67000 Strasbourg', articles: [{ nom: 'Bomber MA-1', taille: 'M', qty: 1, prix: 65 }], total: 65, statut: 'expédié' },
]

const mockClients = [
  { id: 1, nom: 'Sophie Martin', email: 'sophie@email.com', commandes: 5, total: 320, segment: 'VIP', dateInscription: '2023-06-12' },
  { id: 2, nom: 'Lucas Bernard', email: 'lucas@email.com', commandes: 3, total: 180, segment: 'Actif', dateInscription: '2023-09-04' },
  { id: 3, nom: 'Emma Dubois', email: 'emma@email.com', commandes: 1, total: 38, segment: 'Nouveau', dateInscription: '2024-01-14' },
  { id: 4, nom: 'Noah Petit', email: 'noah@email.com', commandes: 4, total: 240, segment: 'Actif', dateInscription: '2023-07-22' },
  { id: 5, nom: 'Chloé Leroy', email: 'chloe@email.com', commandes: 7, total: 510, segment: 'VIP', dateInscription: '2023-03-18' },
]

function buildBordereauHTML(order) {
  const articles = order.articles.map(a =>
    `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${a.nom}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">${a.taille}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">${a.qty}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${a.prix}€</td></tr>`
  ).join('')
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;border:2px solid #C4962A;border-radius:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:15px;border-bottom:2px solid #C4962A">
        <div><h1 style="margin:0;font-size:22px;color:#C4962A">ACA WHOLESALE</h1><p style="margin:2px 0;color:#666;font-size:12px">BORDEREAU D'ENVOI</p></div>
        <div style="text-align:right"><p style="margin:0;font-weight:bold;font-size:16px">${order.id}</p><p style="margin:2px 0;color:#666;font-size:12px">${order.date}</p></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:20px">
        <div style="flex:1">
          <h3 style="margin:0 0 8px;font-size:12px;color:#666;text-transform:uppercase">Expéditeur</h3>
          <p style="margin:0;font-weight:bold">${EXPEDITEUR.nom}</p>
          <p style="margin:2px 0;font-size:13px">${EXPEDITEUR.adresse}</p>
          <p style="margin:2px 0;font-size:13px">${EXPEDITEUR.codePostal} ${EXPEDITEUR.ville}</p>
          <p style="margin:2px 0;font-size:13px">${EXPEDITEUR.tel}</p>
        </div>
        <div style="flex:1;text-align:right">
          <h3 style="margin:0 0 8px;font-size:12px;color:#666;text-transform:uppercase">Destinataire</h3>
          <p style="margin:0;font-weight:bold">${order.client}</p>
          <p style="margin:2px 0;font-size:13px">${order.adresse}</p>
          <p style="margin:2px 0;font-size:13px">${order.email}</p>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:15px">
        <thead><tr style="background:#f5f5f5"><th style="padding:8px 10px;text-align:left;font-size:12px">Article</th><th style="padding:8px 10px;text-align:center;font-size:12px">Taille</th><th style="padding:8px 10px;text-align:center;font-size:12px">Qté</th><th style="padding:8px 10px;text-align:right;font-size:12px">Prix</th></tr></thead>
        <tbody>${articles}</tbody>
      </table>
      <div style="text-align:right;padding-top:10px;border-top:2px solid #C4962A">
        <p style="margin:0;font-size:18px;font-weight:bold;color:#C4962A">Total : ${order.total}€</p>
      </div>
      <div style="margin-top:20px;padding:10px;background:#f9f9f9;border-radius:4px;text-align:center">
        <p style="margin:0;font-size:11px;color:#999">Merci pour votre commande • ACA Wholesale • ${EXPEDITEUR.ville}, ${EXPEDITEUR.pays}</p>
      </div>
    </div>`
}

function printMultiple(orders) {
  const html = `<!DOCTYPE html><html><head><title>Bordereaux</title><style>body{margin:0;padding:20px;background:#fff} .bordereau{margin-bottom:40px;page-break-after:always} @media print{body{padding:0} .bordereau{margin:0;page-break-after:always}}</style></head><body>${orders.map(o => `<div class="bordereau">${buildBordereauHTML(o)}</div>`).join('')}<script>window.onload=function(){window.print()}<\/script></body></html>`
  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close() }
}

function PremiumLock() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-center p-10 rounded-2xl border border-yellow-600/30" style={{background:'rgba(196,150,42,0.07)'}}>
        <div className="text-5xl mb-5">🔒</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">Fonctionnalité Premium</h2>
        <p className="text-gray-300 text-lg mb-2">Passez au plan supérieur pour</p>
        <p className="text-gray-300 text-lg mb-6">bénéficier de cette fonctionnalité.</p>
        <button className="px-8 py-3 rounded-full font-bold text-black text-base" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>
          Mettre à niveau
        </button>
      </div>
    </div>
  )
}

function DashboardHome() {
  const aExpedier = mockOrders.filter(o => o.statut === 'à expédier').length
  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Tableau de bord</h2>
      {aExpedier > 0 && (
        <div className="mb-6 p-4 rounded-xl border border-yellow-500/50 flex items-center gap-3" style={{background:'rgba(196,150,42,0.1)'}}>
          <span className="text-2xl">⚠️</span>
          <p className="text-yellow-300 font-medium">{aExpedier} commande{aExpedier > 1 ? 's' : ''} en attente d&apos;expédition</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Commandes totales', value: mockOrders.length, icon: '📦', color: '#C4962A' },
          { label: 'À expédier', value: aExpedier, icon: '🚚', color: '#e85555' },
          { label: 'Chiffre du mois', value: `${mockOrders.reduce((s,o)=>s+o.total,0)}€`, icon: '💰', color: '#55c455' },
          { label: 'Clients', value: mockClients.length, icon: '👥', color: '#5599e8' },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl border border-white/10" style={{background:'rgba(255,255,255,0.05)'}}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-sm text-gray-400">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold" style={{color:stat.color}}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommandesTab() {
  const [filtre, setFiltre] = useState('tous')
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [selected, setSelected] = useState([])
  const [detail, setDetail] = useState(null)

  const filtered = mockOrders.filter(o => {
    if (filtre !== 'tous' && o.statut !== filtre) return false
    if (dateDebut && o.date < dateDebut) return false
    if (dateFin && o.date > dateFin) return false
    return true
  })

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(o => o.id))
  const selectedOrders = mockOrders.filter(o => selected.includes(o.id))

  if (detail) {
    return (
      <div>
        <button onClick={() => setDetail(null)} className="mb-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300">← Retour aux commandes</button>
        <div className="p-6 rounded-xl border border-white/10" style={{background:'rgba(255,255,255,0.05)'}}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-yellow-400">{detail.id}</h2>
              <p className="text-gray-400">{detail.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${detail.statut === 'à expédier' ? 'bg-red-500/20 text-red-400' : detail.statut === 'expédié' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{detail.statut}</span>
          </div>
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-2 uppercase">Client</h3>
            <p className="font-medium">{detail.client}</p>
            <p className="text-gray-400 text-sm">{detail.email}</p>
            <p className="text-gray-400 text-sm">{detail.adresse}</p>
          </div>
          <table className="w-full mb-4">
            <thead><tr className="border-b border-white/10"><th className="text-left py-2 text-gray-400 text-sm">Article</th><th className="text-center py-2 text-gray-400 text-sm">Taille</th><th className="text-center py-2 text-gray-400 text-sm">Qté</th><th className="text-right py-2 text-gray-400 text-sm">Prix</th></tr></thead>
            <tbody>{detail.articles.map((a, i) => <tr key={i} className="border-b border-white/5"><td className="py-2">{a.nom}</td><td className="py-2 text-center">{a.taille}</td><td className="py-2 text-center">{a.qty}</td><td className="py-2 text-right">{a.prix}€</td></tr>)}</tbody>
          </table>
          <div className="text-right text-xl font-bold text-yellow-400">Total : {detail.total}€</div>
          <button onClick={() => printMultiple([detail])} className="mt-4 px-6 py-2 rounded-lg font-bold text-black" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>🖨️ Imprimer le bordereau</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">Commandes</h2>
        <button onClick={() => printMultiple(filtered)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black text-sm" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>
          🖨️ Imprimer tous les bordereaux ({filtered.length})
        </button>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        {['tous','à expédier','expédié','livré'].map(s => (
          <button key={s} onClick={() => setFiltre(s)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filtre === s ? 'text-black border-yellow-500' : 'text-gray-300 border-white/20 hover:border-yellow-500/50'}`} style={filtre === s ? {background:'linear-gradient(135deg,#C4962A,#E8B84B)'} : {}}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
        ))}
      </div>
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm text-white border border-white/20" style={{background:'rgba(255,255,255,0.07)'}} />
        <span className="text-gray-400">→</span>
        <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} className="px-3 py-1.5 rounded-lg text-sm text-white border border-white/20" style={{background:'rgba(255,255,255,0.07)'}} />
        {selected.length > 0 && (
          <button onClick={() => printMultiple(selectedOrders)} className="ml-auto px-5 py-1.5 rounded-lg font-bold text-black text-sm" style={{background:'linear-gradient(135deg,#C4962A,#E8B84B)'}}>
            🖨️ Imprimer la sélection ({selected.length})
          </button>
        )}
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full">
          <thead>
            <tr style={{background:'rgba(255,255,255,0.07)'}}>
              <th className="p-3 text-left"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
              <th className="p-3 text-left text-gray-400 text-sm">Commande</th>
              <th className="p-3 text-left text-gray-400 text-sm">Date</th>
              <th className="p-3 text-left text-gray-400 text-sm">Client</th>
              <th className="p-3 text-left text-gray-400 text-sm">Total</th>
              <th className="p-3 text-left text-gray-400 text-sm">Statut</th>
              <th className="p-3 text-left text-gray-400 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3"><input type="checkbox" checked={selected.includes(order.id)} onChange={() => toggleSelect(order.id)} /></td>
                <td className="p-3 font-mono text-yellow-400 text-sm">{order.id}</td>
                <td className="p-3 text-gray-300 text-sm">{order.date}</td>
                <td className="p-3 text-sm">{order.client}</td>
                <td className="p-3 font-medium">{order.total}€</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.statut === 'à expédier' ? 'bg-red-500/20 text-red-400' : order.statut === 'expédié' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>{order.statut}</span></td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => setDetail(order)} className="px-3 py-1 rounded text-xs border border-white/20 hover:border-yellow-500/50 transition-colors">Voir</button>
                  <button onClick={() => printMultiple([order])} className="px-3 py-1 rounded text-xs border border-white/20 hover:border-yellow-500/50 transition-colors">🖨️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ClientsTab() {
  const [segmentFiltre, setSegmentFiltre] = useState('tous')
  const filteredClients = mockClients.filter(c => segmentFiltre === 'tous' || c.segment === segmentFiltre)
  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Clients</h2>
      <div className="flex gap-2 mb-4 flex-wrap">
        {['tous','VIP','Actif','Nouveau'].map(s => (
          <button key={s} onClick={() => setSegmentFiltre(s)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${segmentFiltre === s ? 'text-black border-yellow-500' : 'text-gray-300 border-white/20'}`} style={segmentFiltre === s ? {background:'linear-gradient(135deg,#C4962A,#E8B84B)'} : {}}>{s}</button>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden border border-white/10">
        <table className="w-full">
          <thead>
            <tr style={{background:'rgba(255,255,255,0.07)'}}>
              <th className="p-3 text-left text-gray-400 text-sm">Client</th>
              <th className="p-3 text-left text-gray-400 text-sm">Email</th>
              <th className="p-3 text-left text-gray-400 text-sm">Commandes</th>
              <th className="p-3 text-left text-gray-400 text-sm">Total dépensé</th>
              <th className="p-3 text-left text-gray-400 text-sm">Segment</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(c => (
              <tr key={c.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-3 font-medium">{c.nom}</td>
                <td className="p-3 text-gray-400 text-sm">{c.email}</td>
                <td className="p-3 text-center">{c.commandes}</td>
                <td className="p-3 text-yellow-400 font-medium">{c.total}€</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.segment === 'VIP' ? 'bg-yellow-500/20 text-yellow-400' : c.segment === 'Actif' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>{c.segment}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'commandes', label: 'Commandes', icon: '📦' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'campagne', label: 'Campagne', icon: '📧' },
    { id: 'articles', label: 'Articles', icon: '🏷️' },
  ]

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen flex" style={{background:'#0a0500'}}>
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex flex-col border-r border-white/10`} style={{background:'rgba(255,255,255,0.03)'}}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && <span className="font-bold text-yellow-400 text-lg">ACA Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1">{sidebarOpen ? '◀' : '▶'}</button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${activeTab === item.id ? 'text-black font-medium' : 'text-gray-300 hover:text-white hover:bg-white/5'}`} style={activeTab === item.id ? {background:'linear-gradient(135deg,#C4962A,#E8B84B)'} : {}}>
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
            <span className="text-lg flex-shrink-0">🚪</span>
            {sidebarOpen && <span className="text-sm">Déconnexion</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardHome />}
        {activeTab === 'commandes' && <CommandesTab />}
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'campagne' && <PremiumLock />}
        {activeTab === 'articles' && <PremiumLock />}
      </main>
    </div>
  )
}
