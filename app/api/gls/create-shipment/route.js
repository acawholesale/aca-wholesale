export const dynamic = 'force-dynamic'

// app/api/gls/create-shipment/route.js
// Crée un envoi GLS via l'API ShipIT REST et retourne le numéro de suivi + étiquette base64

import { NextResponse } from 'next/server'

const GLS_API_BASE = process.env.GLS_API_URL
const GLS_CONTACT_ID = process.env.GLS_CONTACT_ID

function glsHeaders() {
  const auth = process.env.GLS_BASE64_AUTH
    || Buffer.from(`${process.env.GLS_USERNAME}:${process.env.GLS_PASSWORD}`).toString('base64')
  return {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/glsVersion1+json',
    'Accept': 'application/glsVersion1+json, application/json',
  }
}

// Delivery types:
// "standard"      → PARCEL, no service (B2B pro)
// "express"       → EXPRESS + service_1300 (B2B express)
// "domicile"      → PARCEL + service_flexdelivery (particulier, email+mobile required)
// "relais"        → PARCEL + service_shopdelivery (particulier relais/locker)
function buildProductAndServices(deliveryType = 'standard') {
  switch (deliveryType) {
    case 'express':
      return { Product: 'EXPRESS', Service: [{ ServiceName: 'service_1300' }] }
    case 'domicile':
      return { Product: 'PARCEL', Service: [{ ServiceName: 'service_flexdelivery' }] }
    case 'relais':
      return { Product: 'PARCEL', Service: [{ ServiceName: 'service_shopdelivery' }] }
    default:
      return { Product: 'PARCEL' }
  }
}

export async function POST(request) {
  try {
    const { order, deliveryType, labelFormat } = await request.json()

    if (!order) {
      return NextResponse.json({ error: 'Données de commande manquantes' }, { status: 400 })
    }

    if (!process.env.GLS_USERNAME && !process.env.GLS_BASE64_AUTH) {
      return NextResponse.json(
        { error: 'Identifiants GLS non configurés (GLS_BASE64_AUTH ou GLS_USERNAME+GLS_PASSWORD requis)' },
        { status: 500 }
      )
    }

    const client = order.client || order.destinataire || {}

    // FlexDelivery requires email + mobile
    if (deliveryType === 'domicile' && (!client.email || !client.tel)) {
      return NextResponse.json(
        { error: 'Email et téléphone obligatoires pour la livraison à domicile (FlexDelivery)' },
        { status: 400 }
      )
    }

    const today = new Date().toISOString().split('T')[0]
    const { Product, Service } = buildProductAndServices(deliveryType)

    // B2B: Name1 = société, ContactPerson = personne (recommandation GLS)
    // B2C (flexdelivery): Name1 = nom + prénom du destinataire
    const isB2C = deliveryType === 'domicile' || deliveryType === 'relais'

    const shipment = {
      ShippingDate: today,
      Product,
      Consignee: {
        ConsigneeID: String(order.id || ''),
        Address: {
          Name1: isB2C ? (client.nom || '') : (client.entreprise || client.nom || ''),
          Street: client.adresse || '',
          CountryCode: client.pays || 'FR',
          ZIPCode: client.codePostal || '',
          City: client.ville || '',
          ContactPerson: isB2C ? '' : (client.nom || ''),
          eMail: client.email || '',
          MobilePhoneNumber: client.tel || '',
        },
      },
      Shipper: {
        ContactID: GLS_CONTACT_ID,
      },
      ShipmentUnit: [
        {
          ShipmentUnitReference: [String(order.id || 'REF')],
          Weight: order.weight || 2,
        },
      ],
    }

    if (Service) {
      shipment.Service = Service
    }

    // If relais delivery, add ParcelShopID
    if (deliveryType === 'relais' && order.parcelShopId) {
      shipment.ShopDelivery = { ParcelShopID: order.parcelShopId }
    }

    const payload = {
      Shipment: shipment,
      PrintingOptions: {
        ReturnLabels: {
          TemplateSet: 'NONE',
          LabelFormat: labelFormat === 'zpl' ? 'ZPL' : 'PDF',
        },
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
    const created = data?.CreatedShipment || {}
    const parcel = created.ParcelData?.[0] || {}
    const shipmentRef = created.ShipmentReference

    if (!parcel.TrackID) {
      return NextResponse.json(
        { error: 'Numéro de suivi non reçu depuis GLS', raw: data },
        { status: 500 }
      )
    }

    // Label comes back as base64 in PrintData
    const labelBase64 = created.PrintData?.[0]?.Data || null

    return NextResponse.json({
      success: true,
      trackID: parcel.TrackID,
      parcelNumber: parcel.ParcelNumber,
      shipmentRef,
      labelBase64,
      labelFormat: labelFormat === 'zpl' ? 'zpl' : 'pdf',
      trackingUrl: `https://gls-group.com/FR/fr/suivi-colis/?match=${parcel.TrackID}&lang=FR`,
    })
  } catch (err) {
    console.error('GLS create-shipment error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
