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
  { id: 'ACA-2026-003', date: '2026-03-19', dateAff: 'Mer 19/03/2026', status: 'À expédier', client: { nom: 'Thomas Leroy', addresse: '8 Rue du Commerce', codePostal: '33000', ville: 'Bordeaux', pays: 'France', tel: '06 45 67 89 01', email: 'thomas.l@email.com' }, produits: [{ nom: 'Lot Mountain high peak Coach', qte: 1, prix: 149 }, { nom: 'Lot Doudounes The North Face', qte: 1, prix: 129 }], poids: '7', dimensions: '55x40x30', valeur: '129', livraison: 'Standard' },
  { id: 'ACA-2026-004', date: '2026-03-19', dateAff: 'Mer 19/03/2026', status: 'ExpédieÉ', client: { nom: 'Laura Petit', addresse: '3 Rue de la République', codePostal: '67000', ville: 'Strasbourg', pays: 'France', tel: '06 56 78 90 12', email: 'laura.p@email.com' }, produits: [{ nom: 'Lot Luxury Ralph Lauren', qte: 1, prix: 159 }], poids: '4', dimensions: '45x35x20', valeur: '159', livraison: 'Express' },
  { id: 'ACA-2026-005', date: '2026-03-20', dateAff: 'Jeu 20/03/2026', status: 'À expédier', client: { nom: 'Marc Dupont', adresse: '22 Boulevard Gambetta', codePostal: '59000', ville: 'Lille', pays: 'France', tel: '07 67 89 01 23', email: 'marc.d@email.com' }, produits: [{ nom: 'Lot Sportswear Nike', qte: 2, prix: 75 }], poids: '8', dimensions: '55x40x28', valeur: '150', livraison: 'Standard' },
]

