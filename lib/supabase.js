import { createClient } from '@supabase/supabase-js'

// Public client-side Supabase config (anon key is safe to expose — it's in the JS bundle)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tqrnlifpqgeahzomlhmg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcm5saWZwcWdlYWh6b21saG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTY1MzAsImV4cCI6MjA4OTIzMjUzMH0.9ghatXXsST7Ra4ty1A53tX2UZ46BiDgyTmh1jBoUzE0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
