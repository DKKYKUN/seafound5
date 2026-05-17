import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://ytzxzfkqunvuomerjeuw.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0enh6ZmtxdW52dW9tZXJqZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5Mzg1OTksImV4cCI6MjA5NDUxNDU5OX0.Il8guOyojlDfs-muWZrqFnCDwswKaFacKVEdmpVjMQs"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
