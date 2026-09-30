'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LANDING_CONTENT_KEY, useLandingContentQuery } from '@/hooks/use-landing-content'
import { fileToCompressedBlob } from '@/lib/image'
import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { landingContentSchema, type LandingContentInput } from '@/lib/validation'
import { updateLandingContent } from '@/services/content.service'
import { signOut } from '@/services/auth.service'
import { uploadPackagePhoto } from '@/services/storage.service'
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
  const queryClient = useQueryClient()
  const usesSupabase = isSupabaseConfigured()

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

  const contentQuery = useLandingContentQuery()

  // Isi form sekali saja saat konten pertama tersedia. Tanpa penjaga ini,
  // refetch di tengah pengeditan akan menimpa apa yang sedang diketik.
  const hasSeededRef = useRef(false)
  const isContentReady = usesSupabase ? !contentQuery.isPending : hasHydrated

  useEffect(() => {
    if (hasSeededRef.current || !isContentReady) return

    hasSeededRef.current = true
    form.reset(contentQuery.data ?? storedContent)
  }, [isContentReady, contentQuery.data, storedContent, form])

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

      // Simpan lokal lebih dulu supaya pratinjau selalu mencerminkan isi form.
      setContent(payload)
      form.reset(payload)

      if (!usesSupabase) {
        setSaveState({
          status: 'local',
          reason: 'Supabase belum dikonfigurasi, jadi konten hanya tersimpan di browser ini.',
        })

        return
      }

      try {
        const saved = await mutation.mutateAsync(payload)
        setContent(saved)
        form.reset(saved)
        queryClient.setQueryData(LANDING_CONTENT_KEY, saved)
        setSaveState({ status: 'synced' })
      } catch (error) {
        setSaveState({
          status: 'local',
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
    resetContent()
    form.reset(DEFAULT_LANDING_CONTENT)
    setSaveState({ status: 'idle' })
  }

  const onLogout = async () => {
    await signOut()
    logout()
    router.replace('/login')
    router.refresh()
  }

  /**
   * Tanpa Supabase, biarkan undefined supaya ImagePicker jatuh ke data URL.
   * Dengan Supabase, foto dikompresi lalu diunggah dan yang disimpan URL-nya.
   */
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
    onUploadPhoto: usesSupabase ? onUploadPhoto : undefined,
    activeSection,
    setActiveSection,
    sectionsWithErrors,
    isSaving: mutation.isPending,
    isDirty: form.formState.isDirty,
    saveState,
  }
}
