import { Container, WhatsAppButton } from '@/components'
import { BRAND_NAME } from '@/lib/config'

import { GENERAL_MESSAGE, NAV_ITEMS } from '../helper'

export function SiteHeader() {
  return (
    <header className="bg-background/90 sticky top-0 z-50 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#top" className="font-display text-base font-semibold tracking-tight md:text-xl">
          {BRAND_NAME}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-primary text-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <WhatsAppButton
          message={GENERAL_MESSAGE}
          label="Pesan via WhatsApp"
          size="sm"
          className="hidden md:inline-flex"
        />
        <WhatsAppButton
          message={GENERAL_MESSAGE}
          label="Pesan"
          size="sm"
          className="h-8 px-4 text-xs md:hidden [&_svg]:hidden"
        />
      </Container>
    </header>
  )
}
