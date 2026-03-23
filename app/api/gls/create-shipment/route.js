export const dynamic = 'force-dynamic'

// app/api/gls/create-shipment/route.js
// Next.js 14 App Router – Route Handler
// Crée un envoi GLS via l'API ShipIT et retourne le numéro de suivi + l'URL de l'étiquette

import { NextResponse } from 'next/server'

const GLS_API_BASE = process.env.GLS_API_URL || 'https://shipit.gls-group.eu'
const GLS_CONTACT_ID = process.env.GLS_CONTACT_ID || '250aaa4lE7'

function glsHeaders() {
  const credentials = Buffer.from(
    `${process.env.GLS_USERNAME}:${process.env.GLS_PASSWORD}`
  ).toString('base64')
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/glsVersion1+json',
    'Accept': 'application/glsVersion1+json, application/json',
  }
}

export async function POST(request) {
  try {
    const { order } = await request.json()

    if (!order) {
      return NextResponse.json({ error: 'Données de commande manquantes' }, { status: 400 })
    }

    if (!process.env.GLS_USERNAME || !process.env.GLS_PASSWORD) {
      return NextResponse.json(
        { error: 'Identifiants GLS non configurés (variables GLS_USERNAME / GLS_PASSWORD manquantes)' },
        { status: 500 }
      )
    }

    const today = new Date().toISOString().split('T')[0]

    const payload = {
      Shipment: {
        ShippingDate: today,
        Product: 'PARCEL',
        Consignee: {
          ConsigneeID: order.id || '',
          Name1: order.client?.nom || order.destinataire?.nom || '',
          Name2: order.client?.entreprise || '',
          Name3: '',
          Street1: order.client?.adresse || order.destinataire?.adresse || '',
          CountryCode: order.client?.pays || 'FR',
          ZIPCode: order.client?.codePostal || order.destinataire?.codePostal || '',
          City: order.client?.ville || order.destinataire?.ville || '',
          Phone: order.client?.tel || '',
          Email: order.client?.email || '',
        },
        Shipper: {
          ContactID: GLS_CONTACT_ID,
          AlternativeShipperAddress: null,
        },
        Parcels: [
          {
            TrackID: null,
            Comment: `Commande ${order.id}`,
            CustomerParcelNumber: order.id,
          },
        ],
      },
    }

    const response = await fetch(`${GLS_API_BASE}/backend/rs/shipments`, {
      method: 'POST',
      headers: glsHeaders(),
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GLS API error:', response.status, errorText)
      return NextResponse.json(
        { error: `Erreur GLS (${response.status}): ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const parcel = data?.CreatedShipment?.Parcels?.[0]
    const shipmentRef = data?.CreatedShipment?.ShipmentReference

    if (!parcel?.TrackID) {
      return NextResponse.json(
        { error: 'Numéro de suivi non reçu depuis GLS', raw: data },
        { status: 500 }
      )
    }

    let labelBase64 = null
    try {
      const labelRes = await fetch(
        `${GLS_API_BASE}/backend/rs/shipments/${shipmentRef}/labels`,
        { headers: { ...glsHeaders(), Accept: 'application/pdf' } }
      )
      if (labelRes.ok) {
        const labelBuf = await labelRes.arrayBuffer()
        labelBase64 = Buffer.from(labelBuf).toString('base64')
      }
    } catch (e) {
      console.warn('Label fetch failed:', e.message)
    }

    return NextResponse.json({
      success: true,
      trackID: parcel.TrackID,
      shipmentRef,
      labelBase64,
      trackingUrl: `https://gls-group.com/FR/fr/suivi-colis/?match=${parcel.TrackID}&lang=FR`,
    })
  } catch (err) {
    console.error('GLS create-shipment error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
