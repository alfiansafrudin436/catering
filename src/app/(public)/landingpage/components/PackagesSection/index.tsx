import { Container, PhotoPlaceholder, Reveal, WhatsAppButton } from '@/components'
import type { PackagesContent } from '@/types'

import { buildPackageMessage } from '../../helper'

type PackagesSectionProps = {
  packages: PackagesContent
  whatsappNumber: string
}

export function PackagesSection({ packages, whatsappNumber }: PackagesSectionProps) {
  return (
    <section id="paket" className="scroll-mt-24 py-12 md:py-20">
      <Container>
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-tight md:text-[2.75rem]">
            {packages.title}
          </h2>
          <p className="text-muted-foreground text-sm md:pb-2">{packages.note}</p>
        </Reveal>

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-6">
          {packages.items.map((item, index) => (
            <Reveal
              as="article"
              key={item.slug}
              delay={index * 120}
              className="group flex flex-col transition-transform duration-400 ease-out hover:-translate-y-1.5 motion-reduce:hover:translate-y-0"
            >
              <PhotoPlaceholder
                label={item.imageUrl ? item.name : `[FOTO PAKET ${index + 1}]`}
                src={item.imageUrl}
                className="rounded-card aspect-4/3 w-full"
              />
              <h3 className="font-display group-hover:text-primary mt-5 text-xl font-semibold tracking-tight transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold">{item.price}</p>
                <WhatsAppButton
                  message={buildPackageMessage(item.name)}
                  phone={whatsappNumber}
                  label="Pesan paket ini"
                  variant="outline"
                  size="sm"
                  className="[&_svg]:hidden"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
