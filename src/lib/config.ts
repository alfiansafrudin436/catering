/**
 * Membangun link wa.me dengan pesan yang sudah ter-encode.
 *
 * Nomor tujuan selalu berasal dari konten (brand.whatsappNumber), bukan
 * environment variable, supaya bisa diubah lewat halaman admin.
 */
export function buildWhatsAppLink(message: string, phone: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
