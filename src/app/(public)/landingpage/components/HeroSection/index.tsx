import { Container, PhotoPlaceholder, WhatsAppButton } from '@/components'
import { Button } from '@/components/ui/button'
import type { BrandContent, HeroContent, ServiceFact } from '@/types'

import { GENERAL_MESSAGE } from '../../helper'

type HeroSectionProps = {
  brand: BrandContent
  hero: HeroContent
  facts: ServiceFact[]
}

export function HeroSection({ brand, hero, facts }: HeroSectionProps) {
  return (
    <section className="pt-6 pb-10 md:pt-10 md:pb-16">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-muted-foreground flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.18em] uppercase">
              <span className="bg-muted-foreground/60 hidden h-px w-8 md:block" aria-hidden />
              {hero.eyebrow}
            </p>

            <h1 className="font-display mt-5 text-[2.1rem] leading-[1.08] font-semibold tracking-tight text-balance md:mt-6 md:text-[3.5rem]">
              {hero.title}
            </h1>

            <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed md:mt-6 md:text-base">
              {hero.description}
            </p>

            <div className="mt-7 flex flex-col items-start gap-4 md:mt-8 md:flex-row md:items-center md:gap-6">
              <WhatsAppButton
                message={GENERAL_MESSAGE}
                phone={brand.whatsappNumber}
                label={hero.primaryCtaLabel}
                size="lg"
                className="w-full md:w-auto"
              />
              <Button asChild variant="link" size="md" className="px-0">
                <a href="#paket">{hero.secondaryCtaLabel}</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="bg-accent absolute -top-4 right-4 size-32 rounded-full md:-top-6 md:size-44"
              aria-hidden
            />
            <PhotoPlaceholder
              label={hero.photoLabel}
              className="relative aspect-4/5 rounded-t-[999px] rounded-b-[2rem]"
            />
          </div>
        </div>

        <ul className="border-border mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 text-xs md:mt-16 md:grid-cols-4 md:gap-8 md:border-b md:pb-6 md:text-sm">
          {facts.map((fact) => (
            <li key={fact.id} className="text-muted-foreground">
              {fact.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
