'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

var mockOrdersInit = [
  { id: 'CMD-001', client: 'Karim B.', email: 'karim@email.com', produit: 'Lot Premium Nike/Adidas', montant: '189€', date: '2026-03-15', statut: 'a_expedier' },
  { id: 'CMD-002', client: 'Sarah M.', email: 'sarah@email.com', produit: 'Lot Basic Multi-marques', montant: '129€', date: '2026-03-14', statut: 'expedie' },
  { id: 'CMD-003', client: 'Thomas L.', email: 'thomas@email.com', produit: 'Lot Luxury', montant: '349€', date: '2026-03-13', statut: 'livre' },
  { id: 'CMD-004', client: 'Marie D.', email: 'marie@email.com', produit: 'Lot Premium Nike/Adidas', montant: '189€', date: '2026-03-12', statut: 'a_expedier' },
  { id: 'CMD-005', client: 'Lucas P.', email: 'lucas@email.com', produit: 'Lot Basic Multi-marques', montant: '129€', date: '2026-03-11', statut: 'expedie' },
]

var mockClients = [
  { id: 1, nom: 'Karim B.', email: 'karim@email.com', commandes: 3, total: '567€', date: '2026-01-10' },
  { id: 2, nom: 'Sarah M.', email: 'sarah@email.com', commandes: 2, total: '318€', date: '2026-01-15' },
  { id: 3, nom: 'Thomas L.', email: 'thomas@email.com', commandes: 1, total: '349€', date: '2026-02-03' },
  { id: 4, nom: 'Marie D.', email: 'marie@email.com', commandes: 4, total: '756€', date: '2026-02-14' },
  { id: 5, nom: 'Lucas P.', email: 'lucas@email.com', commandes: 2, total: '258€', date: '2026-03-01' },
]

function statutLabel(s) {
  if (s === 'a_expedier') return { label: 'A expédier', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' }
  if (s === 'expedie') return { label: 'Expédié', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' }
  if (s === 'livre') return { label: 'Livré', color: '#10b981', bg: 'rgba(16,185,129,0.15)' }
  return { label: s, color: '#888', bg: 'rgba(136,136,136,0.15)' }
}

function buildBordereauHTML(order) {
  return '<html><head><style>' +
    'body{font-family:Arial,sans-serif;padding:40px;color:#111;}' +
    'h1{font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;}' +
    '.badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;background:#f59e0b;color:#000;margin-bottom:24px;}' +
    'table{width:100%;border-collapse:collapse;margin-top:16px;}' +
    'td{padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;}' +
    'td:first-child{color:#666;font-weight:600;width:40%;}' +
    '</style></head><body>' +
    '<h1>ACA Wholesale</h1>' +
    '<div class="badge">Bordereau de commande</div>' +
    '<table>' +
    '<tr><td>N° Commande</td><td>' + order.id + '</td></tr>' +
    '<tr><td>Client</td><td>' + order.client + '</td></tr>' +
    '<tr><td>Email</td><td>' + order.email + '</td></tr>' +
    '<tr><td>Produit</td><td>' + order.produit + '</td></tr>' +
    '<tr><td>Montant</td><td>' + order.montant + '</td></tr>' +
    '<tr><td>Date</td><td>' + order.date + '</td></tr>' +
    '<tr><td>Statut</td><td>' + statutLabel(order.statut).label + '</td></tr>' +
    '</table></body></html>'
}

function printOrder(order) {
  var w = window.open('', '_blank')
  w.document.write(buildBordereauHTML(order))
  w.document.close()
  w.print()
}

function printMultiple(orders) {
  var html = '<html><head><style>' +
    'body{font-family:Arial,sans-serif;padding:40px;color:#111;}' +
    'h1{font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;}' +
    '.page{page-break-after:always;margin-bottom:40px;}' +
    '.badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;background:#f59e0b;color:#000;margin-bottom:24px;}' +
    'table{width:100%;border-collapse:collapse;margin-top:16px;}' +
    'td{padding:10px 12px;border-bottom:1px solid #eee;font-size:14px;}' +
    'td:first-child{color:#666;font-weight:600;width:40%;}' +
    '</style></head><body>'
  for (var i = 0; i < orders.length; i++) {
    var o = orders[i]
    html += '<div class="page">' +
      '<h1>ACA Wholesale</h1>' +
      '<div class="badge">Bordereau de commande</div>' +
      '<table>' +
      '<tr><td>N° Commande</td><td>' + o.id + '</td></tr>' +
      '<tr><td>Client</td><td>' + o.client + '</td></tr>' +
      '<tr><td>Email</td><td>' + o.email + '</td></tr>' +
      '<tr><td>Produit</td><td>' + o.produit + '</td></tr>' +
      '<tr><td>Montant</td><td>' + o.montant + '</td></tr>' +
      '<tr><td>Date</td><td>' + o.date + '</td></tr>' +
      '<tr><td>Statut</td><td>' + statutLabel(o.statut).label + '</td></tr>' +
      '</table></div>'
  }
  html += '</body></html>'
  var w = window.open('', '_blank')
  w.document.write(html)
  w.document.close()
  w.print()
}

function PremiumLock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' }}>
      <div style={{ fontSize: '48px' }}>🔒</div>
      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Fonctionnalité Premium</h2>
      <p style={{ color: '#555', fontSize: '14px', textAlign: 'center', maxWidth: '300px' }}>Cette section est réservée aux abonnements premium.</p>
    </div>
  )
}

