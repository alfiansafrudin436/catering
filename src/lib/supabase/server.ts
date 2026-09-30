import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from './config'

/**
 * Client Supabase untuk Server Component dan Route Handler.
 *
 * Sesi dibaca dari cookie, bukan localStorage, supaya server ikut mengenali
 * pengguna yang sudah masuk.
 */
export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null

  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Component tidak boleh menulis cookie. Penyegaran token
          // ditangani middleware, jadi kegagalan di sini aman diabaikan.
        }
      },
    },
  })
}
