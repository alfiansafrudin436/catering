import { Container, PhotoPlaceholder, Reveal } from '@/components'
import type { HowToOrderContent } from '@/types'

type HowToOrderSectionProps = {
  howToOrder: HowToOrderContent
}

export function HowToOrderSection({ howToOrder }: HowToOrderSectionProps) {
  return (
    <section id="cara-pesan" className="bg-surface-muted scroll-mt-24 py-12 md:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal variant="left">
            <PhotoPlaceholder
              label={howToOrder.photoLabel}
              className="rounded-card aspect-square w-full md:aspect-4/3"
            />
          </Reveal>

          <div>
            <Reveal variant="right">
              <h2 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-tight md:text-[2.75rem]">
                {howToOrder.title}
              </h2>
              <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed md:text-base">
                {howToOrder.description}
              </p>
            </Reveal>

            <ol className="mt-8 flex flex-col gap-5">
              {howToOrder.steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.order}
                  variant="right"
                  delay={120 + index * 110}
                  className="group flex gap-4"
                >
                  <span className="bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-transform duration-400 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100">
                    {step.order}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold md:text-base">{step.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
