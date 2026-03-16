import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://tqrnlifpqgeahzomlhmg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxcm5saWZwcWdlYWh6b21saG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTY1MzAsImV4cCI6MjA4OTIzMjUzMH0.9ghatXXsST7Ra4ty1A53tX2UZ46BiDgyTmh1jBoUzE0'
)
