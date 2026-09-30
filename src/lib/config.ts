export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? '[NAMA BRAND]'

/** Nomor WhatsApp bawaan, dipakai bila konten belum menyetel nomornya sendiri. */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '628120000000'

/** Membangun link wa.me dengan pesan yang sudah ter-encode. */
export function buildWhatsAppLink(message: string, phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
