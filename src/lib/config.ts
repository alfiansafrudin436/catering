export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? '[NAMA BRAND]'

/** Nomor WhatsApp bawaan, dipakai bila konten belum menyetel nomornya sendiri. */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '628120000000'

/** Membangun link wa.me dengan pesan yang sudah ter-encode. */
export function buildWhatsAppLink(message: string, phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/**
 * Kredensial admin untuk mode tanpa backend.
 *
 * PERINGATAN: variable NEXT_PUBLIC_* ikut terbundel ke JavaScript yang dikirim
 * ke browser, jadi nilai ini bisa dibaca siapa pun yang membuka devtools. Hanya
 * untuk development. Di produksi, kosongkan keduanya dan pakai endpoint
 * /auth/login sungguhan.
 */
export const LOCAL_ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? ''
export const LOCAL_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? ''
