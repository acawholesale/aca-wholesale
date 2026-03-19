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
      <p style={{ color: '#555', fontSize: '14px', textAlign: 'center', maxWidth: '300px' }}>Cette section est réservée aux abonnements premium
