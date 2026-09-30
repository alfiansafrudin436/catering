import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'

import { Providers } from '@/app/providers'
import { BRAND_NAME } from '@/lib/config'

import './globals.css'

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Catering untuk setiap acara`,
  description:
    'Catering harian, kantor, dan acara keluarga. Pilih paket, kirim pesan lewat WhatsApp, lalu kami siapkan dan antar ke tempatmu.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${fraunces.variable} ${plusJakarta.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
