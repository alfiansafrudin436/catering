'use client'

import Link from 'next/link'

import { Container, WhatsAppButton } from '@/components'
import { useLandingContent } from '@/hooks/use-landing-content'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/navigation'

import { GENERAL_MESSAGE } from '../../landingpage/helper'

export function SiteHeader() {
  const brand = useLandingContent()?.brand
  const scrolled = useScrolled(16)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 backdrop-blur transition-[background-color,box-shadow,border-color] duration-300 ease-out',
        scrolled
          ? 'bg-background/85 border-border/70 shadow-foreground/5 border-b shadow-sm'
          : 'bg-background/90 border-b border-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-[height] duration-300 ease-out',
          scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20',
        )}
      >
        <Link
          href="/landingpage"
          className="font-display hover:text-primary text-base font-semibold tracking-tight transition-colors duration-300 md:text-xl"
        >
          {brand?.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-primary after:bg-primary relative text-sm transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Tombol pesan butuh nomor tujuan, jadi tunggu konten tersedia. */}
        {brand ? (
          <>
            <WhatsAppButton
              message={GENERAL_MESSAGE}
              phone={brand.whatsappNumber}
              label="Pesan via WhatsApp"
              size="sm"
              className="hidden md:inline-flex"
            />
            <WhatsAppButton
              message={GENERAL_MESSAGE}
              phone={brand.whatsappNumber}
              label="Pesan"
              size="sm"
              className="h-8 px-4 text-xs md:hidden [&_svg]:hidden"
            />
          </>
        ) : null}
      </Container>
    </header>
  )
}
