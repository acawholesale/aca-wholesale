'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const EXPEDITEUR = {
  nom: 'ACA Wholesale', adresse: '— Votre adresse —', codePostal: '57000',
  ville: 'Moselle', pays: 'France', tel: '— Votre téléphone —', email: 'contact@aca-wholesale.com',
}

const mockOrders = [
  { id: 'ACA-2026-001', date: '2026-03-18', dateAff: 'Mar 18/03/2026', status: 'À expédier', client: { nom: 'Karim Benali', adresse: '45 Rue des Lilas', codePostal: '69001', ville: 'Lyon', pays: 'France', tel: '06 23 45 67 89', email: 'karim.b@email.com' }, produits: [{ nom: 'Lot Sweats & Hoodies Premium', qte: 1, prix: 89 }], poids: '5', dimensions: '50x40x25', valeur: '89', livraison: 'Standard' },
  { id: 'ACA-2026-002', date: '2026-03-18', dateAff: 'Mar 18/03/2026', status: 'À expédier', client: { nom: 'Sarah Martin', adresse: '12 Avenue Victor Hugo', codePostal: '13001', ville: 'Marseille', pays: 'France', tel: '07 34 56 78 90', email: 'sarah.m@email.com' }, produits: [{ nom: 'Lot T-Shirts Nike & Adidas', qte: 2, prix: 65 }, { nom: 'Lot Jeans Premium', qte: 1, prix: 79 }], poids: '10', dimensions: '60x45x30', valeur: '209', livraison: 'Express' },
  { id: 'ACA-2026-003', date: '2026-03-19', dateAff: 'Mer 19/03/2026', status: 'À expédier', client: { nom: 'Thomas Leroy', adresse: '8 Rue du Commerce', codePostal: '33000', ville: 'Bordeaux', pays: 'France', tel: '06 45 67 89 01', email: 'thomas.l@email.com' }, produits: [{ nom: 'Lot Doudounes The North Face', qte: 1, prix: 129 }], poids: '7', dimensions: '55x40x30', valeur: '129', livraison: 'Standard' },
  { id: 'ACA-2026-004', date: '2026-03-19', dateAff: 'Mer 19/03/2026', status: 'Expédié', client: { nom: 'Laura Petit', adresse: '3 Rue de la République', codePostal: '67000', ville: 'Strasbourg', pays: 'France', tel: '06 56 78 90 12', email: 'laura.p@email.com' }, produits: [{ nom: 'Lot Luxury Ralph Lauren', qte: 1, prix: 159 }], poids: '4', dimensions: '45x35x20', valeur: '159', livraison: 'Express' },
  { id: 'ACA-2026-005', date: '2026-03-20', dateAff: 'Jeu 20/03/2026', status: 'À expédier', client: { nom: 'Marc Dupont', adresse: '22 Boulevard Gambetta', codePostal: '59000', ville: 'Lille', pays: 'France', tel: '07 67 89 01 23', email: 'marc.d@email.com' }, produits: [{ nom: 'Lot Sportswear Nike', qte: 2, prix: 75 }], poids: '8', dimensions: '55x40x28', valeur: '150', livraison: 'Standard' },
]

const mockClients = [
  { id: 1, nom: 'Karim Benali', email: 'karim.b@email.com', statut: 'VIP', commandes: 5, ville: 'Lyon', dateInscription: '10/01/2026' },
  { id: 2, nom: 'Sarah Martin', email: 'sarah.m@email.com', statut: 'Actif', commandes: 3, ville: 'Marseille', dateInscription: '15/01/2026' },
  { id: 3, nom: 'Thomas Leroy', email: 'thomas.l@email.com', statut: 'Nouveau', commandes: 1, ville: 'Bordeaux', dateInscription: '01/02/2026' },
  { id: 4, nom: 'Laura Petit', email: 'laura.p@email.com', statut: 'VIP', commandes: 8, ville: 'Strasbourg', dateInscription: '05/12/2025' },
  { id: 5, nom: 'Marc Dupont', email: 'marc.d@email.com', statut: 'Actif', commandes: 2, ville: 'Lille', dateInscription: '20/02/2026' },
  { id: 6, nom: 'Julie Bernard', email: 'julie.b@email.com', statut: 'Nouveau', commandes: 1, ville: 'Nantes', dateInscription: '10/03/2026' },
  { id: 7, nom: 'Alex Moreau', email: 'alex.m@email.com', statut: 'Actif', commandes: 4, ville: 'Paris', dateInscription: '08/01/2026' },
]

