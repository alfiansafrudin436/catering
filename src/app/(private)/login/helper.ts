import { LOCAL_ADMIN_EMAIL, LOCAL_ADMIN_PASSWORD } from '@/lib/config'
import type { AuthUser } from '@/types'

/** Mode tanpa backend aktif hanya bila kedua kredensial lokal terisi. */
export function hasLocalCredentials() {
  return Boolean(LOCAL_ADMIN_EMAIL && LOCAL_ADMIN_PASSWORD)
}

export function matchesLocalCredentials(email: string, password: string) {
  return (
    hasLocalCredentials() &&
    email.trim().toLowerCase() === LOCAL_ADMIN_EMAIL.toLowerCase() &&
    password === LOCAL_ADMIN_PASSWORD
  )
}

/**
 * Terjemahkan kegagalan masuk menjadi pesan yang bisa ditindaklanjuti.
 *
 * Kegagalan jaringan dari fetch hanya berbunyi "Failed to fetch", yang tidak
 * memberi tahu apa pun tentang penyebabnya.
 */
export function describeSignInError(error: unknown) {
  const message = error instanceof Error ? error.message : ''

  if (/failed to fetch|network|fetch failed/i.test(message)) {
    return 'Tidak bisa menghubungi Supabase. Periksa NEXT_PUBLIC_SUPABASE_URL dan koneksi jaringan.'
  }

  if (/invalid login credentials/i.test(message)) {
    return 'Email atau kata sandi salah.'
  }

  return message || 'Gagal masuk.'
}

/** Sesi tiruan untuk mode lokal; token ini tidak berlaku di backend mana pun. */
export function buildLocalSession(email: string): { token: string; user: AuthUser } {
  return {
    token: 'local-session',
    user: { id: 'local-admin', name: 'Admin', email },
  }
}
