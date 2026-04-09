export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// GET /api/products — list all products
// GET /api/products?id=1 — get single product
export async function GET(req) {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ source: 'static', error: 'Supabase not configured' }, { status: 500 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', parseInt(id))
        .single()
      if (error) throw error
      return NextResponse.json({ product: formatProduct(data) })
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error
    return NextResponse.json({ products: (data || []).map(formatProduct) })
  } catch (err) {
    console.error('Products API error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PATCH /api/products — update stock or product fields (admin only)
export async function PATCH(req) {
  try {
    const { verifyAdmin } = await import('../../../lib/adminAuth')
    const auth = verifyAdmin(req)
    if (!auth.authenticated) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 })

    const { id, updates } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const allowed = ['stock', 'price', 'original_price', 'name', 'description', 'badge', 'is_new', 'pieces', 'sizes', 'state']
    const dbUpdates = { updated_at: new Date().toISOString() }
    for (const key of allowed) {
      if (updates[key] !== undefined) dbUpdates[key] = updates[key]
    }

    const { data, error } = await supabase
      .from('products')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ success: true, product: formatProduct(data) })
  } catch (err) {
    console.error('Products PATCH error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function formatProduct(p) {
  if (!p) return null
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    longDescription: p.long_description,
    price: parseFloat(p.price),
    originalPrice: p.original_price ? parseFloat(p.original_price) : null,
    rating: p.rating,
    reviews: p.reviews,
    badge: p.badge,
    isNew: p.is_new,
    emoji: p.emoji,
    brand: p.brand,
    color: p.color,
    category: p.category,
    pieces: p.pieces,
    sizes: p.sizes,
    state: p.state,
    details: Array.isArray(p.details) ? p.details : [],
    stock: p.stock,
    vinteMin: p.vinte_min,
    vinteMax: p.vinte_max,
    imageUrl: p.image_url,
  }
}
