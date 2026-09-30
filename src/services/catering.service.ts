import { request } from '@/services/api'
import type { CateringPackage, Testimonial } from '@/types'

export async function listPackages(): Promise<CateringPackage[]> {
  return request<CateringPackage[]>('/packages')
}

export async function listTestimonials(): Promise<Testimonial[]> {
  return request<Testimonial[]>('/testimonials')
}
