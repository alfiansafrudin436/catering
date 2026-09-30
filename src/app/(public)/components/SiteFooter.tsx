import { Container } from '@/components'
import { BRAND_NAME } from '@/lib/config'

import { NAV_ITEMS } from '../helper'

export function SiteFooter() {
  return (
    <footer className="border-border border-t py-12 md:py-16">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">{BRAND_NAME}</p>
          <p className="text-muted-foreground mt-2 text-sm">[Alamat singkat / kota]</p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
          <p>[@instagram]</p>
          <p>WhatsApp [0812-XXXX-XXXX]</p>
          <p>[Email]</p>
        </div>
      </Container>
    </footer>
  )
}
