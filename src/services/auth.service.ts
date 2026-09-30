import { request } from '@/services/api'
import type { LoginResult } from '@/types'

export async function login(payload: { email: string; password: string }): Promise<LoginResult> {
  return request<LoginResult>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
