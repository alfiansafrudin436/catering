import { LANDING_CONTENT_ID, LANDING_CONTENT_TABLE } from '@/lib/supabase/config'
import { getSupabasePublicClient } from '@/lib/supabase/server'
import type { LandingContent } from '@/types'

/**
 * Konten landing page dari sisi server, untuk metadata.
 *
 * Kegagalan sengaja ditelan: judul halaman tidak boleh menjatuhkan seluruh
 * render hanya karena Supabase tidak terjangkau.
 */
export async function getLandingContentFromServer(): Promise<LandingContent | null> {
  const supabase = getSupabasePublicClient()
  if (!supabase) return null

  try {
    const { data } = await supabase
      .from(LANDING_CONTENT_TABLE)
      .select('content')
      .eq('id', LANDING_CONTENT_ID)
      .maybeSingle()

    return (data?.content as LandingContent | undefined) ?? null
  } catch {
    return null
  }
}
