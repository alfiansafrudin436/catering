import type {
  CateringPackage,
  OrderStep,
  ServiceFact,
  ServiceHighlight,
  Testimonial,
} from '@/types'

/** Item navigasi header dan footer halaman publik. */
export const NAV_ITEMS = [
  { label: 'Paket', href: '#paket' },
  { label: 'Cara Pesan', href: '#cara-pesan' },
  { label: 'Ulasan', href: '#ulasan' },
]

/** Fakta layanan pada strip di bawah hero. */
export const SERVICE_FACTS: ServiceFact[] = [
  { id: 'min-order', label: 'Min. pesanan [JUMLAH] porsi' },
  { id: 'lead-time', label: 'Pesan H-[X] sebelum acara' },
  { id: 'halal', label: 'Halal · [NO. SERTIFIKAT]' },
  { id: 'coverage', label: 'Area antar [AREA]' },
]

export const SERVICE_HIGHLIGHTS: ServiceHighlight[] = [
  {
    id: 'bahan-segar',
    icon: 'leaf',
    title: 'Bahan segar, dimasak di hari acara',
    description: '[Jelaskan sumber bahan dan waktu memasak.]',
  },
  {
    id: 'menu-custom',
    icon: 'flame',
    title: 'Menu bisa disesuaikan',
    description: '[Jelaskan opsi ganti lauk, pantangan, atau porsi.]',
  },
  {
    id: 'pengantaran',
    icon: 'clock',
    title: 'Diantar sampai tujuan',
    description: '[Jelaskan pengemasan, jam antar, dan area layanan.]',
  },
]

export const ORDER_STEPS: OrderStep[] = [
  { order: 1, title: 'Pilih paket', description: 'Tentukan paket dan jumlah porsi.' },
  {
    order: 2,
    title: 'Kirim pesan lewat WhatsApp',
    description: 'Isi tanggal, jam, dan alamat antar.',
  },
  {
    order: 3,
    title: 'Terima pesanan',
    description: 'Kami konfirmasi harga lalu menyiapkan hidanganmu.',
  },
]

/** Data awal yang dipakai sebelum/bila API belum tersedia. */
export const FALLBACK_PACKAGES: CateringPackage[] = [
  {
    slug: 'paket-1',
    name: '[NAMA PAKET 1]',
    description: '[Isi paket: nasi, lauk, sayur, dll.]',
    price: '[HARGA / PORSI]',
  },
  {
    slug: 'paket-2',
    name: '[NAMA PAKET 2]',
    description: '[Isi paket: nasi, lauk, sayur, dll.]',
    price: '[HARGA / PORSI]',
  },
  {
    slug: 'paket-3',
    name: '[NAMA PAKET 3]',
    description: '[Isi paket: nasi, lauk, sayur, dll.]',
    price: '[HARGA / PORSI]',
  },
]

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'ulasan-1',
    quote: '[Tempel ulasan asli pelanggan di sini.]',
    customerName: '[Nama pelanggan]',
    city: '[Kota]',
  },
  {
    id: 'ulasan-2',
    quote: '[Tempel ulasan asli pelanggan di sini.]',
    customerName: '[Nama pelanggan]',
    city: '[Kota]',
  },
  {
    id: 'ulasan-3',
    quote: '[Tempel ulasan asli pelanggan di sini.]',
    customerName: '[Nama pelanggan]',
    city: '[Kota]',
  },
]

/** Menyusun teks pesan WhatsApp untuk pemesanan sebuah paket. */
export function buildPackageMessage(packageName: string) {
  return `Halo, saya ingin memesan catering ${packageName}. Boleh dibantu informasi harga dan ketersediaannya?`
}

export const GENERAL_MESSAGE =
  'Halo, saya ingin bertanya tentang paket catering yang tersedia. Boleh dibantu?'
