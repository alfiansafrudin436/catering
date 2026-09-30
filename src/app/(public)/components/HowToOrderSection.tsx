import { Container, PhotoPlaceholder } from '@/components'

import { ORDER_STEPS } from '../helper'

export function HowToOrderSection() {
  return (
    <section id="cara-pesan" className="bg-surface-muted scroll-mt-24 py-12 md:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <PhotoPlaceholder
            label="[FOTO DAPUR / PENGANTARAN]"
            className="rounded-card aspect-square w-full md:aspect-4/3"
          />

          <div>
            <h2 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-tight md:text-[2.75rem]">
              Pesan catering semudah kirim chat
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed md:text-base">
              [Ceritakan singkat siapa yang memasak dan apa yang kamu jaga di setiap hidangan.]
            </p>

            <ol className="mt-8 flex flex-col gap-5">
              {ORDER_STEPS.map((step) => (
                <li key={step.order} className="flex gap-4">
                  <span className="bg-secondary text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {step.order}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold md:text-base">{step.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
