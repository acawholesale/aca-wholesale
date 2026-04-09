export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendShippingNotification, sendAdminOrderNotification, sendOrderConfirmation } from '../../../../lib/emails'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

export async function POST(req) {
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { orderId, meta, items, totalAmount } = await req.json()
  const supabase = getSupabase()

  // 1. Send admin notification email
  try {
    await sendAdminOrderNotification({
      orderId,
      clientName: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
      email: meta.email || '',
      total: totalAmount,
      items: meta.itemsSummary || items.map(i => i.name + ' x' + i.qty).join(', '),
    })
  } catch (err) {
    console.error('Admin notification email error:', err.message)
  }

  // 2. Send order confirmation to customer
  try {
    if (meta.email) {
      await sendOrderConfirmation({
        email: meta.email,
        prenom: meta.prenom || '',
        orderId,
        items: items.length > 0 ? items : (meta.itemsSummary || ''),
        total: totalAmount,
      })
    }
  } catch (err) {
    console.error('Order confirmation email error:', err.message)
  }

  // 3. Auto-create GLS shipment
  try {
    const glsOrder = {
      id: orderId,
      client: {
        nom: ((meta.prenom || '') + ' ' + (meta.nom || '')).trim(),
        entreprise: meta.entreprise || '',
        adresse: meta.adresse || '',
        ville: meta.ville || '',
        codePostal: meta.codePostal || '',
        pays: meta.pays || 'FR',
        email: meta.email || '',
        tel: meta.telephone || '',
      },
      weight: parseFloat(meta.weight) || 2,
      lots: meta.itemsSummary || items.map(i => i.name + ' x' + i.qty).join(', '),
      montant: totalAmount,
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aca-wholesale.vercel.app'
    const glsRes = await fetch(baseUrl + '/api/gls/create-shipment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: glsOrder, deliveryType: meta.deliveryType || 'standard' }),
    })

    const glsData = await glsRes.json()

    if (glsData.success) {
      await supabase
        .from('orders')
        .update({
          gls_track_id: glsData.trackID || null,
          gls_label_base64: glsData.labelBase64 || null,
          gls_label_url: glsData.trackingUrl || null,
          status: 'En préparation',
        })
        .eq('id', orderId)

      try {
        if (meta.email && glsData.trackID) {
          await sendShippingNotification({
            email: meta.email,
            prenom: meta.prenom || '',
            orderId,
            trackID: glsData.trackID,
            trackingUrl: glsData.trackingUrl,
          })
        }
      } catch (emailErr) {
        console.error('Shipping email error:', emailErr.message)
      }
    } else {
      console.error('GLS error:', glsData.error)
    }
  } catch (glsError) {
    console.error('GLS auto-shipment error:', glsError.message)
  }

  return NextResponse.json({ success: true })
}
