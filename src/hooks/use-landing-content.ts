'use client'

import { useLandingContentStore } from '@/store/landing-content-store'
import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'

/**
 * Konten landing page yang sedang berlaku.
 * Sebelum store selesai rehydrate, kembalikan konten bawaan supaya markup
 * server dan client cocok.
 */
export function useLandingContent() {
  const content = useLandingContentStore((state) => state.content)
  const hasHydrated = useLandingContentStore((state) => state.hasHydrated)

  return hasHydrated ? content : DEFAULT_LANDING_CONTENT
}
