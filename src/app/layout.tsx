import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'

import { Providers } from '@/app/providers'
import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import { getLandingContentFromServer } from '@/services/content.server'

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

/** Judul dan deskripsi ikut konten yang diatur lewat halaman admin. */
export async function generateMetadata(): Promise<Metadata> {
  const content = (await getLandingContentFromServer()) ?? DEFAULT_LANDING_CONTENT

  return {
    title: `${content.brand.name} — Catering untuk setiap acara`,
    description: content.hero.description,
  }
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
