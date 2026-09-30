'use client'

import { useQuery } from '@tanstack/react-query'

import { getLandingContent } from '@/services/content.service'

export const LANDING_CONTENT_KEY = ['landing-content'] as const

export function useLandingContentQuery() {
  return useQuery({ queryKey: LANDING_CONTENT_KEY, queryFn: getLandingContent })
}

/**
 * Konten landing page dari Supabase.
 *
 * undefined selama permintaan berjalan, atau bila baris 'default' belum ada.
 * Baris itu dibuat oleh supabase/migrations/0002_seed_landing_content.sql.
 */
export function useLandingContent() {
  return useLandingContentQuery().data ?? undefined
}
