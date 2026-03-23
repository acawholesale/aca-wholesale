'use client'
import { useState, useEffect } from 'react'
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
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Bordereaux ACA Wholesale</title><link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet"><style>${CSS_PRINT}</style></head><body>${body}<script>document.fonts.ready.then(function(){window.print()})<\/script></body></html>`
  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) { alert('Veuillez autoriser les popups pour imprimer'); return }
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
     .          <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        )}

        <main className="flex-1 p-5 md:p-8" id="main-content" tabIndex={-1}>
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
      <div className="flex gap-2 mb-6">
        {[{ id: 'liste', label: '👥 Clients', count: mockClients.length }, { id: 'campagne', label: '✉️ Campagne', count: null }, { id: 'historique', label: '📋 Historique', count: historique.length }].map(t => (
          <button key={t.id} onClick={() => setVue(t.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all" style={vue === t.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
            {t.label}{t.count !== null && <span className="px-1.5 py-0.5 rounded-full text-[10px]" style={vue === t.id ? { background: 'rgba(0,0,0,0.2)' } : { background: 'rgba(196,150,42,0.2)', color: '#E8B84B' }}>{t.count}</span>}
          </button>
        ))}
      </div>

      {vue === 'liste' && (
        <div>
          {checked.length > 0 && (
            <div className="rounded-xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3" style={{ background: 'rgba(196,150,42,0.12)', border: '2px solid rgba(196,150,42,0.4)' }}>
              <div>
             .  <p className="text-white font-black text-sm uppercase tracking-wide">✉️ {checked.length} client{checked.length > 1 ? 's' : ''} sélectionné{checked.length > 1 ? 's' : ''}</p>
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
         .          <p className="text-gray-500 text-xs truncate">{client.email} • {client.ville} • {client.commandes} commande{client.commandes > 1 ? 's' : ''}</p>
                  </div>
                  <p className="text-gray-600 text-[10px] flex-shrink-0 hidden md:block">Inscrit le {client.dateInscription}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

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
  const [orders, setOrders] = useState(mockOrders)
  const [selected, setSelected] = useState(null)
  const [filtreStatut, setFiltreStatut] = useState('Tous')
  const [checked, setChecked] = useState([])
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [montantMin, setMontantMin] = useState('')
  const [montantMax, setMontantMax] = useState('')
  const [triPar, setTriPar] = useState('date-desc')
  const [changedId, setChangedId] = useState(null)
  const [glsData, setGlsData] = useState({})
  const [glsLoading, setGlsLoading] = useState(new Set())

  // Persist GLS shipments across refreshes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aca_gls_shipments')
      if (saved) setGlsData(JSON.parse(saved))
    } catch {}
  }, [])

  const STATUTS = ['À expédier', 'En cours', 'Expédié', 'Livré', 'Annulé']

  const getTotal = (order) => order.produits.reduce((s, p) => s + p.prix * p.qte, 0)

  const updateStatut = (id, newStatut) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatut } : o))
    setChangedId(id)
    setTimeout(() => setChangedId(null), 1500)
  }

  const createGLSShipment = async (order) => {
    setGlsLoading(prev => new Set([...prev, order.id]))
    try {
      const res = await fetch('/api/gls/create-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      })
      const data = await res.json()
      if (data.success) {
        setGlsData(prev => {
          const updated = { ...prev, [order.id]: data }
          try { localStorage.setItem('aca_gls_shipments', JSON.stringify(updated)) } catch {}
          return updated
        })
        updateStatut(order.id, 'Expédié')
        return data
      } else {
        alert('Erreur GLS : ' + (data.error || 'Erreur inconnue'))
        return null
      }
    } catch (e) {
      alert('Erreur réseau : ' + e.message)
      return null
    } finally {
      setGlsLoading(prev => { const s = new Set(prev); s.delete(order.id); return s })
    }
  }

  const openGLSLabel = (b64) => {
    if (!b64) return
    const blob = new Blob([Uint8Array.from(atob(b64), c => c.charCodeAt(0))], { type: 'application/pdf' })
    window.open(URL.createObjectURL(blob), '_blank')
  }

  const printGLSLabel = async (order) => {
    const existing = glsData[order.id]
    if (existing) {
      if (existing.labelBase64) { openGLSLabel(existing.labelBase64); return; }
      if (existing.trackingUrl) { window.open(existing.trackingUrl, '_blank'); return; }
    }
    const data = await createGLSShipment(order)
    if (data?.labelBase64) openGLSLabel(data.labelBase64)
    else if (data?.trackingUrl) window.open(data.trackingUrl, '_blank')
  }

  const printAllGLS = async (ordersList) => {
    for (const order of ordersList) {
      await printGLSLabel(order)
    }
  }

  const filteredOrders = orders
    .filter(o => {
      const total = getTotal(o)
      const matchStatut = filtreStatut === 'Tous' || o.status === filtreStatut
      const matchDebut = !dateDebut || o.date >= dateDebut
      const matchFin = !dateFin || o.date <= dateFin
      const matchMin = !montantMin || total >= Number(montantMin)
      const matchMax = !montantMax || total <= Number(montantMax)
      return matchStatut && matchDebut && matchFin && matchMin && matchMax
    })
    .sort((a, b) => {
      const tA = getTotal(a), tB = getTotal(b)
      if (triPar === 'date-desc') return b.date.localeCompare(a.date)
      if (triPar === 'date-asc') return a.date.localeCompare(b.date)
      if (triPar === 'montant-desc') return tB - tA
      if (triPar === 'montant-asc') return tA - tB
      return 0
    })

  const countByStatut = (s) => orders.filter(o => o.status === s).length

  const hasActiveFilters = filtreStatut !== 'Tous' || dateDebut || dateFin || montantMin || montantMax
  const resetFilters = () => {
    setFiltreStatut('Tous')
    setDateDebut('')
    setDateFin('')
    setMontantMin('')
    setMontantMax('')
  }

  const toggleCheck = (id) => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  const toggleAll = () => setChecked(checked.length === filteredOrders.length ? [] : filteredOrders.map(o => o.id))
  const selectedOrders = orders.filter(o => checked.includes(o.id))

  const statusStyle = (s) => {
    if (s === 'À expédier') return { background: 'rgba(196,150,42,0.15)', color: '#E8B84B', border: '1px solid rgba(196,150,42,0.3)' }
    if (s === 'En cours') return { background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }
    if (s === 'Expédié') return { background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
    if (s === 'Livré') return { background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }
    if (s === 'Annulé') return { background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }
    return { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }
  }

  if (selected) {
    const order = orders.find(o => o.id === selected)
    const total = getTotal(order)
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
        {/* Section GLS */}
        {glsData[order.id] ? (
          <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(0,80,180,0.08)', border: '1px solid rgba(59,130,246,0.3)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#60a5fa' }}>📦 Envoi GLS créé</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">N° de suivi GLS</p>
                <p className="text-white font-black text-sm mt-0.5 select-all">{glsData[order.id].trackID}</p>
              </div>
              <a href={glsData[order.id].trackingUrl} target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-bold px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(59,130,246,0.2)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)' }}>
                🔍 Suivre le colis
              </a>
            </div>
            {glsData[order.id].labelBase64 && (
              <button onClick={() => openGLSLabel(glsData[order.id].labelBase64)}
                className="w-full py-2 text-sm font-bold rounded-lg"
                style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.25)' }}>
                🏷️ Télécharger l&apos;étiquette GLS (PDF)
              </button>
            )}
          </div>
        ) : (
          <button onClick={() => printGLSLabel(order)} disabled={glsLoading.has(order.id)}
            className="w-full py-3 mb-3 font-black text-sm uppercase tracking-widest text-white rounded-xl flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', opacity: glsLoading.has(order.id) ? 0.6 : 1 }}>
            {glsLoading.has(order.id) ? '⏳ Création en cours...' : '🏷️ GLS + Étiquette PDF'}
          </button>
        )}
        <button onClick={() => printGLSLabel(order)} className="w-full py-4 font-black text-base uppercase tracking-widest text-black rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>
          🏷️ GLS – Étiquette d&apos;expédition
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Barre actions sélection */}
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

      {/* Bouton imprimer à expédier */}
      {orders.filter(o => o.status === 'À expédier').length > 0 && checked.length === 0 && (
        <button
          onClick={() => printMultiple(orders.filter(o => o.status === 'À expédier'))}
          className="mb-4 w-full text-black text-sm px-5 py-3 font-black uppercase tracking-wide rounded-xl flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}
        >
          🖨️ Imprimer à expédier ({orders.filter(o => o.status === 'À expédier').length})
        </button>
      )}

      {/* Filtres statut avec compteurs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setFiltreStatut('Tous')} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-1.5" style={filtreStatut === 'Tous' ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
          Tous <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={filtreStatut === 'Tous' ? { background: 'rgba(0,0,0,0.2)' } : { background: 'rgba(255,255,255,0.08)' }}>{orders.length}</span>
        </button>
        {STATUTS.map(s => {
          const count = countByStatut(s)
          if (count === 0 && filtreStatut !== s) return null
          return (
            <button key={s} onClick={() => setFiltreStatut(s)} className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-1.5" style={filtreStatut === s ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
              {s} <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={filtreStatut === s ? { background: 'rgba(0,0,0,0.2)' } : { background: 'rgba(255,255,255,0.08)' }}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Filtres avancés */}
      <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(15,10,0,0.7)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">🔍 Filtres avancés</p>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded" style={{ color: '#E8B84B', background: 'rgba(196,150,42,0.1)', border: '1px solid rgba(1=6,150,42,0.3)' }}>✕ Tout effacer</button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Filtre date */}
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-wide mb-2">📅 Période</p>
            <div className="flex items-center gap-2">
              <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} className="flex-1 px-3 py-1.5 text-white text-xs rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }} />
              <span className="text-gray-600 text-xs">→</span>
              <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} className="flex-1 px-3 py-1.5 text-white text-xs rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }} />
            </div>
          </div>
          {/* Filtre montant */}
          <div>
            <p className="text-[10px] text-gray-600 uppercase tracking-wide mb-2">💰 Montant (€)</p>
            <div className="flex items-center gap-2">
              <input type="number" value={montantMin} onChange={e => setMontantMin(e.target.value)} placeholder="Min" className="flex-1 px-3 py-1.5 text-white text-xs rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
              <span className="text-gray-600 text-xs">→</span>
              <input type="number" value={montantMax} onChange={e => setMontantMax(e.target.value)} placeholder="Max" className="flex-1 px-3 py-1.5 text-white text-xs rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Barre résultats + tri + actions groupées */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={checked.length === filteredOrders.length && filteredOrders.length > 0} onChange={toggleAll} className="w-4 h-4 accent-yellow-500" />
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">{filteredOrders.length} résultat{filteredOrders.length > 1 ? 's' : ''}</span>
          </label>
          {filteredOrders.length > 0 && (
            <button onClick={() => printMultiple(filteredOrders)} className="text-black text-[10px] px-3 py-1.5 font-black uppercase tracking-wide rounded-lg flex items-center gap-1" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>🖨️ Imprimer ({filteredOrders.length})</button>
          )}
        </div>
        <select value={triPar} onChange={e => setTriPar(e.target.value)} className="text-white text-[11px] font-bold px-3 py-1.5 rounded-lg outline-none" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <option value="date-desc">Date ↓ (récenu9</option>
          <option value="date-asc">Date ↑ (ancien)</option>
          <option value="montant-desc">Montant ↓</option>
          <option value="montant-asc">Montant ↑</option>
        </select>
      </div>

      {/* Liste commandes */}
      <div className="space-y-2">
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-3xl mb-3">🔍</div>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-wide mb-1">Aucune commande</p>
            <p className="text-gray-600 text-xs">Essayez d&apos;élargir vos filtres</p>
            {hasActiveFilters && <button onClick={resetFilters} className="mt-4 text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' }}>Effacer les filtres</button>}
          </div>
        )}
        {filteredOrders.map(order => {
          const total = getTotal(order)
          const isChecked = checked.includes(order.id)
          const justChanged = changedId === order.id
          return (
            <div key={order.id} className="rounded-xl p-4 transition-all" style={{ background: justChanged ? 'rgba(34,197,94,0.06)' : isChecked ? 'rgba(196,150,42,0.08)' : 'rgba(15,10,0,0.85)', border: justChanged ? '1px solid rgba(34,197,94,0.4)' : isChecked ? '1px solid rgba(196,150,42,0.4)' : '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={isChecked} onChange={() => toggleCheck(order.id)} className="w-4 h-4 accent-yellow-500 flex-shrink-0 mt-1" />
                {/* Infos commande */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelected(order.id)}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-white font-black text-sm">{order.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide" style={statusStyle(order.status)}>{order.status}</span>
                    <span className="text-gray-600 text-[10px]">{order.dateAff}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{order.client.nom} • {order.client.ville}</p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{order.produits.map(p => p.nom).join(', ')}</p>
                </div>
                {/* Colonne droite: montant + actions */}
                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  <p className="font-black text-base" style={{ color: '#C4962A' }}>{total} €</p>
                  {/* Changement statut inline */}
                  <select
                    value={order.status}
                    onChange={e => { e.stopPropagation(); updateStatut(order.id, e.target.value) }}
                    onClick={e => e.stopPropagation()}
                    className="text-[11px] font-bold px-2 py-1 rounded-lg outline-none cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#e5e7eb' }}
                  >
                    {STATUTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {glsData[order.id] ? (
                    <a href={glsData[order.id].trackingUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1"
                      style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}>
                      📦 {glsData[order.id].trackID.slice(-6)}
                    </a>
                  ) : (
                    <button onClick={e => { e.stopPropagation(); printGLSLabel(order) }}
                      disabled={glsLoading.has(order.id)}
                      className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide text-white"
                      style={{ background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(59,130,246,0.4)', opacity: glsLoading.has(order.id) ? 0.5 : 1 }}>
                      {glsLoading.has(order.id) ? '⏳' : '🚚 GLS'}
                    </button>
                  )}
                  <button onClick={e => { e.stopPropagation(); printGLSLabel(order) }} className="text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wide text-black" style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)' }}>🏷️ Étiquette GLS</button>
                </div>
              </div>
              {(justChanged || glsData[order.id]) && (
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  {justChanged && <span className="text-green-400 text-[10px] font-bold">✓ Statut mis à jour</span>}
                  {glsData[order.id] && <span className="text-blue-400 text-[10px] font-bold">📦 GLS: {glsData[order.id].trackID}</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
