'use client'

import { CtaSection } from './components/CtaSection'
import { HeroSection } from './components/HeroSection'
import { HighlightsSection } from './components/HighlightsSection'
import { HowToOrderSection } from './components/HowToOrderSection'
import { PackagesSection } from './components/PackagesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { useHomePage } from './hooks'

export default function HomePage() {
  const { packages, testimonials } = useHomePage()

  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <PackagesSection packages={packages} />
      <HowToOrderSection />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  )
}
