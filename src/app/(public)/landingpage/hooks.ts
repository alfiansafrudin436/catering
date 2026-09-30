'use client'

import { useLandingContent } from '@/hooks/use-landing-content'

/** Logic halaman landing publik. */
export function useLandingPage() {
  const content = useLandingContent()

  return { content }
}
