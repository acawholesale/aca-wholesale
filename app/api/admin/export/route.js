import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import redis from '../../../../lib/redis'

// GET /api/admin/export?format=csv|json
// Protégé par cookie admin_session
export async function GET(request) {
  // Vérification session admin
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  if (session?.value !== process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') || 'csv'

  try {
    // Récupère toutes les clés de panier
    const keys = await redis.keys('cart:*')
    const carts = await Promise.all(keys.map(k => redis.get(k.replace('cart:', '')).then(v => v)))
    const orders = carts.filter(Boolean)

    if (format === 'json') {
      return NextResponse.json(orders, {
        headers: {
          'Content-Disposition': `attachment; filename="commandes-${new Date().toISOString().slice(0,10)}.json"`,
        },
      })
    }

    // Format CSV
    const escape = (v) => {
      if (v == null) return ''
      const s = String(v).replace(/"/g, '""')
      return /[,;"\n]/.test(s) ? `"${s}"` : s
    }

    const headers = [
      'Date', 'Email', 'Nb articles', 'Total (€)',
      'Articles (nom × qté × prix)',
    ]

    const rows = orders.map(order => {
      const date = order.savedAt
        ? new Date(order.savedAt).toLocaleString('fr-FR')
        : ''
      const nbArticles = order.products?.length ?? 0
      const total = (order.products || [])
        .reduce((s, p) => s + (p.price || 0) * (p.quantity || 1), 0)
        .toFixed(2)
      const articles = (order.products || [])
        .map(p => `${p.name} ×${p.quantity} @${p.price}€`)
        .join(' | ')

      return [date, order.email, nbArticles, total, articles].map(escape).join(',')
    })

    const csv = [headers.map(escape).join(','), ...rows].join('\n')
    const bom = '\uFEFF' // BOM UTF-8 pour Excel

    return new Response(bom + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="commandes-${new Date().toISOString().slice(0,10)}.csv"`,
      },
    })
  } catch (err) {
    console.error('admin/export error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
