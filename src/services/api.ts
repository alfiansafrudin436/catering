import type { ApiEnvelope } from '@/types'
import { useAuthStore } from '@/store/auth-store'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1'

export class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  if (response.status === 401) {
    useAuthStore.getState().logout()
    throw new ApiError('Sesi berakhir, silakan masuk kembali.', 401)
  }

  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<T> | null

  if (!response.ok || !envelope?.success) {
    throw new ApiError(envelope?.message ?? 'Terjadi kesalahan pada server.', response.status)
  }

  return envelope.data
}
