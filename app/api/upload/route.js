export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyAdmin } from '../../../lib/adminAuth'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// POST /api/upload — upload image to Supabase Storage (admin only)
export async function POST(req) {
  try {
    const auth = verifyAdmin(req)
    if (!auth.authenticated) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase non configuré' }, { status: 500 })
    }

    const formData = await req.formData()
    const file = formData.get('file')
    const productId = formData.get('productId')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Validate file type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Format accepté : JPG, PNG, WebP, AVIF' }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (5 Mo max)' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `products/${productId || Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Erreur upload : ' + uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    const publicUrl = urlData?.publicUrl

    // If productId provided, update the product's image_url
    if (productId) {
      await supabase
        .from('products')
        .update({ image_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', parseInt(productId))
    }

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err) {
    console.error('Upload route error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
