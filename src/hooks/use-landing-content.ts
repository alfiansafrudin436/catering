'use client'

import { useQuery } from '@tanstack/react-query'

import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import { getLandingContent } from '@/services/content.service'

export const LANDING_CONTENT_KEY = ['landing-content'] as const

export function useLandingContentQuery() {
  return useQuery({ queryKey: LANDING_CONTENT_KEY, queryFn: getLandingContent })
}

/**
 * Konten landing page yang sedang berlaku.
 *
 * Selama permintaan berjalan atau barisnya belum ada di Supabase, konten bawaan
 * dipakai supaya halaman tidak pernah kosong.
 */
export function useLandingContent() {
  const { data } = useLandingContentQuery()

  return data ?? DEFAULT_LANDING_CONTENT
}
