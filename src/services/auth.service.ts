import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import type { AuthUser } from '@/types'

export async function signIn(email: string, password: string): Promise<AuthUser> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.')

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)

  return {
    id: data.user.id,
    email: data.user.email ?? email,
    name: (data.user.user_metadata?.name as string | undefined) ?? 'Admin',
  }
}

export async function signOut() {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return

  await supabase.auth.signOut()
}

/** Pengguna yang sedang masuk, atau null. Token diverifikasi ke server Supabase. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return {
    id: user.id,
    email: user.email ?? '',
    name: (user.user_metadata?.name as string | undefined) ?? 'Admin',
  }
}