function CommandesTab({ orders, setOrders }) {
  var sel = useState([])
  var selected = sel[0]
  var setSelected = sel[1]
  var bc = useState(false)
  var bulkConfirm = bc[0]
  var setBulkConfirm = bc[1]

  function toggleSelect(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter(function(x) { return x !== id }))
    } else {
      setSelected(selected.concat([id]))
    }
  }

  function toggleAll() {
    if (selected.length === orders.length) {
      setSelected([])
    } else {
      setSelected(orders.map(function(o) { return o.id }))
    }
  }

  function changeStatut(id, newStatut) {
    setOrders(orders.map(function(o) {
      return o.id === id ? Object.assign({}, o, { statut: newStatut }) : o
    }))
  }

  function bulkChangeStatut(newStatut) {
    setOrders(orders.map(function(o) {
      return selected.includes(o.id) ? Object.assign({}, o, { statut: newStatut }) : o
    }))
    setBulkConfirm(true)
    setTimeout(function() {
      setBulkConfirm(false)
      setSelected([])
    }, 1500)
  }

  var selectedOrders = orders.filter(function(o) { return selected.includes(o.id) })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Commandes ({orders.length})</h2>
        <button
          onClick={function() { printMultiple(orders) }}
          style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
        >
          Imprimer tous ({orders.length})
        </button>
      </div>

      {selected.length > 0 && (
        <div style={{ background: 'rgba(196,150,42,0.15)', border: '1px solid rgba(196,150,42,0.4)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ color: '#E8B84B', fontWeight: 700, fontSize: '13px' }}>{selected.length} sélectionné(s)</span>
          {bulkConfirm ? (
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>Statut mis à jour !</span>
          ) : (
            <>
              <button onClick={function() { bulkChangeStatut('a_expedier') }} style={{ padding: '6px 12px', background: 'rgba(245,158,11,0.2)', border: '1px solid #f59e0b', borderRadius: '6px', color: '#f59e0b', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}>A expédier</button>
              <button onClick={function() { bulkChangeStatut('expedie') }} style={{ padding: '6px 12px', background: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6', borderRadius: '6px', color: '#3b82f6', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}>Expédié</button>
              <button onClick={function() { bulkChangeStatut('livre') }} style={{ padding: '6px 12px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', borderRadius: '6px', color: '#10b981', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}>Livré</button>
              <button onClick={function() { printMultiple(selectedOrders) }} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 700 }}>Imprimer ({selected.length})</button>
            </>
          )}
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>
                <input type="checkbox" checked={selected.length === orders.length} onChange={toggleAll} />
              </th>
              {['Commande', 'Client', 'Produit', 'Montant', 'Date', 'Statut', 'Actions'].map(function(h) {
                return <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#666', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {orders.map(function(order) {
              var s = statutLabel(order.statut)
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: selected.includes(order.id) ? 'rgba(196,150,42,0.05)' : 'transparent' }}>
                  <td style={{ padding: '12px' }}>
                    <input type="checkbox" checked={selected.includes(order.id)} onChange={function() { toggleSelect(order.id) }} />
                  </td>
                  <td style={{ padding: '12px', color: '#C4962A', fontWeight: 700, fontSize: '13px' }}>{order.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{order.client}</div>
                    <div style={{ color: '#555', fontSize: '11px' }}>{order.email}</div>
                  </td>
                  <td style={{ padding: '12px', color: '#ccc', fontSize: '13px' }}>{order.produit}</td>
                  <td style={{ padding: '12px', color: '#fff', fontWeight: 700, fontSize: '13px' }}>{order.montant}</td>
                  <td style={{ padding: '12px', color: '#888', fontSize: '12px' }}>{order.date}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={order.statut}
                      onChange={function(e) { changeStatut(order.id, e.target.value) }}
                      style={{ background: s.bg, border: '1px solid ' + s.color, borderRadius: '6px', color: s.color, fontSize: '12px', fontWeight: 700, padding: '4px 8px', cursor: 'pointer', outline: 'none' }}
                    >
                      <option value="a_expedier">A expédier</option>
                      <option value="expedie">Expédié</option>
                      <option value="livre">Livré</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={function() { printOrder(order) }}
                      style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#888', fontSize: '12px', padding: '4px 10px', cursor: 'pointer' }}
                    >
                      Imprimer
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ClientsTab() {
  return (
    <div>
      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px 0' }}>Clients ({mockClients.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {['Nom', 'Email', 'Commandes', 'Total', 'Client depuis'].map(function(h) {
                return <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#666', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {mockClients.map(function(client) {
              return (
                <tr key={client.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '13px' }}>
                        {client.nom.charAt(0)}
                      </div>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{client.nom}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: '#888', fontSize: '13px' }}>{client.email}</td>
                  <td style={{ padding: '12px', color: '#C4962A', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{client.commandes}</td>
                  <td style={{ padding: '12px', color: '#fff', fontWeight: 700, fontSize: '13px' }}>{client.total}</td>
                  <td style={{ padding: '12px', color: '#888', fontSize: '12px' }}>{client.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminPage() {
  var tabState = useState('commandes')
  var activeTab = tabState[0]
  var setActiveTab = tabState[1]

  var ordersState = useState(mockOrdersInit)
  var orders = ordersState[0]
  var setOrders = ordersState[1]

  var navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'commandes', label: 'Commandes', icon: '📦' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'campagne', label: 'Campagne', icon: '📣' },
    { id: 'articles', label: 'Articles', icon: '📝' },
  ]

  var aExpedier = orders.filter(function(o) { return o.statut === 'a_expedier' }).length
  var expedie = orders.filter(function(o) { return o.statut === 'expedie' }).length
  var livre = orders.filter(function(o) { return o.statut === 'livre' }).length
  var totalCA = orders.reduce(function(acc, o) { return acc + parseInt(o.montant) }, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '220px', background: '#111', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', marginBottom: '32px' }}>
          <span style={{ background: '#fff', color: '#000', padding: '4px 8px', fontWeight: 900, fontSize: '14px', borderRadius: '4px 0 0 4px' }}>AC</span>
          <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '4px 6px', fontWeight: 900, fontSize: '14px', borderRadius: '0 4px 4px 0' }}>A</span>
          <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin</span>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(function(item) {
            return (
              <button
                key={item.id}
                onClick={function() { setActiveTab(item.id) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 20px', background: activeTab === item.id ? 'rgba(196,150,42,0.15)' : 'transparent',
                  border: 'none', borderLeft: activeTab === item.id ? '3px solid #C4962A' : '3px solid transparent',
                  color: activeTab === item.id ? '#E8B84B' : '#666', fontSize: '13px', fontWeight: activeTab === item.id ? 700 : 500,
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button
            onClick={function() { window.location.href = '/admin/login' }}
            style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#555', fontSize: '12px', cursor: 'pointer' }}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>

        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px 0' }}>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Chiffre d\'affaires', value: totalCA + '€', color: '#C4962A' },
                { label: 'Commandes totales', value: orders.length, color: '#3b82f6' },
                { label: 'A expédier', value: aExpedier, color: '#f59e0b' },
                { label: 'Expédiées', value: expedie, color: '#3b82f6' },
                { label: 'Livrées', value: livre, color: '#10b981' },
              ].map(function(stat) {
                return (
                  <div key={stat.label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ color: stat.color, fontWeight: 900, fontSize: '28px', marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ color: '#666', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'commandes' && (
          <CommandesTab orders={orders} setOrders={setOrders} />
        )}

        {activeTab === 'clients' && (
          <ClientsTab />
        )}

        {activeTab === 'campagne' && <PremiumLock />}
        {activeTab === 'articles' && <PremiumLock />}

      </div>
    </div>
  )
}
