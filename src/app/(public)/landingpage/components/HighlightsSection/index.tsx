import { Clock, Flame, Leaf } from 'lucide-react'

import { Container, Reveal, SectionHeading } from '@/components'
import { cn } from '@/lib/utils'
import type { HighlightIcon, HighlightsContent } from '@/types'

const ICONS = {
  leaf: Leaf,
  flame: Flame,
  clock: Clock,
} as const

const ICON_TONE: Record<HighlightIcon, string> = {
  leaf: 'bg-secondary text-secondary-foreground',
  flame: 'bg-primary text-primary-foreground',
  clock: 'bg-secondary text-secondary-foreground',
}

type HighlightsSectionProps = {
  highlights: HighlightsContent
}

export function HighlightsSection({ highlights }: HighlightsSectionProps) {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading title={highlights.title} description={highlights.description} />
        </Reveal>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {highlights.items.map((highlight, index) => {
            const Icon = ICONS[highlight.icon]

            return (
              <Reveal
                as="article"
                key={highlight.id}
                delay={index * 120}
                className="bg-surface-muted rounded-card group hover:shadow-foreground/5 flex flex-col p-6 transition-[transform,box-shadow] duration-400 ease-out hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0 md:p-7"
              >
                <span
                  className={cn(
                    'flex size-11 items-center justify-center rounded-full transition-transform duration-400 ease-out group-hover:scale-110 group-hover:rotate-6 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0',
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
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
