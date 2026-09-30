import type {
  CateringPackage,
  OrderStep,
  ServiceFact,
  ServiceHighlight,
  Testimonial,
} from '@/types'

/**
 * Id section admin sengaja sama persis dengan key tingkat atas LandingContent,
 * sehingga key error dari React Hook Form langsung menunjuk ke section-nya.
 */
export type AdminSectionId =
  'brand' | 'hero' | 'facts' | 'highlights' | 'packages' | 'howToOrder' | 'testimonials' | 'cta'

export const ADMIN_SECTIONS: { id: AdminSectionId; label: string }[] = [
  { id: 'brand', label: 'Brand & Kontak' },
  { id: 'hero', label: 'Hero' },
  { id: 'facts', label: 'Fakta Layanan' },
  { id: 'highlights', label: 'Keunggulan' },
  { id: 'packages', label: 'Paket' },
  { id: 'howToOrder', label: 'Cara Pesan' },
  { id: 'testimonials', label: 'Ulasan' },
  { id: 'cta', label: 'CTA Penutup' },
]

const SECTION_IDS = ADMIN_SECTIONS.map((section) => section.id)

export function isAdminSectionId(value: string): value is AdminSectionId {
  return SECTION_IDS.includes(value as AdminSectionId)
}

/** Section bermasalah pertama menurut urutan tampilan, bukan urutan key error. */
export function findFirstSectionWithErrors(errorKeys: string[]): AdminSectionId | null {
  return SECTION_IDS.find((id) => errorKeys.includes(id)) ?? null
}

/** Ubah teks bebas menjadi slug/id yang aman dipakai sebagai key. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Buat id unik bila slugify menghasilkan string kosong atau bentrok. */
function uniqueId(prefix: string, taken: string[]) {
  let index = taken.length + 1
  while (taken.includes(`${prefix}-${index}`)) index += 1

  return `${prefix}-${index}`
}

export function createFact(taken: string[]): ServiceFact {
  return { id: uniqueId('fakta', taken), label: '' }
}

export function createHighlight(taken: string[]): ServiceHighlight {
  return { id: uniqueId('keunggulan', taken), icon: 'leaf', title: '', description: '' }
}

export function createPackage(taken: string[]): CateringPackage {
  return { slug: uniqueId('paket', taken), name: '', description: '', price: '', imageUrl: '' }
}

export function createStep(existing: OrderStep[]): OrderStep {
  const nextOrder = existing.reduce((max, step) => Math.max(max, step.order), 0) + 1

  return { order: nextOrder, title: '', description: '' }
}

export function createTestimonial(taken: string[]): Testimonial {
  return { id: uniqueId('ulasan', taken), quote: '', customerName: '', city: '' }
}

/** Nomor urut langkah selalu 1..n mengikuti posisi di daftar. */
export function renumberSteps(steps: OrderStep[]): OrderStep[] {
  return steps.map((step, index) => ({ ...step, order: index + 1 }))
}

export const HIGHLIGHT_ICON_OPTIONS = [
  { value: 'leaf', label: 'Daun (bahan segar)' },
  { value: 'flame', label: 'Api (masakan / menu)' },
  { value: 'clock', label: 'Jam (waktu / pengantaran)' },
] as const
