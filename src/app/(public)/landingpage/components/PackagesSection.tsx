import { Container, PhotoPlaceholder, WhatsAppButton } from '@/components'
import type { PackagesContent } from '@/types'

import { buildPackageMessage } from '../helper'

type PackagesSectionProps = {
  packages: PackagesContent
  whatsappNumber: string
}

export function PackagesSection({ packages, whatsappNumber }: PackagesSectionProps) {
  return (
    <section id="paket" className="scroll-mt-24 py-12 md:py-20">
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="font-display text-[2rem] leading-[1.15] font-semibold tracking-tight md:text-[2.75rem]">
            {packages.title}
          </h2>
          <p className="text-muted-foreground text-sm md:pb-2">{packages.note}</p>
        </div>

        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-3 md:gap-6">
          {packages.items.map((item, index) => (
            <article key={item.slug} className="flex flex-col">
              <PhotoPlaceholder
                label={item.imageUrl ? item.name : `[FOTO PAKET ${index + 1}]`}
                src={item.imageUrl}
                className="rounded-card aspect-4/3 w-full"
              />
              <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">
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
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
