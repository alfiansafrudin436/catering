'use client'

import type { UseFormReturn } from 'react-hook-form'

import { Field } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { LoginInput } from '@/lib/validation'

type LoginCardProps = {
  form: UseFormReturn<LoginInput>
  onSubmit: (event: React.FormEvent) => void
  errorMessage: string | null
  isSubmitting: boolean
  isConfigured: boolean
}

export function LoginCard({
  form,
  onSubmit,
  errorMessage,
  isSubmitting,
  isConfigured,
}: LoginCardProps) {
  const { register, formState } = form

  return (
    <form
      onSubmit={onSubmit}
      className="border-border bg-surface rounded-card w-full max-w-sm border p-6 md:p-8"
    >
      <h1 className="font-display text-2xl font-semibold tracking-tight">Masuk ke Admin</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Halaman ini untuk mengelola konten landing page.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Field label="Email" error={formState.errors.email?.message}>
          {(props) => <Input {...props} type="email" autoComplete="email" {...register('email')} />}
        </Field>
        <Field label="Kata sandi" error={formState.errors.password?.message}>
          {(props) => (
            <Input
              {...props}
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
          )}
        </Field>
      </div>

      {errorMessage ? <p className="text-primary mt-4 text-sm">{errorMessage}</p> : null}

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Memproses...' : 'Masuk'}
      </Button>

      {isConfigured ? null : (
        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
          Supabase belum dikonfigurasi. Isi <code>NEXT_PUBLIC_SUPABASE_URL</code> dan{' '}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> di <code>.env.local</code>, lalu jalankan ulang
          server.
        </p>
      )}
    </form>
  )
}
