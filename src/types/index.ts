export type ApiEnvelope<T> = {
  success: boolean
  data: T
  message: string
  statusCode: number
}

export type CateringPackage = {
  slug: string
  name: string
  description: string
  price: string
  imageUrl?: string
}

export type Testimonial = {
  id: string
  quote: string
  customerName: string
  city: string
}

export type HighlightIcon = 'leaf' | 'flame' | 'clock'

export type ServiceHighlight = {
  id: string
  icon: HighlightIcon
  title: string
  description: string
}

export type OrderStep = {
  order: number
  title: string
  description: string
}

export type ServiceFact = {
  id: string
  label: string
}

export type BrandContent = {
  name: string
  address: string
  whatsappNumber: string
  instagram: string
  phoneLabel: string
  email: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  description: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  photoLabel: string
}

export type HighlightsContent = {
  title: string
  description: string
  items: ServiceHighlight[]
}

export type PackagesContent = {
  title: string
  note: string
  items: CateringPackage[]
}

export type HowToOrderContent = {
  title: string
  description: string
  photoLabel: string
  steps: OrderStep[]
}

export type TestimonialsContent = {
  title: string
  items: Testimonial[]
}

export type CtaContent = {
  title: string
  description: string
  buttonLabel: string
}

/** Seluruh konten landing page yang bisa diubah lewat halaman admin. */
export type LandingContent = {
  brand: BrandContent
  hero: HeroContent
  facts: ServiceFact[]
  highlights: HighlightsContent
  packages: PackagesContent
  howToOrder: HowToOrderContent
  testimonials: TestimonialsContent
  cta: CtaContent
}
