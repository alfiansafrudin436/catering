import { Container, WhatsAppButton } from '@/components'
import type { CtaContent } from '@/types'

import { GENERAL_MESSAGE } from '../helper'

type CtaSectionProps = {
  cta: CtaContent
  whatsappNumber: string
}

export function CtaSection({ cta, whatsappNumber }: CtaSectionProps) {
  return (
    <section className="pb-12 md:pb-20">
      <Container>
        <div className="bg-secondary text-secondary-foreground rounded-[1.5rem] px-6 py-12 text-center md:rounded-[2rem] md:px-10 md:py-16">
          <h2 className="font-display mx-auto max-w-lg text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-balance md:text-[2.5rem]">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed opacity-85 md:text-base">
            {cta.description}
          </p>
          <WhatsAppButton
            message={GENERAL_MESSAGE}
            phone={whatsappNumber}
            label={cta.buttonLabel}
            variant="cream"
            size="lg"
            className="mt-8 w-full md:w-auto"
          />
        </div>
      </Container>
    </section>
  )
}
