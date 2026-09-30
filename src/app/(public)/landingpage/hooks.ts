'use client'

import { useLandingContentQuery } from '@/hooks/use-landing-content'
import { isSupabaseConfigured } from '@/lib/supabase/config'

/** Logic halaman landing publik. */
export function useLandingPage() {
  const { data: content, isPending, isError, error } = useLandingContentQuery()

  return {
    content,
    isPending,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
    isConfigured: isSupabaseConfigured(),
  }
}
