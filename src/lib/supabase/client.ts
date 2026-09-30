'use client'

import { createBrowserClient } from '@supabase/ssr'

import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

let cached: ReturnType<typeof createBrowserClient> | null = null

/**
 * Client Supabase untuk browser.
 *
 * Mengembalikan null bila kredensial belum diisi, sehingga pemanggil bisa
 * memilih jalur lokal tanpa melempar error saat aplikasi dijalankan polos.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null

  cached ??= createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  return cached
}
