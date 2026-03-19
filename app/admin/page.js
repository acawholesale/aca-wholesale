'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

var mockOrdersInit = [
  { id: 'CMD-001', client: 'Karim B.', email: 'karim@email.com', produit: 'Lot Premium Nike/Adidas', montant: '189', date: '2026-03-15', statut: 'a_expedier' },
  { id: 'CMD-002', client: 'Sarah M.', email: 'sarah@email.com', produit: 'Lot Basic Multi-marques', montant: '129', date: '2026-03-14', statut: 'expedie' },
  { id: 'CMD-003', client: 'Thomas L.', email: 'thomas@email.com', produit: 'Lot Luxury', montant: '349', date: '2026-03-13', statut: 'livre' },
  { id: 'CMD-004', client: 'Marie D.', email: 'marie@email.com', produit: 'Lot Premium Nike/Adidas', montant: '189', date: '2026-03-12', statut: 'a_expedier' },
  { id: 'CMD-005', client: 'Lucas P.', email: 'lucas@email.com', produit: 'Lot Basic Multi-marques', montant: '129', date: '2026-03-11', statut: 'expedie' },
]

var mockClients = [
  { id: 1, nom: 'Karim B.', email: 'karim@email.com', commandes: 3, total: '567', date: '2026-01-10' },
  { id: 2, nom: 'Sarah M.', email: 'sarah@email.com', commandes: 2, total: '318', date: '2026-01-15' },
  { id: 3, nom: 'Thomas L.', email: 'thomas@email.com', commandes: 1, total: '349', date: '2026-02-03' },
  { id: 4, nom: 'Marie D.', email: 'marie@email.com', commandes: 4, total: '756', date: '2026-02-14' },
  { id: 5, nom: 'Lucas P.', email: 'lucas@email.com', commandes: 2, total: '258', date: '2026-03-01' },
]

