export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../lib/adminAuth'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('id')
  const customerEmail = searchParams.get('email')

  if (!orderId) {
    return NextResponse.json({ error: 'id required' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error || !order) {
    return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
  }

  const admin = verifyAdmin(req)
  const isOwner = customerEmail && order.email && customerEmail.toLowerCase() === order.email.toLowerCase()
  if (!admin.authenticated && !isOwner) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  let items = []
  try { items = JSON.parse(order.items_json || '[]') } catch {}

  const totalTTC = parseFloat(order.total) || 0
  const totalHT = Math.round((totalTTC / 1.20) * 100) / 100
  const totalTVA = Math.round((totalTTC - totalHT) * 100) / 100
  const orderDate = order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : ''

  const itemRows = items.map(item => {
    const qty = item.qty || 1
    const priceTTC = parseFloat(item.price) || 0
    const priceHT = Math.round((priceTTC / 1.20) * 100) / 100
    const totalItemHT = Math.round(priceHT * qty * 100) / 100
    return '<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;">' + (item.name || 'Article') + '</td><td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:center;">' + qty + '</td><td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">' + priceHT.toFixed(2) + ' €</td><td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right;">' + totalItemHT.toFixed(2) + ' €</td></tr>'
  }).join('')

  const clientName = ((order.prenom || '') + ' ' + (order.nom || '')).trim() || 'Client'

  const html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Facture ' + order.id + ' - ACAMAR SAS</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Helvetica Neue",Arial,sans-serif;font-size:13px;color:#1a1a1a;background:#fff}.page{max-width:800px;margin:0 auto;padding:40px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;padding-bottom:20px;border-bottom:3px solid #C4962A}.logo h1{font-size:24px;font-weight:900;letter-spacing:-0.5px}.logo h1 span{color:#C4962A}.logo p{color:#666;font-size:11px;margin-top:2px}.invoice-ref{text-align:right}.invoice-ref .num{font-size:22px;font-weight:900;color:#C4962A}.invoice-ref .date{color:#666;font-size:12px;margin-top:4px}.badge{display:inline-block;background:#e8f5e9;color:#2e7d32;font-size:11px;font-weight:700;padding:3px 12px;border-radius:20px;margin-top:6px}.parties{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px}.party{border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px}.party.buyer{border:2px solid #C4962A}.party h3{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:10px}.party .name{font-size:15px;font-weight:700;margin-bottom:4px}.party p{color:#444;font-size:12px;line-height:1.6}table{width:100%;border-collapse:collapse;margin-bottom:24px}thead th{background:#f8f8f8;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#666}thead th:nth-child(2){text-align:center}thead th:nth-child(3),thead th:nth-child(4){text-align:right}.totals{display:flex;justify-content:flex-end;margin-bottom:32px}.totals table{width:280px}.totals td{padding:6px 12px;font-size:13px}.totals .total-row td{font-weight:900;font-size:16px;border-top:2px solid #C4962A;padding-top:10px}.totals .total-row td:last-child{color:#C4962A}.legal{border-top:1px solid #eee;padding-top:20px;color:#999;font-size:10px;line-height:1.8}.print-bar{background:#111;padding:12px 24px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10}.print-bar button{background:linear-gradient(135deg,#C4962A,#E8B84B);color:#000;border:none;padding:10px 24px;font-weight:900;font-size:13px;border-radius:6px;cursor:pointer;text-transform:uppercase;letter-spacing:1px}.print-bar span{color:#fff;font-size:14px;font-weight:700}@media print{.print-bar{display:none!important}body{background:#fff}.page{padding:20px}}</style></head><body><div class="print-bar"><span>Facture ' + order.id + '</span><button onclick="window.print()">Imprimer / PDF</button></div><div class="page"><div class="header"><div class="logo"><h1>AC<span>A</span> WHOLESALE</h1><p>ACAMAR SAS</p><p>60 Rue François 1er, 75008 Paris</p></div><div class="invoice-ref"><div style="font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px">Facture</div><div class="num">' + order.id + '</div><div class="date">' + orderDate + '</div><div class="badge">Acquittée</div></div></div><div class="parties"><div class="party"><h3>Vendeur</h3><div class="name">ACAMAR SAS</div><p>60 Rue François 1er<br>75008 Paris, France<br>SIRET : 101 361 616 00010<br>TVA : FR45101361616</p></div><div class="party buyer"><h3>Acheteur</h3><div class="name">' + clientName + '</div><p>' + (order.adresse || '') + '<br>' + (order.code_postal || '') + ' ' + (order.ville || '') + '<br>' + (order.pays || 'France') + '<br>' + (order.email || '') + '</p></div></div><table><thead><tr><th>Désignation</th><th>Qté</th><th>Prix unit. HT</th><th>Total HT</th></tr></thead><tbody>' + (itemRows || '<tr><td colspan="4" style="padding:10px 12px;color:#999">Détail non disponible</td></tr>') + '</tbody></table><div class="totals"><table><tr><td style="color:#666">Total HT</td><td style="text-align:right">' + totalHT.toFixed(2) + ' €</td></tr><tr><td style="color:#666">TVA (20%)</td><td style="text-align:right">' + totalTVA.toFixed(2) + ' €</td></tr><tr class="total-row"><td>Total TTC</td><td style="text-align:right">' + totalTTC.toFixed(2) + ' €</td></tr></table></div><div class="legal"><p><strong>Mode de paiement :</strong> Carte bancaire (Stripe)</p><p><strong>ACAMAR SAS</strong> — RCS Paris — SIRET : 101 361 616 00010 — TVA intracommunautaire : FR45101361616</p><p>60 Rue François 1er, 75008 Paris, France — contact@aca-wholesale.com</p></div></div></body></html>'

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
