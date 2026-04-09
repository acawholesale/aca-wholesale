import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function logError(source, message, metadata = {}) {
  console.error(`[${source}] ${message}`, metadata)
  try {
    const supabase = getSupabase()
    if (supabase) {
      await supabase.from('error_logs').insert({
        source,
        message: String(message).slice(0, 1000),
        metadata,
      })
    }
  } catch {
    // Don't fail the caller if logging fails
  }
}
