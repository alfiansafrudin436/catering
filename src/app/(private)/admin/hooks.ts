'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LANDING_CONTENT_KEY, useLandingContentQuery } from '@/hooks/use-landing-content'
import { fileToCompressedBlob } from '@/lib/image'
import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import { landingContentSchema, type LandingContentInput } from '@/lib/validation'
import { signOut } from '@/services/auth.service'
import { updateLandingContent } from '@/services/content.service'
import { uploadPackagePhoto } from '@/services/storage.service'
import type { LandingContent } from '@/types'

import {
  findFirstSectionWithErrors,
  isAdminSectionId,
  renumberSteps,
  type AdminSectionId,
} from './helper'

type SaveState = { status: 'idle' } | { status: 'saved' } | { status: 'error'; reason: string }

/** Logic halaman admin pengelolaan konten landing page. */
export function useAdminPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle' })
  const [activeSection, setActiveSection] = useState<AdminSectionId>('brand')

  const form = useForm<LandingContentInput>({
    resolver: zodResolver(landingContentSchema),
    defaultValues: DEFAULT_LANDING_CONTENT,
    mode: 'onSubmit',
  })

  const contentQuery = useLandingContentQuery()

  // Isi form sekali saja saat konten pertama tersedia. Tanpa penjaga ini,
  // refetch di tengah pengeditan akan menimpa apa yang sedang diketik.
  const hasSeededRef = useRef(false)

  useEffect(() => {
    if (hasSeededRef.current || contentQuery.isPending) return

    hasSeededRef.current = true
    form.reset(contentQuery.data ?? DEFAULT_LANDING_CONTENT)
  }, [contentQuery.isPending, contentQuery.data, form])

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

      try {
        const saved = await mutation.mutateAsync(payload)
        form.reset(saved)
        queryClient.setQueryData(LANDING_CONTENT_KEY, saved)
        setSaveState({ status: 'saved' })
      } catch (error) {
        // Form sengaja tidak di-reset supaya isian pengguna tidak hilang saat
        // penyimpanan gagal dan bisa dicoba lagi.
        setSaveState({
          status: 'error',
          reason: error instanceof Error ? error.message : 'Supabase tidak merespons.',
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
    form.reset(DEFAULT_LANDING_CONTENT)
    setSaveState({ status: 'idle' })
  }

  const onLogout = async () => {
    await signOut()
    router.replace('/login')
    router.refresh()
  }

  const onUploadPhoto = useCallback(
    async (file: File) => uploadPackagePhoto(await fileToCompressedBlob(file), file.name),
    [],
  )

  // Key error tingkat atas sudah senama dengan id section.
  const sectionsWithErrors = Object.keys(form.formState.errors).filter(isAdminSectionId)

  return {
    form,
    fieldArrays: { facts, highlights, packages, steps, testimonials },
    onSubmit,
    onReset,
    onLogout,
    onUploadPhoto,
    activeSection,
    setActiveSection,
    sectionsWithErrors,
    isLoading: contentQuery.isPending,
    isSaving: mutation.isPending,
    isDirty: form.formState.isDirty,
    saveState,
  }
}
