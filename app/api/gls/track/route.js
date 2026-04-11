export const dynamic = 'force-dynamic'
// app/api/gls/track/route.js
import { NextResponse } from 'next/server'
import { rateLimit } from '../../../../lib/ratelimit'

export async function GET(request) {
  try {
    // Rate limit: 20 tracking requests per minute per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = await rateLimit(ip, 'gls-track', { limit: 20, window: 60 })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Réessayez dans une minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    const { searchParams } = new URL(request.url)
    const trackID = searchParams.get('id') || searchParams.get('parcelNumber')

    if (!trackID) {
      return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 })
    }

    // Helper: fetch JSON safely (returns null if response is not JSON)
    const fetchJSON = async (url, options = {}) => {
      try {
        const res = await fetch(url, options)
        if (!res.ok) return null
        const ct = res.headers.get('content-type') || ''
        if (!ct.includes('json')) return null
        return await res.json()
      } catch {
        return null
      }
    }

    // Try GLS France public API
    const data = await fetchJSON(
      `https://gls-group.eu/app/service/open/rest/FR/fr/rstt001?match=${encodeURIComponent(trackID)}`,
      { headers: { Accept: 'application/json', 'User-Agent': 'ACA-Wholesale/1.0' }, next: { revalidate: 60 } }
    )

    if (data) {
      return NextResponse.json(normalizeGLSResponse(data, trackID))
    }

    // Fallback: GLS Group API
    const data2 = await fetchJSON(
      `https://api.gls-group.eu/tracking/v1/trackings/parcel/${encodeURIComponent(trackID)}?language=FR`,
      { headers: { Accept: 'application/json', 'User-Agent': 'ACA-Wholesale/1.0' } }
    )

    if (data2) {
      return NextResponse.json(normalizeGLSResponse(data2, trackID))
    }

    // Both APIs failed — no GLS shipment found yet for this reference
    return NextResponse.json({
      trackID,
      status: 'CREATED',
      statusLabel: 'Expédition en préparation',
      statusColor: '#a78bfa',
      lastUpdate: null,
      lastLocation: null,
      history: [],
      trackingUrl: `https://gls-group.com/FR/fr/suivi-colis/?match=${encodeURIComponent(trackID)}&lang=FR`,
      error: 'Aucun suivi GLS disponible pour cette référence. Si votre colis vient d\'être expédié, le suivi sera disponible dans quelques heures.',
    }, { status: 200 })

  } catch (err) {
    console.error('GLS track error:', err)
    return NextResponse.json({ error: 'Erreur lors du suivi du colis' }, { status: 500 })
  }
}

function normalizeGLSResponse(data, trackID) {
  const trackingUrl = `https://gls-group.com/FR/fr/suivi-colis/?match=${encodeURIComponent(trackID)}&lang=FR`

  if (Array.isArray(data?.tuStatus)) {
    const tu = data.tuStatus[0]
    if (!tu) return { trackID, status: 'UNKNOWN', statusLabel: 'Inconnu', history: [], trackingUrl }

    const history = (tu.history || []).map(h => ({
      date: h.date || '',
      time: h.time || '',
      description: h.evtDscr || h.description || '',
      location: h.address?.city || h.location || '',
    }))

    const latest = history[0] || {}
    const statusMap = {
      'DELIVERED': 'Livré',
      'IN_TRANSIT': 'En transit',
      'OUT_FOR_DELIVERY': 'En cours de livraison',
      'EXCEPTION': 'Incident',
      'CREATED': 'Expédition créée',
      'PICKED_UP': 'Pris en charge',
      'AT_PARCELSHOP': 'En point relais',
    }

    const rawStatus = tu.progressBar?.statusInfo || tu.status || 'IN_TRANSIT'
    const status = rawStatus.toUpperCase().replace(/\s/g, '_')

    return {
      trackID: tu.tuNo || trackID,
      status,
      statusLabel: statusMap[status] || latest.description || rawStatus,
      statusColor: '#60a5fa',
      lastUpdate: latest.date ? `${latest.date} ${latest.time || ''}`.trim() : null,
      lastLocation: latest.location || null,
      history,
      trackingUrl,
    }
  }

  // Generic fallback for unknown response shapes
  return {
    trackID,
    status: 'IN_TRANSIT',
    statusLabel: 'En transit',
    statusColor: '#60a5fa',
    lastUpdate: null,
    lastLocation: null,
    history: [],
    trackingUrl,
  }
}