const mockClients = [
  { id: 1, nom: 'Karim Benali', email: 'karim.b@email.com', statut: 'VIP', commandes: 5, ville: 'Lyon', dateInscription: '10/01/2026' },
  { id: 2, nom: 'Sarah Martin', email: 'sarah.m@email.com', statut: 'Actif', commandes: 3, ville: 'Marseille', dateInscription: '15/01/2026' },
  { id: 3, nom: 'Thomas Leroy', email: 'thomas.l@email.com', statut: 'Nouveau', commandes: 1, ville: 'Bordeaux', dateInscription: '01/02/2026' },
  { id: 4, nom: 'Laura Petit', email: 'laura.p@email.com', statut: 'VIP', commandes: 8, ville: 'Stra-bottom:1px solid #eee;text-align:right;">${p.prix * p.qte} €</td></tr>`).join('')
  const total = order.produits.reduce((s, p) => s + p.prix * p.qte, 0)
  const barcode = order.id.replace(/-/g, '')
  return `<div class="page"><div class="header"><div class="logo-block"><h1>AC<span>A</span> WHOLESALE</h1><p>Grossiste vêtements second main ¢ Moselle, France</p><p   
          >${EXPEDITEUR.tel} • ${EXPEDITEUR.email}</p></div><div class="ref-block"><div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;">Bordereau d'envoi</div><div class="num">${order.id}</div><div class="date">Date : ${order.dateAff}</div><div class="badge badge-${order.livraison === 'Express' ? 'express' : 'standard'}">${order.livraison}</div></div></div><div class="addresses"><div class="address-box"><h3>📤 Expéditeur</h3><div class="name">${EXPEDITEUR.nom}</div><p>${EXPEDITEUR.adresse}<br>${EXPEDITEUR.codePostal} ${EXPEDITEUR.ville}<br>${EXPEDITEUR.pays}<br>${EXPEDITEUR.tel}</p></div><div class="address-box dest"><h3📬 Destinataire</h3><div class="name">${order.client.nom}</div><p>${order.client.adresse}<br>${order.client.codePostal} ${order.client.ville}<br>${order.client.pays}<br>${order.client.tel}<br>${order.client.email}</p></div></div><div class="section"><h3📦 Produits commandés</h3><table><thead><tr><th>Désignation</th><th>Qté</th><th<Prix</th></tr></thead><tbody>${produitsList}</tbody><tfoot><tr class="total-row"><td colspan="2">Total commande</td><td>${total} €</td></tr></tfoot></table></div><div class="section"><h3📏 Informations colis</h3><div class="colis-grid"><div class="colis-item"><div class="val">${order.poids} kg</div><div class="lbl">Poids</div></div><div class="colis-item"><div class="val">${order.dimensions}</div><div class="lbl">Dimensions (cm)</div></div><div class="colis-item"><div class="val">${order.valeur} €</div><div class="lbl">Valeur déclarée</div></div><div class="colis-item"><div class="val">1</div><div class="lbl">Nb colis</div></div></div><p style="margin-top:10px;font-size:10px;color:#666;">Contenu : Vêtements de seconde main</p></div><div class="barcode-section"><div style="font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Cod-box.dest { border:2px solid #C4962A; } .address-box h3 { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:#999; margin-bottom:8px; } .address-box .name { font-size:14px; font-weight:700; margin-bottom:4px; } .address-box p { font-size:11px; color:#333; line-height:1.6; } .section { border:1px solid #ddd; border-radius:8px; padding:12px; margin-bottom:12px; } .section h3 { font-size:9px; text-transform:uppercase; letter-spacing:1px; color:#999; margin-bottom:10px; } table { width:100%; border-collapse:collapse; } th { background:#f5f5f5; padding:6px 8px; text-align:left; font-size:10px; text-transform:uppercase; } th:nth-child(2) { text-align:center; } th:nth-child(3) { text-align:right; } .total-row td { padding:8px; font-weight:700; font-size:13px; border-top:2px solid #C4962A; } .total-row td:last-child { text-align:right; color:#C4962A; } .colis-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; } .colis-item { text-align:center; } .colis-item .val { font-size:16px; font-weight:900; } .colis-item .lbl { font-size:9px; color:#999; text-transform:uppercase; } .barcode-section { text-align:center; padding:16px; border:1px solid #ddd; border-radius:8px; } .barcode { font-family:'Libre Barcode 128',monospace; font-size:48px; letter-spacing:4px; display:block; margin:8px 0; } .barcode-num { font-size:13px; font-weight:700; letter-spacing:3px; color:#333; } .footer { margin-top:20px; padding-top:12px; border-top:1px solid #eee; text-align:centeName="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all" style={activeTab === item.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { color: '#9ca3af' }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-white transition-colors">
          <span>軿),/span> Déconnexion
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/10" style={{ background: 'rgba(10,6,0,0.9)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"a(34,197,94,0.3)' }}>
                        ✅ {h.succes} envoyé{h.succes > 1 ? 's' : ''}
                      </span>
                      {h.echecs > 0 && <p className="text-red-400 text-[10px] mt-1">{h.echecs} échec{h.echecs > 1 ? 's' : ''}</p>}
                   </div>
                </div>
              </div>
            </div>
            )
          })}
        </div>
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

  const STATUSS = ['† expédier', 'En cours', 'Expédié', 'Livrés', 'Annulé']

  const getTotal = (order) => order.produits.reduce((s, p) => s + p.prix* p.qte, 0)

  const updateStatut = (id, newStatut) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatut } : o))
    setChangedId(id)
    setTimeout(() => setChangedId(null), 1500)
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
            <p className="text-gray-400 text-sm leading-relaxed">{order.client.addresse}<br />{order.client.codePostal} {order.client.ville}<br />{order.client.pays}</p>
            <p className="text-gray-400 text-sm mt-2">{order.client.tel}</p>
            <p className="text-gray-400 text-sm">{order.client.email}</p>
          </div>ActiveTab(item.id); setMenuOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide text-left" style={activeTab === item.id ? { background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#000' } : { color: '#9ca3af' }}>
                <span>{item.icon}</span> {item.label}
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
  const expedie = mockOrders.filter(o => o.status === 'Expédie').length
  const stats = [
    { label: 'Total commandes', value: mockOrders.length, icon: '📦', sub: 'au total', tab: 'commandes' },
    { label: 'à expédier', value: aExpedier, icon: '🖚&', sub: 'en attente', tab: 'commandes' },
    { label: 'Clients', value: mockClients.length, icon: '👥', sub: 'inscrits', tab: 'clients' },
    { label: 'Chiffre total', value: mockOrders.reduce((s, o) => s + o.produits.reduce((ss, p) => ss + p.prix * p.qte, 0), 0) + ' €', icon: '💰', sub: 'ce mois', tab: 'commandes' },
  ]
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">Vue d'apos;ensemble</p>
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
  
  
d�T�7F���6ƖV�G5F"����6��7B�gVR�6WEgVU��W6U7FFR�vƗ7FRr��6��7B�f��G&R�6WDf��G&U��W6U7FFR�uF�W2r��6��7B�6�V6�VB�6WD6�V6�VE��W6U7FFR��Ґ�6��7B�7V�WB�6WE7V�WE��W6U7FFR�rr��6��7B�6��FV�R�6WD6��FV�U��W6U7FFR�rr��6��7B�V�f���6WDV�f����W6U7FFR��V��6��7B���F��r�6WD��F��u׵�W6U7FFR�f�6R��6��7B���7F�&�VR�6WD��7F�&�VU��W6U7FFR��Ґ��6��7Bf��G&W2��uF�W2r�ud�r�t7F�br�t��WfVRuТ6��7Bf��G&W&VB�f��G&R���uF�W2r���6�6ƖV�G2���6�6ƖV�G2�f��FW"�2��2�7FGWB���f��G&R��6��7BF�vv�T6�V6����B���6WD6�V6�VB�&Wb��&Wb��6�VFW2��B��&Wb�f��FW"��������B������&Wb��EҐ�6��7BF�vv�T�������6WD6�V6�VB�6�V6�VB��V�wF����f��FW&VB��V�wF�����f��FW&VB���2��2�B���6��7B6V�V7FVD6ƖV�G2���6�6ƖV�G2�f��FW"�2��6�V6�VB��6�VFW2�2�B����6��7B7FGWE7G��R��2������b�2���ud�r�&WGW&��&6�w&�V�C�w&v&��b�S�C"��R�r�6���#�r4S�#�D"r�&�&FW#�s�6�ƖB&v&��b�S�C"��2�rТ�b�2���t7F�br�&WGW&��&6�w&�V�C�w&v&�3B��rÓB���r�6���#�r3FFS�r�&�&FW#�s�6�ƖB&v&�3B��rÓB��2�rТ&WGW&��&6�w&�V�C�w&v&�#SR�#SR�#SR��R�r�6���#�r3�66br�&�&FW#�s�6�ƖB&v&�#SR�#SR�#SR���rТР�6��7BV�f��W"6�v�R�7��2�������b�7V�WB�G&�҂���6��FV�R�G&�҂��&WGW&�6WD��F��r�G'VR��6WDV�f����V��G'���6��7B&W2�v�BfWF6��r���F֖��6V�B�6��v�r����WF��C�u�5Br���VFW'3��t6��FV�B�G�Rs�vƖ6F�����6��r���&�G���4���7G&��v�g���FW7F��F�&W3�6V�V7FVD6ƖV�G2�7V�WB�6��FV�RҒ��Ґ�6��7BFF�v�B&W2�6�ₐ�6WDV�f���FF���b�FF�7V66W2���6WD��7F�&�VR�&Wb������C�FFR���r���FFS��WrFFR���F���6�TFFU7G&��r�vg"�e"r����WW&S��WrFFR���F���6�UF��U7G&��r�vg"�e"r����W#�s"�F�v�Br�֖�WFS�s"�F�v�BrҒ��7V�WB�FW7F��F�&W3�6V�V7FVD6ƖV�G2��V�wF��7V66W3�FF�7V66W2�V6�V73�FF�V6�V72�������&WeҐ�6WE7V�WB�rr��6WD6��FV�R�rr��6WD6�V6�VB��Ґ�Т�6F6���6WDV�f����W'&�#�tW'&WW",:�6VRwҐ�Т6WD��F��r�f�6R��Р�&WGW&����F�c��F�b6�74��S�&f�W�v�"�"�b#�����C�vƗ7FRr��&Vâ	�R6ƖV�G2r�6�V�C���6�6ƖV�G2��V�wF�����C�v6�v�Rr��&Vâ~)Ȟ���6�v�Rr�6�V�C��V������C�v��7F�&�VRr��&Vâ	�8���7F�&�VRr�6�V�C���7F�&�VR��V�wF������B�����'WGF���W�׷B�G���6Ɩ6�ײ����6WEgVR�B�B��6�74��S�&f�W��FV�2�6V�FW"v�"��B��"&�V�FVB��rFW�Bׇ2f��B�&��BWW&66RG&6���r�v�FRG&�6�F������"7G��S׷gVR���B�B��&6�w&�V�C�vƖ�V"�w&F�V�B�3VFVr�43C�c$�4S�#�D"�r�6���#�r3r���&6�w&�V�C�w&v&�#SR�#SR�#SR��R�r�6���#�r3�66br�&�&FW#�s�6�ƖB&v&�#SR�#SR�#SR���r����B��&V�׷B�6�V�B���V��bb�7�6�74��S�'���R���R&�V�FVB�gV��FW�Bճ��"7G��S׷gVR���B�B��&6�w&�V�C�w&v&�����"�r���&6�w&�V�C�w&v&��b�S�C"��"�r�6���#�r4S�#�D"r���B�6�V�G���7��Т��'WGF�����Т��F�cࠢ�gVR���vƗ7FRrbb���F�c��6�V6�VB��V�wF��bb���F�b6�74��S�'&�V�FVB׆��B�"�Rf�W��FV�2�6V�FW"�W7F�g��&WGvVV�f�W��w&v�2"7G��S׷�&6�w&�V�C�w&v&��b�S�C"��"�r�&�&FW#�s'�6�ƖB&v&��b�S�C"��B�r����F�c��6�74��S�'FW�B�v��FRf��B�&�6�FW�B�6�WW&66RG&6���r�v�FR#�)Ȟ����6�V6�VB��V�wF��6ƖV�G�6�V6�VB��V�wF���w2r�rw�<:��V7F����:W�6�V6�VB��V�wF���w2r�rw�����6�74��S�'FW�B�w&��CFW�Bׇ2�B��R#�,:�G2�W"V�R6�v�RV��������F�c��F�b6�74��S�&f�W�v�"#��'WGF����6Ɩ6�ײ����6WD6�V6�VB��җ�6�74��S�'FW�B�w&��C��fW#�FW�B�v��FRFW�Bׇ2f��B�&��B��2��"&�V�FVB&�&FW"&�&FW"�v��FR�#���V�W#��'WGF����'WGF����6Ɩ6�ײ����6WEgVR�v6�v�Rr��6�74��S�'FW�B�&�6�FW�B�6���R��"f��B�&�6�WW&66RG&6���r�v�FR&�V�FVB��r"7G��S׷�&6�w&�V�C�vƖ�V"�w&F�V�B�3VFVr�43C�c$�4S�#�D"�r���)Ȟ���7,:�W"V�R6�v�P���'WGF�����F�c���F�c��F�b6�74��S�&f�W�v�"�"�Bf�W��w&#��f��G&W2���b�����'WGF���W�׶g���6Ɩ6�ײ����6WDf��G&R�b��6�74��S�'��B���R&�V�FVB�gV��FW�Bׇ2f��B�&��BWW&66RG&6���r�v�FRG&�6�F������"7G��S׶f��G&R���b��&6�w&�V�C�vƖ�V"�w&F�V�B�3VFVr�43C�c$�4S�#�D"�r�6���#�r3r���&6�w&�V�C�w&v&�#SR�#SR�#SR��R�r�6���#�r3�66br�&�&FW#�s�6�ƖB&v&�#SR�#SR�#SR���r����g��f��G&R���bbb�G�f��FW&VB��V�wF�ҖТ��'WGF�����Т��F�cࠢ�F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�2#���&V�6�74��S�&f�W��FV�2�6V�FW"v�"7W'6�"����FW"#�Ɩ�WBG�S�&6�V6�&��"6�V6�VC׶6�V6�VB��V�wF����f��FW&VB��V�wF�bbf��FW&VB��V�wF�����6��vS׷F�vv�T���6�74��S�'r�B��B66V�BזV���r�S"���7�6�74��S�'FW�Bׇ2FW�B�w&��Cf��B�&��BWW&66RG&6���r�v�FR#�F�WB<:��V7F����W"��f��FW&VB��V�wF�ғ��7�����&V���6�V6�VB��V�wF��bb�7�6�74��S�'FW�Bׇ2f��B�&��B"7G��S׷�6���#�r43C�c$r���6�V6�VB��V�wF��<:��V7F����:W�6�V6�VB��V�wF���w2r�rw���7��Т��F�cࠢ�F�b6�74��S�'76Rג�"#��f��FW&VB���6ƖV�B����6��7B�46�V6�VB�6�V6�VB��6�VFW2�6ƖV�B�B��&WGW&����F�b�W�׶6ƖV�B�G�6�74��S�'&�V�FVB׆��Bf�W��FV�2�6V�FW"v�2G&�6�F������"7G��S׷�&6�w&�V�C��46�V6�VB�w&v&��b�S�C"����r�w&v&�R����R�r�&�&FW#��46�V6�VB�s�6�ƖB&v&��b�S�C"��B�r�s�6�ƖB&v&�#SR�#SR�#SR��r�r���Ɩ�WBG�S�&6�V6�&��"6�V6�VC׶�46�V6�VG���6��vSײ����F�vv�T6�V6��6ƖV�B�B��6�74��S�'r�B��B66V�BזV���r�Sf�W��6�&���"���F�b6�74��S�'rӒ�Ӓ&�V�FVB��rf�W��FV�2�6V�FW"�W7F�g��6V�FW"f��B�&�6�FW�B�6�FW�B�&�6�f�W��6�&���"7G��S׷�&6�w&�V�C�vƖ�V"�w&F�V�B�3VFVr�43C�c$�4S�#�D"�r���6ƖV�B�����6�$B�����F�c��F�b6�74��S�&f�W��֖��r�#��F�b6�74��S�&f�W��FV�2�6V�FW"v�"�"��R#��7�6�74��S�'FW�B�v��FRf��B�&��BFW�B�6�#�6ƖV�B�������7���7�6�74��S�'FW�Bճ��f��B�&��B��"���R&�V�FVB�gV��WW&66RG&6���r�v�FR"7G��S׷7FGWE7G��R�6ƖV�B�7FGWB���6ƖV�B�7FGWG���7����F�c��6�74��S�'FW�B�w&��SFW�Bׇ2G'V�6FR#�6ƖV�B�V����(
"�6ƖV�B�f���W�(
"�6ƖV�B�6����FW7�6����FW�6ƖV�B�6����FW2��w2r�rw�����6�74��S�'FW�B�w&��cFW�Bճ��f�W��6�&�����FFV��C�&��6�#��67&�B�R�6ƖV�B�FFT��67&�F���������F�c���җТ��F�c���F�c� �8b a;�B]�Ѡ��ɘ�I�����������������K��~i؁�٥ɽ������Ё��������ɥ�:�ɔ�������9����ܵ�ձ����Ё��́ѕ�еݡ�є�ѕ�еʹ�ɽչ���������ѱ����������Ʌ�ͥѥ�������ɕͥ锁ɽչ����Ј���屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���Ԥ�����ɑ��耜����ͽ����ɝ�����԰��԰��԰��Ĥ���􁽹�����픀�����хɝ�й��屔���ɑ��
���Ȁ􀜍�����􁽹	����픀�����хɝ�й��屔���ɑ��
���Ȁ�ɝ�����԰��԰��԰��Ĥ���(������������𽑥��(��(��(���ѽ����
�����핹ٍ���
�������􁑥ͅ�����������������͕���ѕ�
�����̹����Ѡ�����������թ�й�ɥ�����������ѕ�Թ�ɥ���􁍱���9����ѕ�е������ѕ�еʹ����е�����ܵ�ձ����ԁ��́����ɍ�͔��Ʌ������ݥ���ɽչ����������屔��쁉����ɽչ�耡�����������͕���ѕ�
�����̹����Ѡ�����������թ�й�ɥ�����������ѕ�Թ�ɥ��������ɝ�����ذ�����Ȱ��̤��耝�����ȵ�Ʌ����Р��Ց������������������������耜����������ͽ�耡�����������͕���ѕ�
�����̹����Ѡ�����������թ�й�ɥ�����������ѕ�Թ�ɥ����������е����ݕ���耝����ѕȜ����(��������������������������r�C{1Ը����耟�r'��<��ٽ�ȁ�������������(���������������ѽ��(������������핹ٽ����ɽȀ�����������9����ѕ�еɕ������ѕ�еʹ��д̈�핹ٽ����ɽ������(������������핹ٽ���Ս��̀�����������9����ѕ�е�ɕ�������ѕ�еʹ��д̈��rL�
����������ٽ��������(����������𽑥��(��������𽑥��(��������((��������Ք���􀝡��ѽɥ�Ք������(�����������(��(������2&^)8�8;���gb��7F�&�VRFW26�v�\�����7F�&�VR��V�wF��������F�b6�74��S�'FW�B�6V�FW"�ӂ"7G��S׷�&6�w&�V�C�w&v&�#SR�#SR�#SR��#R�r�&�&FW#�s�F6�VB&v&�#SR�#SR�#SR���r����6�74��S�'FW�B�w&��SFW�B�6�#�V7V�R6�v�RV�f��:�S�����F�c������F�b6�74��S�'76Rג�2#����7F�&�VR���������F�b�W�׶��G�6�74��S�'&�V�FVB׆��B&�&FW""7G��S׷�&6�w&�V�C�w&v&�R����R�r�&�&FW#�s�6�ƖB&v&��b�S�C"��"�r����F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�2#��F�c��6�74��S�'FW�B�v��FRf��B�&��BFW�B�6�#綂�FFW���������FFW�����6�74��S�'FW�B�w&��CFW�Bׇ2#�����	�R���FW7F��F�&W7�6ƖV�G���FW7F��F�&W2��w2r�rw������F�c��F�b6�74��S�'FW�B�&�v�B#��6�74��S�'FW�Bճ��f��B�&��BFW�B�w&VV��CWW&66RG&6���r�v�FR#�)�2�G�V�b��7V66W2���v�V�&W"r���7V66W2�t��w������F�c���F�c��F�b6�74��S�'��2��"&�V�FVB��r"7G��S׷�&6�w&�V�C�w&v&�#SR�#SR�#SR��2�r����6�74��S�'FW�B�v��FRFW�B�6��"�"7G��S׷�6���#�r43C�c$r���<:����7V�WG�����6�74��S�'FW�B�w&��CFW�Bׇ2Ɩ�R�6���2#綂�7V�WG������F�c���F�c���Т��F�c��Т��F�c� �8b `</div>
  
 #�   )
}} onChange={e => setContenu(e.target.value)} rows={8} placeholder="Bonjour,&#10;&#10;Nous avons de nouveaux lots disponibles...&#10;&#10;Cordialement,&#10;L'équipe ACA Wholesale" className="w-full px-4 py-3 text-white text-sm rounded-lg outline-none transition-all resize-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onFocus={e => e.target.style.borderColor = '#C4962A'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
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
                      {h.echecs > 0 && <p className="text-red-400 text-[10px] mt-1">{h.echecs} échec#{h.echecs > 1 ? 's' : ''[}</p>}
                    </div>
                  </div>
                </div>
  
 #�    ��F�c���Т��F�c��Т��F�c���Р�gV�7F���6����FW5F"����6��7B��&FW'2�6WD�&FW'5��W6U7FFR���6��&FW'2��6��7B�6V�V7FVB�6WE6V�V7FVE��W6U7FFR��V��6��7B�f��G&U7FGWB�6WDf��G&U7FGWE��W6U7FFR�uF�W2r��6��7B�6�V6�VB�6WD6�V6�VE��W6U7FFR��Ґ�6��7B�FFTFV'WB�6WDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [montantMin, setMontantMin] = useState('')
  const [montantMax, setMontantMax] = useState('')
  const [triPar, setTriPar] = useState('date-desc')
  const [changedId, setChangedId] = useState(null)

  const STATUTS = ['À expédier', 'En cours', 'Expédié', 'Livré', 'Annulé']

  const getTotal = (order) => order.produits.reduce((s, p) => s + p.prix * p.qte, 0)

  const updateStatut = (id, newStatut) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatut } : o))
    setChangedId(id)
    setTimeout(() => setChangedId(null), 1500)
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
        <button onClick={() => printMultiple([order])} className="w-full py-4 font-black text-base uppercase traE������ݥ���Ёѕ�е������ɽչ����ᰁ�Ʌ�ͥѥ���������䁡�ٕ�����������������ѕ�̵���ѕȁ���ѥ�䵍��ѕȁ����̈���屔��쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց���������������������(�����������~Z���<�%��ɥ��ȁ�����ɑ�ɕ�ԁ������핹ٽ�(�����������ѽ��(������𽑥��(�����(���((��ɕ��ɸ��(�������(������켨�	��ɔ���ѥ��́�����ѥ������(������퍡����������Ѡ���������(���������؁�����9����ɽչ����ᰁ��Ё���ԁ������ѕ�̵���ѕȁ���ѥ�䵉��ݕ��������Ʌ������̈���屔��쁉����ɽչ�耝ɝ�����ذ�����Ȱ���Ȥ�����ɑ��耜����ͽ����ɝ�����ذ�����Ȱ��Ф�����(�������������(��������������������9����ѕ�еݡ�є����е������ѕ�еʹ�����ɍ�͔��Ʌ������ݥ�����~Z���<�퍡����������ѡ􁉽ɑ�ɕ��퍡����������Ѡ���Ā������耜�������ѥ����퍡����������Ѡ���Ā���̜�耜�����(��������������������9����ѕ�е�Ʌ�����ѕ�е�́�д��Ԉ�Q��͕́ɽ�Ё���ɥ��́���չ��͕ձ���������(����������𽑥��(�����������؁�����9���􉙱�������Ȉ�(���������������ѽ����
