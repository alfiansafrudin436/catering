'use client'

import { Container } from '@/components'

import { CtaSection } from './components/CtaSection'
import { HeroSection } from './components/HeroSection'
import { HighlightsSection } from './components/HighlightsSection'
import { HowToOrderSection } from './components/HowToOrderSection'
import { PackagesSection } from './components/PackagesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { useLandingPage } from './hooks'

export default function LandingPage() {
  const { content, isPending, isError, errorMessage, isConfigured } = useLandingPage()

  if (!content) {
    return (
      <Container className="animate-rise-in py-24 text-center">
        <p className="text-muted-foreground text-sm">
          {!isConfigured
            ? 'Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local.'
            : isPending
              ? 'Memuat konten...'
              : isError
                ? `Gagal memuat konten: ${errorMessage ?? 'Supabase tidak merespons.'}`
                : 'Konten belum tersedia. Jalankan supabase/migrations/0002_seed_landing_content.sql.'}
        </p>
      </Container>
    )
  }

  return (
    <>
      <HeroSection brand={content.brand} hero={content.hero} facts={content.facts} />
      <HighlightsSection highlights={content.highlights} />
      <PackagesSection packages={content.packages} whatsappNumber={content.brand.whatsappNumber} />
      <HowToOrderSection howToOrder={content.howToOrder} />
      <TestimonialsSection testimonials={content.testimonials} />
      <CtaSection cta={content.cta} whatsappNumber={content.brand.whatsappNumber} />
    </>
  )
}
