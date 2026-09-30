'use client'

import { CtaSection } from './components/CtaSection'
import { HeroSection } from './components/HeroSection'
import { HighlightsSection } from './components/HighlightsSection'
import { HowToOrderSection } from './components/HowToOrderSection'
import { PackagesSection } from './components/PackagesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { useLandingPage } from './hooks'

export default function LandingPage() {
  const { content } = useLandingPage()

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