const buildBordereauHTML = (order) => {
  const produitsList = order.produits.map(p => `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">${p.nom}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center;">${p.qte}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">${p.prix * p.qte} €</td></tr>`).join('')
  const total = order.produits.reduce((s, p) => s + p.prix * p.qte, 0)
  const barcode = order.id.replace(/-/g, '')
  return `<div class="page"><div class="header"><div class="logo-block"><h1>AC<span>A</span> WHOLESALE</h1><p>Grossiste vêtements seconde main • Moselle, France</p><p>${EXPEDITEUR.tel} • ${EXPEDITEUR.email}</p></div><div class="ref-block"><div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;">Bordereau d'envoi</div><div class="num">${order.id}</div><div class="date">Date : ${order.dateAff}</div><div class="badge badge-${order.livraison === 'Express' ? 'express' : 'standard'}">${order.livraison}</div></div></div><div class="addresses"><div class="address-box"><h3>📤 Expéditeur</h3><div class="name">${EXPEDITEUR.nom}</div><p>${EXPEDITEUR.adresse}<br>${EXPEDITEUR.codePostal} ${EXPEDITEUR.ville}<br>${EXPEDITEUR.pays}<br>${EXPEDITEUR.tel}</p></div><div class="address-box dest"><h3>📬 Destinataire</h3><div class="name">${order.client.nom}</div><p>${order.client.adresse}<br>${order.client.codePostal} ${order.client.ville}<br>${order.client.pays}<br>${order.client.tel}<br>${order.client.email}</p></div></div><div class="section"><h3>📦 Produits commandés</h3><table><thead><tr><th>Désignation</th><th>Qté</th><th>Prix</th></tr></thead><tbody>${produitsList}</tbody><tfoot><tr class="total-row"><td colspan="2">Total commande</td><td>${total} €</td></tr></tfoot></table></div><div class="section"><h3>📏 Informations colis</h3><div class="colis-grid"><div class="colis-item"><div class="val">${order.poids} kg</div><div class="lbl">Poids</div></div><div class="colis-item"><div class="val">${order.dimensions}</div><div class="lbl">Dimensions (cm)</div></div><div class="colis-item"><div class="val">${order.valeur} €</div><div class="lbl">Valeur déclarée</div></div><div class="colis-item"><div class="val">1</div><div class="lbl">Nb colis</div></div></div><p style="margin-top:10px;font-size:10px;color:#666;">Contenu : Vêtements de seconde main</p></div><div class="barcode-section"><div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Code de suivi</div><span class="barcode">${barcode}</span><div class="barcode-num">${order.id}</div></div><div class="footer">ACA Wholesale • Moselle, France • contact@aca-wholesale.com<br>Document généré automatiquement — À coller sur le colis</div></div>`
}

