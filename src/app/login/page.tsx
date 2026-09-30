'use client'

import { Suspense } from 'react'

import { LoginCard } from './components/LoginCard'
import { useLoginPage } from './hooks'

function LoginPageContent() {
  const { form, onSubmit, errorMessage, isSubmitting, isLocalMode } = useLoginPage()

  return (
    <LoginCard
      form={form}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isSubmitting={isSubmitting}
      isLocalMode={isLocalMode}
    />
  )
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      {/* useSearchParams butuh batas Suspense agar halaman tetap bisa di-prerender. */}
      <Suspense fallback={null}>
        <LoginPageContent />
      </Suspense>
    </main>
  )
}