function statutLabel(s) {
  if (s === 'a_expedier') return { label: 'A expedier', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' }
  if (s === 'expedie') return { label: 'Expedie', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' }
  if (s === 'livre') return { label: 'Livre', color: '#10b981', bg: 'rgba(16,185,129,0.15)' }
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
    '<tr><td>N Commande</td><td>' + order.id + '</td></tr>' +
    '<tr><td>Client</td><td>' + order.client + '</td></tr>' +
    '<tr><td>Email</td><td>' + order.email + '</td></tr>' +
    '<tr><td>Produit</td><td>' + order.produit + '</td></tr>' +
    '<tr><td>Montant</td><td>' + order.montant + 'EUR</td></tr>' +
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
      '<tr><td>N Commande</td><td>' + o.id + '</td></tr>' +
      '<tr><td>Client</td><td>' + o.client + '</td></tr>' +
      '<tr><td>Email</td><td>' + o.email + '</td></tr>' +
      '<tr><td>Produit</td><td>' + o.produit + '</td></tr>' +
      '<tr><td>Montant</td><td>' + o.montant + 'EUR</td></tr>' +
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
      <div style={{ fontSize: '48px' }}>&#128274;</div>
      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Fonctionnalite Premium</h2>
      <p style={{ color: '#555', fontSize: '14px', textAlign: 'center', maxWidth: '300px' }}>Cette section est reservee aux abonnements premium.</p>
    </div>
  )
}

function CommandesTab({ orders, setOrders, isMobile }) {
  var sel = useState([])
  var selected = sel[0]
  var setSelected = sel[1]

  var bc = useState(false)
  var bulkConfirm = bc[0]
  var setBulkConfirm = bc[1]

  var fs = useState('tous')
  var filterStatut = fs[0]
  var setFilterStatut = fs[1]

  var fd = useState('')
  var filterDateDebut = fd[0]
  var setFilterDateDebut = fd[1]

  var ff = useState('')
  var filterDateFin = ff[0]
  var setFilterDateFin = ff[1]

  function toggleSelect(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter(function(x) { return x !== id }))
    } else {
      setSelected(selected.concat([id]))
    }
  }

  function toggleAll() {
    if (selected.length === filtered.length) {
      setSelected([])
    } else {
      setSelected(filtered.map(function(o) { return o.id }))
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

  function resetFilters() {
    setFilterStatut('tous')
    setFilterDateDebut('')
    setFilterDateFin('')
    setSelected([])
  }

  var filtered = orders.filter(function(o) {
    if (filterStatut !== 'tous' && o.statut !== filterStatut) return false
    if (filterDateDebut && o.date < filterDateDebut) return false
    if (filterDateFin && o.date > filterDateFin) return false
    return true
  })

  var aExpedierOrders = orders.filter(function(o) { return o.statut === 'a_expedier' })
  var selectedOrders = orders.filter(function(o) { return selected.includes(o.id) })
  var hasFilters = filterStatut !== 'tous' || filterDateDebut !== '' || filterDateFin !== ''

  return (
    <div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', marginBottom: '16px', gap: '12px' }}>
        <h2 style={{ color: '#fff', fontWeight: 900, fontSize: isMobile ? '16px' : '18px', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
          Commandes
          <span style={{ marginLeft: '8px', background: 'rgba(255,255,255,0.08)', color: '#888', fontSize: '12px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px' }}>{filtered.length}/{orders.length}</span>
        </h2>
        <button
          onClick={function() { if (aExpedierOrders.length > 0) printMultiple(aExpedierOrders) }}
          disabled={aExpedierOrders.length === 0}
          style={{ padding: '9px 14px', background: aExpedierOrders.length > 0 ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.04)', border: '1px solid ' + (aExpedierOrders.length > 0 ? '#f59e0b' : 'rgba(255,255,255,0.1)'), borderRadius: '8px', color: aExpedierOrders.length > 0 ? '#f59e0b' : '#444', fontSize: '12px', fontWeight: 700, cursor: aExpedierOrders.length > 0 ? 'pointer' : 'default', width: isMobile ? '100%' : 'auto' }}
        >
          &#128230; Imprimer a expedier ({aExpedierOrders.length})
        </button>
      </div>

      {/* Filtres */}
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: isMobile ? '12px' : '16px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ color: '#888', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Filtres</span>
          {hasFilters && (
            <button onClick={resetFilters} style={{ background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: '6px', color: '#f87171', fontSize: '11px', fontWeight: 700, padding: '2px 10px', cursor: 'pointer' }}>
              Reinitialiser
            </button>
          )}
        </div>

        {/* Boutons statut */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
          {[
            { value: 'tous', label: 'Tous', color: '#888', bg: 'rgba(255,255,255,0.07)' },
            { value: 'a_expedier', label: 'A expedier', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
            { value: 'expedie', label: 'Expedie', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
            { value: 'livre', label: 'Livre', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
          ].map(function(opt) {
            var isActive = filterStatut === opt.value
            var count = opt.value === 'tous' ? orders.length : orders.filter(function(o) { return o.statut === opt.value }).length
            return (
              <button
                key={opt.value}
                onClick={function() { setFilterStatut(opt.value); setSelected([]) }}
                style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: isActive ? opt.bg : 'transparent', border: '1px solid ' + (isActive ? opt.color : 'rgba(255,255,255,0.1)'), color: isActive ? opt.color : '#555' }}
              >
                {opt.label} ({count})
              </button>
            )
          })}
        </div>

        {/* Filtres date */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#555', fontSize: '12px', fontWeight: 600 }}>Du</span>
          <input type="date" value={filterDateDebut} onChange={function(e) { setFilterDateDebut(e.target.value); setSelected([]) }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#ccc', fontSize: '12px', padding: '5px 8px', outline: 'none', colorScheme: 'dark', flex: isMobile ? '1' : 'none' }} />
          <span style={{ color: '#555', fontSize: '12px', fontWeight: 600 }}>au</span>
          <input type="date" value={filterDateFin} onChange={function(e) { setFilterDateFin(e.target.value); setSelected([]) }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#ccc', fontSize: '12px', padding: '5px 8px', outline: 'none', colorScheme: 'dark', flex: isMobile ? '1' : 'none' }} />
        </div>
      </div>

      {/* Actions groupees */}
      {selected.length > 0 && (
        <div style={{ background: 'rgba(196,150,42,0.1)', border: '1px solid rgba(196,150,42,0.35)', borderRadius: '8px', padding: '10px 14px', marginBottom: '10px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#E8B84B', fontWeight: 700, fontSize: '13px' }}>{selected.length} sel.</span>
          {bulkConfirm ? (
            <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>Mis a jour !</span>
          ) : (
            <>
              <button onClick={function() { bulkChangeStatut('a_expedier') }} style={{ padding: '5px 10px', background: 'rgba(245,158,11,0.2)', border: '1px solid #f59e0b', borderRadius: '6px', color: '#f59e0b', fontSize: '11px', cursor: 'pointer', fontWeight: 700 }}>A expedier</button>
              <button onClick={function() { bulkChangeStatut('expedie') }} style={{ padding: '5px 10px', background: 'rgba(59,130,246,0.2)', border: '1px solid #3b82f6', borderRadius: '6px', color: '#3b82f6', fontSize: '11px', cursor: 'pointer', fontWeight: 700 }}>Expedie</button>
              <button onClick={function() { bulkChangeStatut('livre') }} style={{ padding: '5px 10px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', borderRadius: '6px', color: '#10b981', fontSize: '11px', cursor: 'pointer', fontWeight: 700 }}>Livre</button>
              <button onClick={function() { printMultiple(selectedOrders) }} style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#ccc', fontSize: '11px', cursor: 'pointer', fontWeight: 700 }}>Imprimer ({selected.length})</button>
            </>
          )}
        </div>
      )}

      {/* Vue mobile : cartes */}
      {isMobile ? (
        filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>&#128269;</div>
            <div style={{ fontSize: '13px' }}>Aucune commande</div>
            <button onClick={resetFilters} style={{ marginTop: '10px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#666', fontSize: '12px', padding: '6px 14px', cursor: 'pointer' }}>Reinitialiser</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(function(order) {
              var s = statutLabel(order.statut)
              var isSelected = selected.includes(order.id)
              return (
                <div
                  key={order.id}
                  style={{ background: isSelected ? 'rgba(196,150,42,0.08)' : '#111', border: '1px solid ' + (isSelected ? 'rgba(196,150,42,0.4)' : 'rgba(255,255,255,0.07)'), borderRadius: '10px', padding: '14px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" checked={isSelected} onChange={function() { toggleSelect(order.id) }} style={{ cursor: 'pointer' }} />
                      <span style={{ color: '#C4962A', fontWeight: 700, fontSize: '13px' }}>{order.id}</span>
                    </div>
                    <span style={{ background: s.bg, border: '1px solid ' + s.color, borderRadius: '6px', color: s.color, fontSize: '11px', fontWeight: 700, padding: '3px 8px' }}>{s.label}</span>
                  </div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px', marginBottom: '2px' }}>{order.client}</div>
                  <div style={{ color: '#555', fontSize: '11px', marginBottom: '8px' }}>{order.email}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ color: '#ccc', fontSize: '12px' }}>{order.produit}</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>{order.montant}EUR</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#555', fontSize: '11px' }}>{order.date}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <select
                        value={order.statut}
                        onChange={function(e) { changeStatut(order.id, e.target.value) }}
                        style={{ background: s.bg, border: '1px solid ' + s.color, borderRadius: '6px', color: s.color, fontSize: '11px', fontWeight: 700, padding: '4px 6px', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="a_expedier">A expedier</option>
                        <option value="expedie">Expedie</option>
                        <option value="livre">Livre</option>
                      </select>
                      <button
                        onClick={function() { printOrder(order) }}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#888', fontSize: '11px', padding: '4px 10px', cursor: 'pointer' }}
                      >
                        Bordereau
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      ) : (
        /* Vue desktop : tableau */
        filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#444' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#128269;</div>
            <div style={{ fontSize: '14px' }}>Aucune commande</div>
            <button onClick={resetFilters} style={{ marginTop: '12px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#666', fontSize: '12px', padding: '6px 16px', cursor: 'pointer' }}>Reinitialiser</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', width: '36px' }}>
                    <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                  </th>
                  {['Commande', 'Client', 'Produit', 'Montant', 'Date', 'Statut', 'Actions'].map(function(h) {
                    return <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                  })}
                </tr>
              </thead>
              <tbody>
                {filtered.map(function(order) {
                  var s = statutLabel(order.statut)
                  var isSelected = selected.includes(order.id)
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: isSelected ? 'rgba(196,150,42,0.06)' : 'transparent' }}>
                      <td style={{ padding: '12px' }}>
                        <input type="checkbox" checked={isSelected} onChange={function() { toggleSelect(order.id) }} style={{ cursor: 'pointer' }} />
                      </td>
                      <td style={{ padding: '12px', color: '#C4962A', fontWeight: 700, fontSize: '13px' }}>{order.id}</td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{order.client}</div>
                        <div style={{ color: '#555', fontSize: '11px' }}>{order.email}</div>
                      </td>
                      <td style={{ padding: '12px', color: '#ccc', fontSize: '13px' }}>{order.produit}</td>
                      <td style={{ padding: '12px', color: '#fff', fontWeight: 700, fontSize: '13px' }}>{order.montant}EUR</td>
                      <td style={{ padding: '12px', color: '#888', fontSize: '12px' }}>{order.date}</td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={order.statut}
                          onChange={function(e) { changeStatut(order.id, e.target.value) }}
                          style={{ background: s.bg, border: '1px solid ' + s.color, borderRadius: '6px', color: s.color, fontSize: '12px', fontWeight: 700, padding: '5px 10px', cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="a_expedier">A expedier</option>
                          <option value="expedie">Expedie</option>
                          <option value="livre">Livre</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={function() { printOrder(order) }}
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#888', fontSize: '12px', padding: '5px 12px', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Bordereau
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  )
}

function ClientsTab({ isMobile }) {
  return (
    <div>
      <h2 style={{ color: '#fff', fontWeight: 900, fontSize: isMobile ? '16px' : '18px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 20px 0' }}>Clients ({mockClients.length})</h2>
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockClients.map(function(client) {
            return (
              <div key={client.id} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #C4962A, #E8B84B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '14px', flexShrink: 0 }}>
                  {client.nom.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{client.nom}</div>
                  <div style={{ color: '#555', fontSize: '11px', marginBottom: '4px' }}>{client.email}</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: '#C4962A', fontWeight: 700, fontSize: '12px' }}>{client.commandes} cmd</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '12px' }}>{client.total}EUR</span>
                    <span style={{ color: '#555', fontSize: '11px' }}>Depuis {client.date}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Nom', 'Email', 'Commandes', 'Total', 'Client depuis'].map(function(h) {
                  return <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#555', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
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
                    <td style={{ padding: '12px', color: '#fff', fontWeight: 700, fontSize: '13px' }}>{client.total}EUR</td>
                    <td style={{ padding: '12px', color: '#888', fontSize: '12px' }}>{client.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  /* Auth check : redirige vers login si pas authentifie */
  var authCheck = useState(function() {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('aca_admin_auth') === '1'
    }
    return false
  })
  var isAuth = authCheck[0]

  if (typeof window !== 'undefined' && !isAuth) {
    window.location.href = '/admin/login'
    return null
  }

  /* Detection mobile */
  var mobileCheck = useState(function() {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })
  var isMobile = mobileCheck[0]

  var tabState = useState('commandes')
  var activeTab = tabState[0]
  var setActiveTab = tabState[1]

  var sidebarState = useState(!isMobile)
  var sidebarOpen = sidebarState[0]
  var setSidebarOpen = sidebarState[1]

  var ordersState = useState(mockOrdersInit)
  var orders = ordersState[0]
  var setOrders = ordersState[1]

  var navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '&#128202;' },
    { id: 'commandes', label: 'Commandes', icon: '&#128230;' },
    { id: 'clients', label: 'Clients', icon: '&#128101;' },
    { id: 'campagne', label: 'Campagne', icon: '&#128227;' },
    { id: 'articles', label: 'Articles', icon: '&#128221;' },
  ]

  var aExpedier = orders.filter(function(o) { return o.statut === 'a_expedier' }).length
  var expedie = orders.filter(function(o) { return o.statut === 'expedie' }).length
  var livre = orders.filter(function(o) { return o.statut === 'livre' }).length
  var totalCA = orders.reduce(function(acc, o) { return acc + parseInt(o.montant) }, 0)

  function handleNav(id) {
    setActiveTab(id)
    if (isMobile) setSidebarOpen(false)
  }

  function handleDeconnexion() {
    sessionStorage.removeItem('aca_admin_auth')
    window.location.href = '/admin/login'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', position: 'relative' }}>

      {/* Overlay mobile quand sidebar ouverte */}
      {isMobile && sidebarOpen && (
        <div
          onClick={function() { setSidebarOpen(false) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#111',
        borderRight: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        flexShrink: 0,
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        height: isMobile ? '100vh' : 'auto',
        zIndex: 50,
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.25s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', marginBottom: '32px' }}>
          <span style={{ background: '#fff', color: '#000', padding: '4px 8px', fontWeight: 900, fontSize: '14px', borderRadius: '4px 0 0 4px' }}>AC</span>
          <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '4px 6px', fontWeight: 900, fontSize: '14px', borderRadius: '0 4px 4px 0' }}>A</span>
          <span style={{ color: '#C4962A', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin</span>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(function(item) {
            var isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={function() { handleNav(item.id) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 20px',
                  background: isActive ? 'rgba(196,150,42,0.15)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #C4962A' : '3px solid transparent',
                  color: isActive ? '#E8B84B' : '#555',
                  fontSize: '13px', fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span>{item.label}</span>
                {item.id === 'commandes' && aExpedier > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#f59e0b', color: '#000', borderRadius: '10px', fontSize: '10px', fontWeight: 900, padding: '1px 7px' }}>{aExpedier}</span>
                )}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button
            onClick={handleDeconnexion}
            style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', color: '#444', fontSize: '12px', cursor: 'pointer' }}
          >
            Deconnexion
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, padding: isMobile ? '16px' : '32px', overflowY: 'auto', minWidth: 0 }}>

        {/* Barre top mobile */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button
              onClick={function() { setSidebarOpen(true) }}
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '18px', padding: '8px 12px', cursor: 'pointer', lineHeight: 1 }}
            >
              &#9776;
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#fff', color: '#000', padding: '3px 6px', fontWeight: 900, fontSize: '12px', borderRadius: '4px 0 0 4px' }}>AC</span>
              <span style={{ background: 'linear-gradient(135deg, #C4962A, #E8B84B)', color: '#fff', padding: '3px 5px', fontWeight: 900, fontSize: '12px', borderRadius: '0 4px 4px 0' }}>A</span>
            </div>
            <div style={{ width: '42px' }} />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: isMobile ? '16px' : '18px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 20px 0' }}>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Chiffre affaires', value: totalCA + 'EUR', color: '#C4962A' },
                { label: 'Commandes', value: orders.length, color: '#3b82f6' },
                { label: 'A expedier', value: aExpedier, color: '#f59e0b' },
                { label: 'Expedies', value: expedie, color: '#3b82f6' },
                { label: 'Livres', value: livre, color: '#10b981' },
              ].map(function(stat) {
                return (
                  <div key={stat.label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: isMobile ? '14px' : '20px' }}>
                    <div style={{ color: stat.color, fontWeight: 900, fontSize: isMobile ? '22px' : '28px', marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{ color: '#555', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'commandes' && (
          <CommandesTab orders={orders} setOrders={setOrders} isMobile={isMobile} />
        )}

        {activeTab === 'clients' && (
          <ClientsTab isMobile={isMobile} />
        )}

        {activeTab === 'campagne' && <PremiumLock />}
        {activeTab === 'articles' && <PremiumLock />}

      </div>
    </div>
  )
}
