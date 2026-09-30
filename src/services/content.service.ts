import { request } from '@/services/api'
import type { LandingContent } from '@/types'

export async function getLandingContent(): Promise<LandingContent> {
  return request<LandingContent>('/landing-content')
}

export async function updateLandingContent(payload: LandingContent): Promise<LandingContent> {
  return request<LandingContent>('/landing-content', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
