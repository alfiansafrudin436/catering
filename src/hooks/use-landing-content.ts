'use client'

import { useQuery } from '@tanstack/react-query'

import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { getLandingContent } from '@/services/content.service'
import { useLandingContentStore } from '@/store/landing-content-store'

export const LANDING_CONTENT_KEY = ['landing-content'] as const

/** Query konten dari Supabase. Nonaktif selama Supabase belum dikonfigurasi. */
export function useLandingContentQuery() {
  return useQuery({
    queryKey: LANDING_CONTENT_KEY,
    queryFn: getLandingContent,
    enabled: isSupabaseConfigured(),
  })
}

/**
 * Konten landing page yang sedang berlaku.
 *
 * Urutan sumber: Supabase bila ada isinya, lalu konten tersimpan di browser,
 * lalu konten bawaan. Sebelum store selesai rehydrate, konten bawaan dipakai
 * supaya markup server dan render pertama di client cocok.
 */
export function useLandingContent() {
  const content = useLandingContentStore((state) => state.content)
  const hasHydrated = useLandingContentStore((state) => state.hasHydrated)
  const { data } = useLandingContentQuery()

  if (data) return data

  return hasHydrated ? content : DEFAULT_LANDING_CONTENT
}
