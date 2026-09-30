'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import { landingContentSchema, type LandingContentInput } from '@/lib/validation'
import { updateLandingContent } from '@/services/content.service'
import { useAuthStore } from '@/store/auth-store'
import { useLandingContentStore } from '@/store/landing-content-store'
import type { LandingContent } from '@/types'

import {
  findFirstSectionWithErrors,
  isAdminSectionId,
  renumberSteps,
  type AdminSectionId,
} from './helper'

type SaveState = { status: 'idle' } | { status: 'synced' } | { status: 'local'; reason: string }

/** Logic halaman admin pengelolaan konten landing page. */
export function useAdminPage() {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)
  const storedContent = useLandingContentStore((state) => state.content)
  const hasHydrated = useLandingContentStore((state) => state.hasHydrated)
  const setContent = useLandingContentStore((state) => state.setContent)
  const resetContent = useLandingContentStore((state) => state.resetContent)

  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' })
  const [activeSection, setActiveSection] = useState<AdminSectionId>('brand')

  const form = useForm<LandingContentInput>({
    resolver: zodResolver(landingContentSchema),
    defaultValues: DEFAULT_LANDING_CONTENT,
    mode: 'onSubmit',
  })

  // Konten tersimpan baru tersedia setelah store rehydrate dari localStorage.
  useEffect(() => {
    if (hasHydrated) form.reset(storedContent)
  }, [hasHydrated, storedContent, form])

  const facts = useFieldArray({ control: form.control, name: 'facts' })
  const highlights = useFieldArray({ control: form.control, name: 'highlights.items' })
  const packages = useFieldArray({ control: form.control, name: 'packages.items' })
  const steps = useFieldArray({ control: form.control, name: 'howToOrder.steps' })
  const testimonials = useFieldArray({ control: form.control, name: 'testimonials.items' })

  const mutation = useMutation({ mutationFn: updateLandingContent })

  const onSubmit = form.handleSubmit(
    async (values) => {
      const payload: LandingContent = {
        ...values,
        howToOrder: { ...values.howToOrder, steps: renumberSteps(values.howToOrder.steps) },
      }

      // Simpan lokal lebih dulu supaya preview selalu mencerminkan isi form.
      setContent(payload)
      form.reset(payload)

      try {
        const saved = await mutation.mutateAsync(payload)
        setContent(saved)
        form.reset(saved)
        setSaveState({ status: 'synced' })
      } catch (error) {
        setSaveState({
          status: 'local',
          reason: error instanceof Error ? error.message : 'Backend tidak merespons.',
        })
      }
    },
    (errors) => {
      // Hanya satu section yang dirender, jadi error bisa berada di panel yang
      // sedang tersembunyi. Pindahkan pengguna ke sana supaya tidak terlihat
      // seolah tombol Simpan tidak berfungsi.
      const target = findFirstSectionWithErrors(Object.keys(errors))
      if (target) setActiveSection(target)
    },
  )

  const onReset = () => {
    resetContent()
    form.reset(DEFAULT_LANDING_CONTENT)
    setSaveState({ status: 'idle' })
  }

  const onLogout = () => {
    logout()
    router.replace('/login')
  }

  // Key error tingkat atas sudah senama dengan id section.
  const sectionsWithErrors = Object.keys(form.formState.errors).filter(isAdminSectionId)

  return {
    form,
    fieldArrays: { facts, highlights, packages, steps, testimonials },
    onSubmit,
    onReset,
    onLogout,
    activeSection,
    setActiveSection,
    sectionsWithErrors,
    isSaving: mutation.isPending,
    isDirty: form.formState.isDirty,
    saveState,
  }
}
