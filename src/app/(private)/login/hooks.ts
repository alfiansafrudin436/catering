'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { isSupabaseConfigured } from '@/lib/supabase/config'
import { loginSchema, type LoginInput } from '@/lib/validation'
import { signIn } from '@/services/auth.service'

import { describeSignInError } from './helper'

/** Logic halaman login admin. */
export function useLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('next') ?? '/admin'

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginInput) => signIn(email, password),
  })

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    setErrorMessage(null)

    try {
      await mutation.mutateAsync({ email, password })
      router.replace(redirectTo)
      // Middleware membaca sesi dari cookie, jadi muat ulang data rute.
      router.refresh()
    } catch (error) {
      setErrorMessage(describeSignInError(error))
    }
  })

  return {
    form,
    onSubmit,
    errorMessage,
    isSubmitting: mutation.isPending || form.formState.isSubmitting,
    isConfigured: isSupabaseConfigured(),
  }
}
