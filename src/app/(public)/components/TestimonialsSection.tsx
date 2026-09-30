import { Container, SectionHeading } from '@/components'
import type { Testimonial } from '@/types'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="ulasan" className="scroll-mt-24 py-12 md:py-20">
      <Container>
        <SectionHeading title="Kata mereka yang sudah mencoba" />

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="bg-surface border-border rounded-card border p-6 md:p-7"
            >
              <blockquote className="font-display text-lg leading-snug font-medium">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="text-muted-foreground mt-5 text-sm">
                {testimonial.customerName} · {testimonial.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
