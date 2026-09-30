'use client'

import { useQuery } from '@tanstack/react-query'

import { listPackages, listTestimonials } from '@/services/catering.service'

import { FALLBACK_PACKAGES, FALLBACK_TESTIMONIALS } from './helper'

/**
 * Logic halaman landing publik.
 * Data diambil dari API; selama belum tersedia, konten placeholder tetap tampil.
 */
export function useHomePage() {
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: listPackages,
  })

  const testimonialsQuery = useQuery({
    queryKey: ['testimonials'],
    queryFn: listTestimonials,
  })

  return {
    packages: packagesQuery.data?.length ? packagesQuery.data : FALLBACK_PACKAGES,
    testimonials: testimonialsQuery.data?.length ? testimonialsQuery.data : FALLBACK_TESTIMONIALS,
    isLoading: packagesQuery.isLoading || testimonialsQuery.isLoading,
  }
}
