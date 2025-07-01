import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "https://icsovzcgfvhhfvuvdfkq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljc292emNnZnZoaGZ2dXZkZmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzODczOTEsImV4cCI6MjA2Njk2MzM5MX0.B0ue8L1pfSLQFeDUU8cku13cEZtvrcLiMuhXoXItY-E"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)