�����젤����͕�
�������mt�􁍱���9����ѕ�е�Ʌ�������ٕ��ѕ�еݡ�є�ѕ�е�́���е���������ɍ�͔��Ʌ������ݥ�����́��ȁɽչ������ɑ�ȁ��ɑ�ȵݡ�є�������ձ�����ѽ��(���������������ѽ����
�����젤�����ɥ��5ձѥ����͕���ѕ�=ɑ��̥􁍱���9����ѕ�е������ѕ�еʹ���ԁ��ȁ���е����������ɍ�͔��Ʌ������ݥ���ɽչ�������������ѕ�̵���ѕȁ����Ȉ���屔��쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց����������������������~Z���<�%��ɥ��ȁѽ�Ѐ�퍡����������ѡ�����ѽ��(����������𽑥��(��������𽑥��(��������((������켨����ɕ́�х��Ё�ٕ������ѕ��̀���(�������؁�����9���􉙱�������ȁ���Ё�����Ʌ���(�����������ѽ����
�����젤����͕����ɕMх��Р�Q��̜�􁍱���9������Ё��ĸԁɽչ�����ձ��ѕ�е�́���е���������ɍ�͔��Ʌ������ݥ����Ʌ�ͥѥ�������������ѕ�̵���ѕȁ����ĸԈ���屔�홥��ɕMх��Ѐ���Q��̜���쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց������������������������耜��������쁉����ɽչ�耝ɝ�����԰��԰��԰���Ԥ��������耜�卄ͅ������ɑ��耜����ͽ����ɝ�����԰��԰��԰��Ĥ�����(����������Q��̀�����������9����ѕ�еl����t���ĸԁ����ԁɽչ�����ձ�����屔�홥��ɕMх��Ѐ���Q��̜���쁉����ɽչ�耝ɝ�����������Ȥ����쁉����ɽչ�耝ɝ�����԰��԰��԰���ज������ɑ��̹����ѡ�������(�����������ѽ��(���������MQQUQL�����̀����(��������������Ё��չЀ􁍽չ�	�Mх��С̤(����������������չЀ������������ɕMх��Ѐ���̤�ɕ��ɸ��ձ�(����������ɕ��ɸ��(���������������ѽ��������􁽹
�����젤����͕����ɕMх��С̥􁍱���9������Ё��ĸԁɽչ�����ձ��ѕ�е�́���е���������ɍ�͔��Ʌ������ݥ����Ʌ�ͥѥ�������������ѕ�̵���ѕȁ����ĸԈ���屔�홥��ɕMх��Ѐ���̀��쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց������������������������耜��������쁉����ɽչ�耝ɝ�����԰��԰��԰���Ԥ��������耜�卄ͅ������ɑ��耜����ͽ����ɝ�����԰��԰��԰��Ĥ�����(����������������������������9����ѕ�еl����t���ĸԁ����ԁɽչ�����ձ�����屔�홥��ɕMх��Ѐ���̀��쁉����ɽչ�耝ɝ�����������Ȥ����쁉����ɽչ�耝ɝ�����԰��԰��԰���ज����퍽չ��������(���������������ѽ��(�����������(�����������(������𽑥��((������켨����ɕ́�م���̀���(�������؁�����9����ɽչ����ᰁ��Ё���Ј���屔��쁉����ɽչ�耝ɝ����԰�������ܤ�����ɑ��耜����ͽ����ɝ�����԰��԰��԰���ܤ�����(���������؁�����9���􉙱����ѕ�̵���ѕȁ���ѥ�䵉��ݕ������̈�(������������������9����ѕ�еl����t�����ɍ�͔��Ʌ������ݥ���Ёѕ�е�Ʌ��������е�������~R4����ɕ́�م�������(���������������ѥٕ��ѕ�̀����(���������������ѽ����
������ɕ͕���ѕ��􁍱���9����ѕ�еl����t����е���������ɍ�͔��Ʌ������ݥ�����ȁ��āɽչ�������屔��쁍����耜������������ɽչ�耝ɝ�����ذ�����Ȱ��Ĥ�����ɑ��耜����ͽ����ɝ�����ذ�����Ȱ��̤������rT�Q��Ё����������ѽ��(������������(��������𽑥��(���������؁�����9����ɥ���ɥ�����̴ā���ɥ�����̴ȁ����̈�(����������켨����ɔ���є����(�������������(��������������������9����ѕ�еl����t�ѕ�е�Ʌ���������ɍ�͔��Ʌ������ݥ������Ȉ��~N�C�ɥ������(�������������؁�����9���􉙱����ѕ�̵���ѕȁ����Ȉ�(�����������������Ё����􉑅є��م�Ք�푅ѕ����􁽹
������픀���͕��ѕ���С��хɝ�йم�Ք�􁍱���9���􉙱��ā��́��ĸԁѕ�еݡ�є�ѕ�е�́ɽչ���������ѱ������������屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���ज����ɑ��耜����ͽ����ɝ�����԰��԰��԰���Ԥ��������M�����耝��ɬ�����(�������������������������9����ѕ�е�Ʌ�����ѕ�е�̈��H������(�����������������Ё����􉑅є��م�Ք�푅ѕ��􁽹
������픀���͕��ѕ�����хɝ�йم�Ք�􁍱���9���􉙱��ā��́��ĸԁѕ�еݡ�є�ѕ�е�́ɽչ���������ѱ������������屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���ज����ɑ��耜����ͽ����ɝ�����԰��԰��԰���Ԥ��������M�����耝��ɬ�����(������������𽑥��(����������𽑥��(����������켨����ɔ����х�Ѐ���(�������������(��������������������9����ѕ�еl����t�ѕ�е�Ʌ���������ɍ�͔��Ʌ������ݥ������Ȉ��~J��5��х�Ѐ��
�����(�������������؁�����9���􉙱����ѕ�̵���ѕȁ����Ȉ�(�����������������Ё�����յ��Ȉ�م�Ք�����х��5��􁽹
������픀���͕�5��х��5�����хɝ�йم�Ք��������������5���������9���􉙱��ā��́��ĸԁѕ�еݡ�є�ѕ�е�́ɽչ���������ѱ������������屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���ज����ɑ��耜����ͽ����ɝ�����԰��԰��԰���Ԥ�����(�������������������������9����ѕ�е�Ʌ�����ѕ�е�̈��H������(�����������������Ё�����յ��Ȉ�م�Ք�����х��5��􁽹
������픀���͕�5��х��5�ࡔ�хɝ�йم�Ք��������������5���������9���􉙱��ā��́��ĸԁѕ�еݡ�є�ѕ�е�́ɽչ���������ѱ������������屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���ज����ɑ��耜����ͽ����ɝ�����԰��԰��԰���Ԥ�����(������������𽑥��(����������𽑥��(��������𽑥��(������𽑥��((������켨�	��ɔ����ձх�̀���ɤ�����ѥ��́�ɽ����̀���(�������؁�����9���􉙱����ѕ�̵���ѕȁ���ѥ�䵉��ݕ������́�����Ʌ������Ȉ�(���������؁�����9���􉙱����ѕ�̵���ѕȁ����̈�(����������񱅉��������9���􉙱����ѕ�̵���ѕȁ����ȁ���ͽȵ����ѕȈ�(���������������Ё����􉍡����������������퍡����������Ѡ���􁙥�ѕɕ�=ɑ��̹����Ѡ�������ѕɕ�=ɑ��̹����Ѡ����􁽹
�������ѽ������􁍱���9����ܴЁ��Ё�����е啱��ܴ�������(�����������������������9����ѕ�е�́ѕ�е�Ʌ��������е���������ɍ�͔��Ʌ������ݥ����홥�ѕɕ�=ɑ��̹����ѡ����ձх�홥�ѕɕ�=ɑ��̹����Ѡ���Ā���̜�耜��������(����������𽱅����(����������홥�ѕɕ�=ɑ��̹����Ѡ���������(���������������ѽ����
�����젤�����ɥ��5ձѥ�������ѕɕ�=ɑ��̥􁍱���9����ѕ�е������ѕ�еl����t���́��ĸԁ���е����������ɍ�͔��Ʌ������ݥ���ɽչ�������������ѕ�̵���ѕȁ����Ĉ���屔��쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց����������������������~Z���<�%��ɥ��Ȁ�홥�ѕɕ�=ɑ��̹����ѡ�����ѽ��(������������(��������𽑥��(���������͕���Ёم�Ք���ɥA��􁽹
������픀���͕�QɥA�ȡ��хɝ�йم�Ք�􁍱���9����ѕ�еݡ�є�ѕ�еl����t����е�������́��ĸԁɽչ���������ѱ������������屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���ܤ�����ɑ��耜����ͽ����ɝ�����԰��԰��԰���Ȥ�����(������������ѥ���م�Ք􉑅є���͌���є��L�������Ф��ѥ���(������������ѥ���م�Ք􉑅є��͌���є��D�����������ѥ���(������������ѥ���م�Ք􉵽�х�е��͌��5��х�Ѓ�L��ѥ���(������������ѥ���م�Ք􉵽�х�е�͌��5��х�Ѓ�D��ѥ���(���������͕�����(������𽑥��((������켨�1��є���������̀���(�������؁�����9�����������Ȉ�(��������홥�ѕɕ�=ɑ��̹����Ѡ����������(�����������؁�����9����ѕ�е���ѕȁ���Ȉ�(�������������؁�����9����ѕ�д�ᰁ���̈��~R4𽑥��(��������������������9����ѕ�е�Ʌ��������е�����ѕ�еʹ�����ɍ�͔��Ʌ������ݥ������Ĉ�Սչ�������������(��������������������9����ѕ�е�Ʌ�����ѕ�е�̈��ͅ�聐���������ɝ�ȁٽ́����ɕ����(�����������������ѥٕ��ѕ�̀������ѽ����
������ɕ͕���ѕ��􁍱���9����дЁѕ�е�́���е���������ɍ�͔��Ʌ������ݥ�����Ё��ȁɽչ����������屔��쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց������������������������耜��������������ȁ��́����ɕ����ѽ���(����������𽑥��(����������(��������홥�ѕɕ�=ɑ��̹�����ɑ�Ȁ����(��������������Ёѽх��􁝕�Q�х���ɑ�Ȥ(��������������Ё��
�������􁍡����������Ց�̡�ɑ�ȹ���(��������������Ё����
�������􁍡�����%�����ɑ�ȹ��(����������ɕ��ɸ��(�������������؁������ɑ�ȹ��􁍱���9����ɽչ����ᰁ��Ё�Ʌ�ͥѥ����������屔��쁉����ɽչ�聩���
����������ɝ����а��ܰ�а���ؤ��聥�
����������ɝ�����ذ�����Ȱ���ज�耝ɝ����԰��������Ԥ�����ɑ��聩���
��������������ͽ����ɝ����а��ܰ�а��Ф��聥�
��������������ͽ����ɝ�����ذ�����Ȱ��Ф��耜����ͽ����ɝ�����԰��԰��԰���ܤ�����(���������������؁�����9���􉙱����ѕ�̵�х�Ё����̈�(�������������������Ё����􉍡�������������������
������􁽹
������젤����ѽ����
������ɑ�ȹ���􁍱���9����ܴЁ��Ё�����е啱��ܴ��������͡ɥ������дĈ���(����������������켨�%���́������������(�����������������؁�����9���􉙱��ā����ܴ�����ͽȵ����ѕȈ���
�����젤����͕�M����ѕ���ɑ�ȹ�����(�������������������؁�����9���􉙱����ѕ�̵���ѕȁ����ȁ���ā�����Ʌ���(�������������������������������9����ѕ�еݡ�є����е������ѕ�еʹ����ɑ�ȹ���������(�������������������������������9����ѕ�еl����t����е�������ȁ����ԁɽչ�����ձ������ɍ�͔��Ʌ������ݥ������屔���х���M�屔��ɑ�ȹ�х��̥����ɑ�ȹ�х����������(�������������������������������9����ѕ�е�Ʌ�����ѕ�еl����t����ɑ�ȹ��ѕ���������(������������������𽑥��(��������������������������9����ѕ�е�Ʌ�����ѕ�е�̈���ɑ�ȹ�����й��������ɑ�ȹ�����й٥�������(��������������������������9����ѕ�е�Ʌ�����ѕ�е�́�д��ԁ��չ��є����ɑ�ȹ�ɽ�ե�̹������������������������������(����������������𽑥��(����������������켨�
��������ɽ�є聵��х�Ѐ����ѥ��̀���(�����������������؁�����9���􉙱��͡ɥ�������������്����ѕ�̵��������Ȉ�(��������������������������9���􉙽�е������ѕ�е��͔����屔��쁍����耜�����������ѽх��
����(������������������켨�
��������Ё�х��Ё����������(�������������������͕����(��������������������م�Ք���ɑ�ȹ�х����(����������������������
������픀���쁔��ѽ�Aɽ����ѥ���������ѕMх��С�ɑ�ȹ������хɝ�йم�Ք����(����������������������
�����픀������ѽ�Aɽ����ѥ�����(�������������������������9����ѕ�еl����t����е�������ȁ��āɽչ���������ѱ������������ͽȵ����ѕȈ(����������������������屔��쁉����ɽչ�耝ɝ�����԰��԰��԰���ܤ�����ɑ��耜����ͽ����ɝ�����԰��԰��԰���Ԥ��������耜��Քݕ�����(�������������������(���������������������MQQUQL�����̀�����ѥ����������م�Ք����������ѥ�����(�������������������͕�����(���������������������ѽ����
�����픀���쁔��ѽ�Aɽ����ѥ������ɥ��5ձѥ����m�ɑ��t���􁍱���9����ѕ�еl����t����е�������́��āɽչ��������ɍ�͔��Ʌ������ݥ���ѕ�е���������屔��쁉����ɽչ�耝�����ȵ�Ʌ����Р��Ց����������������������~Z���<�	�ɑ�ɕ�����ѽ��(����������������𽑥��(��������������𽑥��(
