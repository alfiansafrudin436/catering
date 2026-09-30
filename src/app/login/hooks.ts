'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { loginSchema, type LoginInput } from '@/lib/validation'
import { login } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth-store'

import { buildLocalSession, hasLocalCredentials, matchesLocalCredentials } from './helper'

/** Logic halaman login admin. */
export function useLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('next') ?? '/admin'

  const token = useAuthStore((state) => state.token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const setSession = useAuthStore((state) => state.setSession)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  // Sudah punya sesi: tidak perlu login lagi.
  useEffect(() => {
    if (hasHydrated && token) router.replace(redirectTo)
  }, [hasHydrated, token, redirectTo, router])

  const mutation = useMutation({ mutationFn: login })

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setErrorMessage(null)

    try {
      const result = await mutation.mutateAsync({ email, password })
      setSession(result.token, result.user)
      router.replace(redirectTo)
      return
    } catch (error) {
      // Backend belum tersedia: jatuh ke kredensial lokal bila dikonfigurasi.
      if (matchesLocalCredentials(email, password)) {
        const session = buildLocalSession(email)
        setSession(session.token, session.user)
        router.replace(redirectTo)
        return
      }

      setErrorMessage(
        hasLocalCredentials()
          ? 'Email atau kata sandi salah.'
          : error instanceof Error
            ? error.message
            : 'Gagal masuk.',
      )
    }
  })

  return {
    form,
    onSubmit,
    errorMessage,
    isSubmitting: mutation.isPending || form.formState.isSubmitting,
    isLocalMode: hasLocalCredentials(),
  }
}
