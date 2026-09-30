import { z } from 'zod'

const required = (label: string) => z.string().trim().min(1, `${label} wajib diisi`)

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email wajib diisi').pipe(z.email('Format email tidak valid')),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const orderInquirySchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().min(8, 'Nomor WhatsApp tidak valid'),
  packageSlug: required('Paket'),
  portion: z.coerce.number().int().positive('Jumlah porsi harus lebih dari 0'),
  eventDate: required('Tanggal acara'),
  note: z.string().optional(),
})

export type OrderInquiryInput = z.infer<typeof orderInquirySchema>

const brandSchema = z.object({
  name: required('Nama brand'),
  address: z.string().trim(),
  whatsappNumber: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, 'Gunakan format internasional tanpa + atau spasi, contoh 628120000000'),
  instagram: z.string().trim(),
  phoneLabel: z.string().trim(),
  email: z.string().trim(),
})

const heroSchema = z.object({
  eyebrow: z.string().trim(),
  title: required('Judul hero'),
  description: z.string().trim(),
  primaryCtaLabel: required('Label tombol utama'),
  secondaryCtaLabel: z.string().trim(),
  photoLabel: z.string().trim(),
})

const factSchema = z.object({
  id: required('ID fakta'),
  label: required('Teks fakta'),
})

const highlightSchema = z.object({
  id: required('ID keunggulan'),
  icon: z.enum(['leaf', 'flame', 'clock']),
  title: required('Judul keunggulan'),
  description: z.string().trim(),
})

const packageSchema = z.object({
  slug: required('Slug paket'),
  name: required('Nama paket'),
  description: z.string().trim(),
  price: required('Harga paket'),
  imageUrl: z.string().trim().optional(),
})

const stepSchema = z.object({
  // Nomor urut tidak diinput manual; hooks.ts menomori ulang saat simpan.
  order: z.number().int().positive(),
  title: required('Judul langkah'),
  description: z.string().trim(),
})

const testimonialSchema = z.object({
  id: required('ID ulasan'),
  quote: required('Isi ulasan'),
  customerName: z.string().trim(),
  city: z.string().trim(),
})

export const landingContentSchema = z.object({
  brand: brandSchema,
  hero: heroSchema,
  facts: z.array(factSchema),
  highlights: z.object({
    title: required('Judul section keunggulan'),
    description: z.string().trim(),
    items: z.array(highlightSchema),
  }),
  packages: z.object({
    title: required('Judul section paket'),
    note: z.string().trim(),
    items: z.array(packageSchema).min(1, 'Minimal satu paket'),
  }),
  howToOrder: z.object({
    title: required('Judul section cara pesan'),
    description: z.string().trim(),
    photoLabel: z.string().trim(),
    steps: z.array(stepSchema).min(1, 'Minimal satu langkah'),
  }),
  testimonials: z.object({
    title: required('Judul section ulasan'),
    items: z.array(testimonialSchema),
  }),
  cta: z.object({
    title: required('Judul CTA'),
    description: z.string().trim(),
    buttonLabel: required('Label tombol CTA'),
  }),
})

export type LandingContentInput = z.infer<typeof landingContentSchema>
