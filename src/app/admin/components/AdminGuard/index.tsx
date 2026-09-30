'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/auth-store'

type AdminGuardProps = {
  children: React.ReactNode
}

/**
 * Gerbang sisi klien untuk halaman admin.
 *
 * Ini hanya menyembunyikan tampilan, bukan pengamanan: seluruh konten admin
 * tetap terkirim ke browser. Perlindungan sesungguhnya harus dilakukan backend
 * lewat pemeriksaan token di setiap endpoint.
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const token = useAuthStore((state) => state.token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  useEffect(() => {
    if (hasHydrated && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
    }
  }, [hasHydrated, token, pathname, router])

  if (!hasHydrated || !token) {
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center text-sm">
        Memeriksa sesi...
      </div>
    )
  }

  return <>{children}</>
}
