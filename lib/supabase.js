import { createClient } from '@supabase/supabase-js'

// Public client-side Supabase config (anon key is designed to be public)
const supabaseUrl = 'https://tqrnlifpqgeahzomlhmg.supabase.co'
const supabaseAnonKey = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcm5saWZwcWdlYWh6b21saG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTY1MzAsImV4cCI6MjA4OTIzMjUzMH0',
  '9ghatXXsST7Ra4ty1A53tX2UZ46BiDgyTmh1jBoUzE0',
].join('.')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
