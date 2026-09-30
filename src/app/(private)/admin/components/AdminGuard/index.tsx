'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { isSupabaseConfigured } from '@/lib/supabase/config'
import { useAuthStore } from '@/store/auth-store'

type AdminGuardProps = {
  children: React.ReactNode
}

/**
 * Penjaga halaman admin untuk mode lokal.
 *
 * Dengan Supabase, middleware sudah menolak permintaan tanpa sesi valid di sisi
 * server — termasuk navigasi client-side, karena middleware ikut berjalan untuk
 * permintaan RSC. Memeriksa ulang di sini justru berbahaya: sesi Supabase ada di
 * cookie, bukan localStorage, sehingga penjaga ini akan memulangkan pengguna
 * yang sah ke /login dan middleware melemparnya balik ke /admin tanpa henti.
 *
 * Tanpa Supabase, tidak ada penjagaan di server, jadi pemeriksaan localStorage
 * di bawah ini yang dipakai. Perlu ditegaskan: itu hanya menyembunyikan
 * tampilan, bukan pengamanan.
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const usesSupabase = isSupabaseConfigured()
  const token = useAuthStore((state) => state.token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  const isBlocked = !usesSupabase && (!hasHydrated || !token)

  useEffect(() => {
    if (usesSupabase || !hasHydrated || token) return

    router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [usesSupabase, hasHydrated, token, pathname, router])

  if (isBlocked) {
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center text-sm">
        Memeriksa sesi...
      </div>
    )
  }

  return <>{children}</>
}
