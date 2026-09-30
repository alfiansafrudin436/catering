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

export type ServiceHighlight = {
  id: string
  icon: 'leaf' | 'flame' | 'clock'
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