const CSS_PRINT = `* { margin:0; padding:0; box-sizing:border-box; } body { font-family: Arial, sans-serif; font-size: 12px; color: #000; background: #fff; } .page { width:210mm; min-height:297mm; margin:0 auto; padding:15mm; page-break-after:always; } .page:last-child { page-break-after:avoid; } .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid #C4962A; padding-bottom:12px; margin-bottom:16px; } .logo-block h1 { font-size:24px; font-weight:900; color:#000; letter-spacing:-1px; } .logo-block span { color:#C4962A; } .logo-block p { font-size:10px; color:#666; margin-top:2px; } .ref-block { text-align:right; } .ref-block .num { font-size:18px; font-weight:900; color:#C4962A; } .ref-block .date { font-size:10px; color:#666; } .badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-top:4px; } .badge-express { background:#fff3cd; color:#856404; } .badge-standard { background:#e8f5e9; color:#2e7d32; } .addresses { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; } .address-box { border:1px solid #ddd; border-radius:8px; padding:12px; } .address-box.dest { border:2px solid #C4962A; } .address-box h3 { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:#999; margin-bottom:8px; } .address-box .name { font-size:14px; font-weight:700; margin-bottom:4px; } .address-box p { font-size:11px; color:#333; line-height:1.6; } .section { border:1px solid #ddd; border-radius:8px; padding:12px; margin-bottom:12px; } .section h3 { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:#999; margin-bottom:10px; } table { width:100%; border-collapse:collapse; } th { background:#f5f5f5; padding:6px 8px; text-align:left; font-size:10px; text-transform:uppercase; } th:nth-child(2) { text-align:center; } th:nth-child(3) { text-align:right; } .total-row td { padding:8px; font-weight:700; font-size:13px; border-top:2px solid #C4962A; } .total-row td:last-child { text-align:right; color:#C4962A; } .colis-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; } .colis-item { text-align:center; } .colis-item .val { font-size:16px; font-weight:900; } .colis-item .lbl { font-size:9px; color:#999; text-transform:uppercase; } .barcode-section { text-align:center; padding:16px; border:1px solid #ddd; border-radius:8px; } .barcode { font-family:'Libre Barcode 128',monospace; font-size:48px; letter-spacing:4px; display:block; margin:8px 0; } .barcode-num { font-size:13px; font-weight:700; letter-spacing:3px; color:#333; } .footer { margin-top:20px; padding-top:12px; border-top:1px solid #eee; text-align:center; font-size:9px; color:#999; } @media print { body { print-color-adjust:exact; -webkit-print-color-adjust:exact; } }`

