import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { LANDING_CONTENT_ID, LANDING_CONTENT_TABLE } from '@/lib/supabase/config'
import type { LandingContent } from '@/types'

/**
 * Konten landing page dari Supabase.
 *
 * Mengembalikan null bila Supabase belum dikonfigurasi atau barisnya belum ada,
 * sehingga pemanggil memakai konten bawaan.
 */
export async function getLandingContent(): Promise<LandingContent | null> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from(LANDING_CONTENT_TABLE)
    .select('content')
    .eq('id', LANDING_CONTENT_ID)
    .maybeSingle()

  if (error) throw new Error(error.message)

  return (data?.content as LandingContent | undefined) ?? null
}

export async function updateLandingContent(payload: LandingContent): Promise<LandingContent> {
  const supabase = getSupabaseBrowserClient()
  if (!supabase) throw new Error('Supabase belum dikonfigurasi.')

  const { data, error } = await supabase
    .from(LANDING_CONTENT_TABLE)
    .upsert({ id: LANDING_CONTENT_ID, content: payload, updated_at: new Date().toISOString() })
    .select('content')
    .single()

  if (error) throw new Error(error.message)

  return data.content as LandingContent
}
