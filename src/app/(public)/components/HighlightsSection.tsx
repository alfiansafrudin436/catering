import { Clock, Flame, Leaf } from 'lucide-react'

import { Container, SectionHeading } from '@/components'
import { cn } from '@/lib/utils'
import type { ServiceHighlight } from '@/types'

import { SERVICE_HIGHLIGHTS } from '../helper'

const ICONS = {
  leaf: Leaf,
  flame: Flame,
  clock: Clock,
} as const

const ICON_TONE: Record<ServiceHighlight['icon'], string> = {
  leaf: 'bg-secondary text-secondary-foreground',
  flame: 'bg-primary text-primary-foreground',
  clock: 'bg-secondary text-secondary-foreground',
}

export function HighlightsSection() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <SectionHeading
          title="Kenapa banyak yang kembali memesan"
          description="Tiga hal sederhana yang kami jaga di setiap pesanan."
        />

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {SERVICE_HIGHLIGHTS.map((highlight) => {
            const Icon = ICONS[highlight.icon]

            return (
              <article
                key={highlight.id}
                className="bg-surface-muted rounded-card flex flex-col p-6 md:p-7"
              >
                <span
                  className={cn(
                    'flex size-11 items-center justify-center rounded-full',
                    ICON_TONE[highlight.icon],
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-display mt-6 text-xl leading-snug font-semibold md:text-[1.35rem]">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
