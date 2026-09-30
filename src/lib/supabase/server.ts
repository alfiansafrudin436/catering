import { createClient } from '@supabase/supabase-js'

import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

/**
 * Client Supabase untuk pembacaan publik di server.
 *
 * Sengaja tanpa cookie: hanya dipakai membaca data yang boleh dilihat siapa
 * saja, seperti judul halaman. Tanpa cookie, rute yang memakainya tidak
 * dipaksa menjadi dinamis.
 */
export function getSupabasePublicClient() {
  if (!isSupabaseConfigured()) return null

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  })
}
