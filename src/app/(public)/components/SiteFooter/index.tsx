'use client'

import { Container } from '@/components'
import { useLandingContent } from '@/hooks/use-landing-content'
import { NAV_ITEMS } from '@/lib/navigation'

export function SiteFooter() {
  const brand = useLandingContent()?.brand

  return (
    <footer className="border-border border-t py-12 md:py-16">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">{brand?.name}</p>
          <p className="text-muted-foreground mt-2 text-sm">{brand?.address}</p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
          <p>{brand?.instagram}</p>
          <p>{brand ? `WhatsApp ${brand.phoneLabel}` : null}</p>
          <p>{brand?.email}</p>
        </div>
      </Container>
    </footer>
  )
}