const printMultiple = (orders) => {
  const body = orders.map(buildBordereauHTML).join('')
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Bordereaux ACA Wholesale</title><link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet"><style>${CSS_PRINT}</style></head><body>${body}<script>window.onload=function(){window.print()}<\/script></body></html>`
  const win = window.open('', '_blank', 'width=900,height=700')
  win.document.write(html)
  win.document.close()
}

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
    { id: 'clients', label: 'Clients', icon: '👥' },
  ]

  return (
    <div className="min-h-screen flex" style={{ background: '#0a0500' }}>
      <aside className="hidden md:flex flex-col w-60 border-r border-white/10 p-5" style={{ background: 'rgba(15,10,0,0.95)' }}>
        <div className="mb-8">
          <Image src="/logo.png" alt="ACA Wholesale" width={120} height={40} className="h-9 w-auto object-contain" />
          <div className="mt-2 text-[10px] uppercase tracking-widest font-bold px-1" style={{ color: '#C4962A' }}>Administration</div>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all text-left" style={activeTab === item.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { color: '#9ca3af' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-white transition-colors">
          <span>🚪</span> Déconnexion
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/10" style={{ background: 'rgba(10,6,0,0.9)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-white font-black text-base uppercase tracking-widest">{navItems.find(n => n.id === activeTab)?.label}</h1>
          </div>
          <button onClick={handleLogout} className="md:hidden text-xs font-bold uppercase tracking-wide text-gray-400 hover:text-white">Déco</button>
        </header>

        {menuOpen && (
          <div className="md:hidden border-b border-white/10 px-4 py-3 space-y-1" style={{ background: 'rgba(15,10,0,0.98)' }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setMenuOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-left" style={activeTab === item.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { color: '#9ca3af' }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        )}

        <main className="flex-1 p-5 md:p-8">
          {activeTab === 'accueil' && <DashboardHome setActiveTab={setActiveTab} />}
          {activeTab === 'commandes' && <CommandesTab />}
          {activeTab === 'clients' && <ClientsTab />}
        </main>
      </div>
    </div>
  )
}

function DashboardHome({ setActiveTab }) {
  const aExpedier = mockOrders.filter(o => o.status === 'À expédier').length
  const expedie = mockOrders.filter(o => o.status === 'Expédié').length
  const stats = [
    { label: 'Total commandes', value: mockOrders.length, icon: '📦', sub: 'au total', tab: 'commandes' },
    { label: 'À expédier', value: aExpedier, icon: '🚚', sub: 'en attente', tab: 'commandes' },
    { label: 'Clients', value: mockClients.length, icon: '👥', sub: 'inscrits', tab: 'clients' },
    { label: 'Chiffre total', value: mockOrders.reduce((s, o) => s + o.produits.reduce((ss, p) => ss + p.prix * p.qte, 0), 0) + ' €', icon: '💰', sub: 'ce mois', tab: 'commandes' },
  ]
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Vue d&apos;ensemble</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {stats.map(stat => (
          <button key={stat.label} onClick={() => setActiveTab(stat.tab)} className="rounded-xl p-5 text-left transition-all hover:border-[#C4962A]/30" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
            <div className="text-[10px] text-gray-600 mt-0.5">{stat.sub}</div>
          </button>
        ))}
      </div>
      {aExpedier > 0 && (
        <div className="rounded-xl p-5 flex items-center justify-between" style={{ background: 'rgba(196,150,42,0.1)', border: '1px solid rgba(196,150,42,0.3)' }}>
          <div>
            <p className="text-white font-black uppercase tracking-wide text-sm">🚚 {aExpedier} commande{aExpedier > 1 ? 's' : ''} à expédier</p>
            <p className="text-gray-400 text-xs mt-1">Générez les bordereaux d&apos;envoi</p>
          </div>
          <button onClick={() => setActiveTab('commandes')} className="text-black text-xs px-4 py-2 font-black uppercase tracking-wide rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>Voir →</button>
        </div>
      )}
    </div>
  )
}

function ClientsTab() {
  const [vue, setVue] = useState('liste')
  const [filtre, setFiltre] = useState('Tous')
  const [checked, setChecked] = useState([])
  const [sujet, setSujet] = useState('')
  const [contenu, setContenu] = useState('')
  const [envoi, setEnvoi] = useState(null)
  const [loading, setLoading] = useState(false)
  const [historique, setHistorique] = useState([])

  const filtres = ['Tous', 'VIP', 'Actif', 'Nouveau']
  const filtered = filtre === 'Tous' ? mockClients : mockClients.filter(c => c.statut === filtre)
  const toggleCheck = (id) => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleAll = () => setChecked(checked.length === filtered.length ? [] : filtered.map(c => c.id))
  const selectedClients = mockClients.filter(c => checked.includes(c.id))

  const statutStyle = (s) => {
    if (s === 'VIP') return { background: 'rgba(196,150,42,0.15)', color: '#E8B84B', border: '1px solid rgba(196,150,42,0.3)' }
    if (s === 'Actif') return { background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
    return { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }
  }

  const envoyerCampagne = async () => {
    if (!sujet.trim() || !contenu.trim()) return
    setLoading(true)
    setEnvoi(null)
    try {
      const res = await fetch('/api/admin/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinataires: selectedClients, sujet, contenu }),
      })
      const data = await res.json()
      setEnvoi(data)
      if (data.success) {
        setHistorique(prev => [{
          id: Date.now(), date: new Date().toLocaleDateString('fr-FR'),
          heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          sujet, destinataires: selectedClients.length, succes: data.succes, echecs: data.echecs,
        }, ...prev])
        setSujet('')
        setContenu('')
        setChecked([])
      }
    } catch {
      setEnvoi({ error: 'Erreur réseau' })
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Tabs internes */}
      <div className="flex gap-2 mb-6">
        {[{ id: 'liste', label: '👥 Clients', count: mockClients.length }, { id: 'campagne', label: '✉️ Campagne', count: null }, { id: 'historique', label: '📋 Historique', count: historique.length }].map(t => (
          <button key={t.id} onClick={() => setVue(t.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all" style={vue === t.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
            {t.label}{t.count !== null && <span className="px-1.5 py-0.5 rounded-full text-[10px]" style={vue === t.id ? { background: 'rgba(0,0,0,0.2)' } : { background: 'rgba(196,150,42,0.2)', color: '#E8B84B' }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {/* LISTE */}
      {vue === 'liste' && (
        <div>
          {checked.length > 0 && (
            <div className="rounded-xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3" style={{ background: 'rgba(196,150,42,0.12)', border: '2px solid rgba(196,150,42,0.4)' }}>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-wide">✉️ {checked.length} client{checked.length > 1 ? 's' : ''} sélectionné{checked.length > 1 ? 's' : ''}</p>
                <p className="text-gray-400 text-xs mt-0.5">Prêts pour une campagne email</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setChecked([])} className="text-gray-400 hover:text-white text-xs font-bold px-3 py-2 rounded border border-white/10">Annuler</button>
                <button onClick={() => setVue('campagne')} className="text-black text-sm px-5 py-2 font-black uppercase tracking-wide rounded-lg" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
                  ✉️ Créer une campagne
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-4 flex-wrap">
            {filtres.map(f => (
              <button key={f} onClick={() => setFiltre(f)} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all" style={filtre === f ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
                {f} {filtre === f && `(${filtered.length})`}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={checked.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="w-4 h-4 accent-yellow-500" />
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Tout sélectionner ({filtered.length})</span>
            </label>
            {checked.length > 0 && <span className="text-xs font-bold" style={{ color: '#C4962A' }}>{checked.length} sélectionné{checked.length > 1 ? 's' : ''}</span>}
          </div>

          <div className="space-y-2">
            {filtered.map(client => {
              const isChecked = checked.includes(client.id)
              return (
                <div key={client.id} className="rounded-xl p-4 flex items-center gap-3 transition-all" style={{ background: isChecked ? 'rgba(196,150,42,0.08)' : 'rgba(15,10,0,0.85)', border: isChecked ? '1px solid rgba(196,150,42,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
                  <input type="checkbox" checked={isChecked} onChange={() => toggleCheck(client.id)} className="w-4 h-4 accent-yellow-500 flex-shrink-0" />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm text-black flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>{client.nom.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white font-bold text-sm">{client.nom}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" style={statutStyle(client.statut)}>{client.statut}</span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{client.email} • {client.ville} • {client.commandes} commande{client.commandes > 1 ? 's' : ''}</p>
                  </div>
                  <p className="text-gray-600 text-[10px] flex-shrink-0 hidden md:block">Inscrit le {client.dateInscription}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* CAMPAGNE */}
      {vue === 'campagne' && (
        <div className="max-w-2xl">
          <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">👥 Destinataires</p>
            {selectedClients.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedClients.map(c => (
                    <span key={c.id} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(196,150,42,0.15)', color: '#E8B84B', border: '1px solid rgba(196,150,42,0.3)' }}>
                      {c.nom}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs">{selectedClients.length} client{selectedClients.length > 1 ? 's' : ''} • Sélectionnez d&apos;autres dans la liste si besoin</p>
              </div>
            ) : (
              <div className="rounded-lg p-4 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <p className="text-gray-500 text-sm mb-2">Aucun client sélectionné</p>
                <button onClick={() => setVue('liste')} className="text-xs font-bold uppercase tracking-wide px-4 py-2 rounded" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>
                  ← Sélectionner des clients
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl p-5 mb-4 space-y-4" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Objet de l&apos;email</label>
              <input type="text" value={sujet} onChange={e => setSujet(e.target.value)} placeholder="Ex: 🔥 Nouveau drop — Lots disponibles maintenant !" className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onFocus={e => e.target.style.borderColor = '#C4962A'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Contenu du message</label>
              <textarea value={contenu} onChange={e => setContenu(e.target.value)} rows={8} placeholder="Bonjour,&#10;&#10;Nous avons de nouveaux lots disponibles...&#10;&#10;Cordialement,&#10;L'équipe ACA Wholesale" className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all resize-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onFocus={e => e.target.style.borderColor = '#C4962A'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              <p className="text-gray-600 text-[10px] mt-1">Un bouton &quot;VOIR NOS LOTS&quot; sera automatiquement ajouté en bas de l&apos;email.</p>
            </div>
          </div>

          {envoi && (
            <div className="rounded-xl p-4 mb-4" style={{ background: envoi.success ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${envoi.success ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
              {envoi.success ? (
                <p className="text-green-400 font-bold text-sm">✅ Campagne envoyée ! {envoi.succes} email{envoi.succes > 1 ? 's' : ''} envoyé{envoi.succes > 1 ? 's' : ''} avec succès{envoi.echecs > 0 ? ` (${envoi.echecs} échec${envoi.echecs > 1 ? 's' : ''})` : ''}.</p>
              ) : (
                <p className="text-red-400 font-bold text-sm">❌ Erreur : {envoi.error}</p>
              )}
            </div>
          )}

          <button onClick={envoyerCampagne} disabled={loading || !sujet.trim() || !contenu.trim() || selectedClients.length === 0} className="w-full py-4 font-black text-base uppercase tracking-widest text-black rounded-xl transition-opacity hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
            {loading ? 'Envoi en cours...' : `✉️ Envoyer à ${selectedClients.length} client${selectedClients.length > 1 ? 's' : ''}`}
          </button>
        </div>
      )}

      {/* HISTORIQUE */}
      {vue === 'historique' && (
        <div>
          {historique.length === 0 ? (
            <div className="flex items-center justify-center min-h-[250px]">
              <div className="text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-white font-bold uppercase tracking-wide text-sm mb-1">Aucune campagne envoyée</p>
                <p className="text-gray-500 text-xs">Les campagnes envoyées apparaîtront ici.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {historique.map(h => (
                <div key={h.id} className="rounded-xl p-5" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-black text-sm mb-1 truncate">{h.sujet}</p>
                      <p className="text-gray-500 text-xs">{h.date} à {h.heure} • {h.destinataires} destinataire{h.destinataires > 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>
                        ✅ {h.succes} envoyé{h.succes > 1 ? 's' : ''}
                      </span>
                      {h.echecs > 0 && <p className="text-red-400 text-[10px] mt-1">{h.echecs} échec{h.echecs > 1 ? 's' : ''}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CommandesTab() {
  const [selected, setSelected] = useState(null)
  const [filtre, setFiltre] = useState('Tous')
  const [checked, setChecked] = useState([])
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')

  const filtres = ['Tous', 'À expédier', 'En attente', 'Expédié']
  const filtered = mockOrders.filter(o => {
    const matchStatus = filtre === 'Tous' || o.status === filtre
    const matchDebut = !dateDebut || o.date >= dateDebut
    const matchFin = !dateFin || o.date <= dateFin
    return matchStatus && matchDebut && matchFin
  })

  const toggleCheck = (id) => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleAll = () => setChecked(checked.length === filtered.length ? [] : filtered.map(o => o.id))
  const selectedOrders = mockOrders.filter(o => checked.includes(o.id))

  const statusStyle = (s) => {
    if (s === 'À expédier') return { background: 'rgba(196,150,42,0.15)', color: '#E8B84B', border: '1px solid rgba(196,150,42,0.3)' }
    if (s === 'Expédié') return { background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
    return { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }
  }

  if (selected) {
    const order = mockOrders.find(o => o.id === selected)
    const total = order.produits.reduce((s, p) => s + p.prix * p.qte, 0)
    return (
      <div>
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wide mb-6 transition-colors">← Retour aux commandes</button>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-5" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">📬 Destinataire</p>
            <p className="text-white font-black text-base mb-1">{order.client.nom}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{order.client.adresse}<br />{order.client.codePostal} {order.client.ville}<br />{order.client.pays}</p>
            <p className="text-gray-400 text-sm mt-2">{order.client.tel}</p>
            <p className="text-gray-400 text-sm">{order.client.email}</p>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">📏 Colis</p>
            <div className="grid grid-cols-2 gap-3">
              {[{ l: 'Poids', v: `${order.poids} kg` }, { l: 'Dimensions', v: `${order.dimensions} cm` }, { l: 'Valeur', v: `${order.valeur} €` }, { l: 'Livraison', v: order.livraison }].map(i => (
                <div key={i.l} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">{i.l}</p>
                  <p className="text-white font-bold text-sm mt-0.5">{i.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl p-5 mb-4" style={{ background: 'rgba(15,10,0,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">📦 Produits</p>
          <div className="space-y-2">
            {order.produits.map((p, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white text-sm">{p.nom}</span>
                <div className="flex items-center gap-4"><span className="text-gray-400 text-xs">x{p.qte}</span><span className="text-white font-bold text-sm">{p.prix * p.qte} €</span></div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="text-white font-black uppercase tracking-wide text-sm">Total</span>
              <span className="font-black text-lg" style={{ color: '#C4962A' }}>{total} €</span>
            </div>
          </div>
        </div>
        <button onClick={() => printMultiple([order])} className="w-full py-4 font-black text-base uppercase tracking-widest text-black rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
          🖨️ Imprimer le bordereau d&apos;envoi
        </button>
      </div>
    )
  }

  return (
    <div>
      {checked.length > 0 && (
        <div className="rounded-xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3" style={{ background: 'rgba(196,150,42,0.12)', border: '2px solid rgba(196,150,42,0.4)' }}>
          <div>
            <p className="text-white font-black text-sm uppercase tracking-wide">🖨️ {checked.length} bordereau{checked.length > 1 ? 'x' : ''} sélectionné{checked.length > 1 ? 's' : ''}</p>
            <p className="text-gray-400 text-xs mt-0.5">Tous seront imprimés en une seule fois</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setChecked([])} className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wide px-3 py-2 rounded border border-white/10">Annuler</button>
            <button onClick={() => printMultiple(selectedOrders)} className="text-black text-sm px-5 py-2 font-black uppercase tracking-wide rounded-lg flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>🖨️ Imprimer tout ({checked.length})</button>
          </div>
        </div>
      )}
      <div className="flex gap-2 mb-4 flex-wrap">
        {filtres.map(f => (
          <button key={f} onClick={() => setFiltre(f)} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all" style={filtre === f ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
            {f}
          </button>
        ))}
      </div>
      <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(15,10,0,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">📅 Filtrer par période</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 font-bold">Du</label>
            <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} className="px-3 py-1.5 text-white text-xs rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 font-bold">Au</label>
            <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} className="px-3 py-1.5 text-white text-xs rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }} />
          </div>
          {(dateDebut || dateFin) && <button onClick={() => { setDateDebut(''); setDateFin('') }} className="text-xs text-gray-400 hover:text-white font-bold px-3 py-1.5 rounded border border-white/10">✕ Effacer</button>}
          {filtered.length > 0 && <button onClick={() => printMultiple(filtered)} className="text-black text-xs px-4 py-1.5 font-black uppercase tracking-wide rounded-lg flex items-center gap-1.5 ml-auto" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>🖨️ Imprimer les {filtered.length} bordereaux filtrés</button>}
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={checked.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="w-4 h-4 accent-yellow-500" />
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Tout sélectionner ({filtered.length})</span>
        </label>
        {checked.length > 0 && <span className="text-xs font-bold" style={{ color: '#C4962A' }}>{checked.length} sélectionné{checked.length > 1 ? 's' : ''}</span>}
      </div>
      <div className="space-y-3">
        {filtered.length === 0 && <div className="text-center py-12 text-gray-500 text-sm">Aucune commande pour cette période.</div>}
        {filtered.map(order => {
          const total = order.produits.reduce((s, p) => s + p.prix * p.qte, 0)
          const isChecked = checked.includes(order.id)
          return (
            <div key={order.id} className="rounded-xl p-4 transition-all" style={{ background: isChecked ? 'rgba(196,150,42,0.08)' : 'rgba(15,10,0,0.85)', border: isChecked ? '1px solid rgba(196,150,42,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={isChecked} onChange={() => toggleCheck(order.id)} className="w-4 h-4 accent-yellow-500 flex-shrink-0" />
                <div className="flex-1 cursor-pointer" onClick={() => setSelected(order.id)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-black text-sm">{order.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" style={statusStyle(order.status)}>{order.status}</span>
                    <span className="text-gray-600 text-[10px]">{order.dateAff}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{order.client.nom} • {order.client.ville}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{order.produits.map(p => p.nom).join(', ')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-base" style={{ color: '#C4962A' }}>{total} €</p>
                  <button onClick={() => printMultiple([order])} className="text-[10px] font-bold px-3 py-1 rounded mt-1 uppercase tracking-wide text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>🖨️ Imprimer</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
