import { LOCAL_ADMIN_EMAIL, LOCAL_ADMIN_PASSWORD } from '@/lib/config'
import type { LoginResult } from '@/types'

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

/** Sesi tiruan untuk mode lokal; token ini tidak berlaku di backend mana pun. */
export function buildLocalSession(email: string): LoginResult {
  return {
    token: 'local-session',
    user: { id: 'local-admin', name: 'Admin', email },
  }
}
