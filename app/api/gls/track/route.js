// app/api/gls/track/route.js
// Next.js 14 App Router – Route Handler
// Retourne le statut de suivi d'un colis GLS en temps réel

import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const trackID = searchParams.get('id')

    if (!trackID) {
      return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 })
    }

    // API publique de tracking GLS France
    const res = await fetch(
      `https://gls-group.eu/app/service/open/rest/FR/fr/rstt001?match=${encodeURIComponent(trackID)}`,
      { headers: { Accept: 'application/json', 'User-Agent': 'ACA-Wholesale/1.0' }, next: { revalidate: 60 } }
    )

    if (!res.ok) {
      // Fallback API GLS Group
      const res2 = await fetch(
        `https://api.gls-group.eu/tracking/v1/trackings/parcel/${encodeURIComponent(trackID)}?language=FR`,
        { headers: { Accept: 'application/json', 'User-Agent': 'ACA-Wholesale/1.0' } }
      )
      if (res2.ok) {
        const data2 = await res2.json()
        return NextResponse.json(normalizeGLSResponse(data2, trackID))
      }
      return NextResponse.json({ error: `GLS tracking unavailable (${res.status})`, trackID }, { status: 200 })
    }

    const data = await res.json()
    return NextResponse.json(normalizeGLSResponse(data, trackID))
  } catch (err) {
    console.error('GLS track error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function normalizeGLSResponse(data, trackID) {
  const trackingUrl = `https://gls-group.com/FR/fr/suivi-colis/?match=${trackID}&lang=FR`

  if (Array.isArray(data?.tuStatus)) {
    const parcel = data.tuStatus[0]
    const lastEvent = parcel?.history?.[0]
    const statusMap = {
      'DELIVERED': 'Livré', 'IN_TRANSIT': 'En transit',
      'OUT_FOR_DELIVERY': 'En cours de livraison', 'EXCEPTION': 'Incident',
      'CREATED': 'Créé', 'PICKED_UP': 'Collecté', 'AT_PARCELSHOP': 'En point relais',
    }
    const glsStatus = parcel?.progressBar?.statusInfo || lastEvent?.evtDscr || 'Inconnu'
    return {
      trackID, status: glsStatus,
      statusLabel: statusMap[glsStatus] || glsStatus,
      statusColor: getStatusColor(glsStatus),
      lastUpdate: lastEvent ? `${lastEvent.date} ${lastEvent.time}` : null,
      lastLocation: lastEvent?.evtMkp || '',
      history: (parcel?.history || []).map(h => ({
        date: h.date, time: h.time,
        location: h.evtMkp || '', description: h.evtDscr || '',
      })),
      trackingUrl,
    }
  }

  if (data?.events || data?.status) {
    const events = data.events || []
    const lastEvent = events[0]
    return {
      trackID, status: data.status || 'UNKNOWN',
      statusLabel: data.statusText || data.status || 'Inconnu',
      statusColor: getStatusColor(data.status),
      lastUpdate: lastEvent?.timestamp || null,
      lastLocation: lastEvent?.location?.address?.city || '',
      history: events.map(e => ({
        date: e.timestamp?.split('T')[0] || '',
        time: e.timestamp?.split('T')[1]?.slice(0, 5) || '',
        location: e.location?.address?.city || '',
        description: e.description || '',
      })),
      trackingUrl,
    }
  }

  return { trackID, raw: data, trackingUrl }
}

function getStatusColor(status) {
  const colors = {
    'DELIVERED': '#22c55e', 'IN_TRANSIT': '#3b82f6',
    'OUT_FOR_DELIVERY': '#f59e0b', 'EXCEPTION': '#ef4444',
    'CREATED': '#8b5cf6', 'PICKED_UP': '#06b6d4', 'AT_PARCELSHOP': '#f97316',
  }
  return colors[status] || '#6b7280'
}
