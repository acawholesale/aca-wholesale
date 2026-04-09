export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../../lib/adminAuth'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function GET(request) {
  const auth = verifyAdmin(request)
  if (!auth.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'orders'

  try {
    const supabase = getSupabase()
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (type === 'clients') {
      return exportClients(orders || [])
    }
    return exportOrders(orders || [])
  } catch (err) {
    console.error('admin/export error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

function exportOrders(orders) {
  const escape = (v) => {
    if (v == null) return ''
    const s = String(v).replace(/"/g, '""')
    return /[,;"\n]/.test(s) ? `"${s}"` : s
  }

  const headers = ['ID', 'Date', 'Client', 'Email', 'Ville', 'Montant', 'Statut', 'GLS TrackID']
  const rows = orders.map(o => [
    o.id,
    o.created_at ? new Date(o.created_at).toLocaleDateString('fr-FR') : '',
    ((o.prenom || '') + ' ' + (o.nom || '')).trim(),
    o.email || '',
    o.ville || '',
    o.total || 0,
    o.status || '',
    o.gls_track_id || '',
  ].map(escape).join(','))

  const csv = [headers.map(escape).join(','), ...rows].join('\n')
  const bom = '\uFEFF'

  return new Response(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="commandes-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  })
}

function exportClients(orders) {
  const escape = (v) => {
    if (v == null) return ''
    const s = String(v).replace(/"/g, '""')
    return /[,;"\n]/.test(s) ? `"${s}"` : s
  }

  const clientMap = {}
  orders.forEach(o => {
    const email = o.email
    if (!email) return
    if (!clientMap[email]) {
      clientMap[email] = {
        nom: ((o.prenom || '') + ' ' + (o.nom || '')).trim(),
        email,
        ville: o.ville || '',
        commandes: 0,
        total: 0,
      }
    }
    clientMap[email].commandes++
    clientMap[email].total += parseFloat(o.total || 0)
  })

  const clients = Object.values(clientMap).map(c => ({
    ...c,
    statut: c.commandes >= 5 ? 'VIP' : c.commandes >= 2 ? 'Actif' : 'Nouveau',
  }))

  const headers = ['Nom', 'Email', 'Ville', 'Nb Commandes', 'Statut', 'Total dépensé']
  const rows = clients.map(c => [
    c.nom, c.email, c.ville, c.commandes, c.statut, c.total.toFixed(2),
  ].map(escape).join(','))

  const csv = [headers.map(escape).join(','), ...rows].join('\n')
  const bom = '\uFEFF'

  return new Response(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="clients-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  })
}
