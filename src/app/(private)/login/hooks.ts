'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { isSupabaseConfigured } from '@/lib/supabase/config'
import { loginSchema, type LoginInput } from '@/lib/validation'
import { signIn } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth-store'

import {
  buildLocalSession,
  describeSignInError,
  hasLocalCredentials,
  matchesLocalCredentials,
} from './helper'

/** Logic halaman login admin. */
export function useLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('next') ?? '/admin'

  const usesSupabase = isSupabaseConfigured()

  const token = useAuthStore((state) => state.token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const setSession = useAuthStore((state) => state.setSession)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  // Mode lokal saja. Dengan Supabase, middleware yang memulangkan pengguna
  // yang sudah punya sesi, sebelum halaman ini sempat dirender.
  useEffect(() => {
    if (!usesSupabase && hasHydrated && token) router.replace(redirectTo)
  }, [usesSupabase, hasHydrated, token, redirectTo, router])

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginInput) => signIn(email, password),
  })

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setErrorMessage(null)

    if (usesSupabase) {
      try {
        const user = await mutation.mutateAsync({ email, password })
        setSession('supabase-session', user)
        // refresh() agar middleware membaca cookie sesi yang baru ditulis.
        router.replace(redirectTo)
        router.refresh()
      } catch (error) {
        setErrorMessage(describeSignInError(error))
      }

      return
    }

    if (matchesLocalCredentials(email, password)) {
      const session = buildLocalSession(email)
      setSession(session.token, session.user)
      router.replace(redirectTo)

      return
    }

    setErrorMessage(
      hasLocalCredentials()
        ? 'Email atau kata sandi salah.'
        : 'Supabase belum dikonfigurasi dan kredensial lokal belum diisi.',
    )
  })

  return {
    form,
    onSubmit,
    errorMessage,
    isSubmitting: mutation.isPending || form.formState.isSubmitting,
    isLocalMode: !usesSupabase,
  }
}
