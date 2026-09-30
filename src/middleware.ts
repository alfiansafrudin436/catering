import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from '@/lib/supabase/config'

/**
 * Menyegarkan sesi Supabase dan menjaga /admin di sisi server.
 *
 * Ini perlindungan yang sebenarnya: permintaan tanpa sesi valid tidak pernah
 * sampai ke halaman admin. AdminGuard di klien hanya pelengkap tampilan.
 *
 * Selama Supabase belum dikonfigurasi, middleware tidak menahan apa pun supaya
 * mode lokal tetap bisa dipakai.
 */
export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.next()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  // getUser() memverifikasi token ke server Supabase; getSession() hanya membaca
  // cookie dan bisa dipalsukan, jadi jangan dipakai untuk mengambil keputusan.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (!user && pathname.startsWith('/admin')) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (user && pathname === '/login') {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = '/admin'
    adminUrl.search = ''

    return NextResponse.redirect(adminUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
