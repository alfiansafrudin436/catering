import { Container, Reveal, SectionHeading } from '@/components'
import type { TestimonialsContent } from '@/types'

type TestimonialsSectionProps = {
  testimonials: TestimonialsContent
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="ulasan" className="scroll-mt-24 py-12 md:py-20">
      <Container>
        <Reveal>
          <SectionHeading title={testimonials.title} />
        </Reveal>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {testimonials.items.map((testimonial, index) => (
            <Reveal
              as="figure"
              key={testimonial.id}
              delay={index * 120}
              className="bg-surface border-border rounded-card hover:shadow-foreground/5 border p-6 transition-[transform,box-shadow,border-color] duration-400 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl motion-reduce:hover:translate-y-0 md:p-7"
            >
              <blockquote className="font-display text-lg leading-snug font-medium">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="text-muted-foreground mt-5 text-sm">
                {testimonial.customerName} · {testimonial.city}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
