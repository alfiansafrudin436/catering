export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? '[NAMA BRAND]'

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '628120000000'

/** Membangun link wa.me dengan pesan yang sudah ter-encode. */
export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
