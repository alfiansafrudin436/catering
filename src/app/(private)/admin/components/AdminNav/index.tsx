import {
  Award,
  Image as ImageIcon,
  ListOrdered,
  MessageSquareQuote,
  Store,
  Tags,
  TextQuote,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import type { AdminSectionId } from '../../helper'

const SECTION_ICONS: Record<AdminSectionId, LucideIcon> = {
  brand: Store,
  hero: ImageIcon,
  facts: Tags,
  highlights: Award,
  packages: Sparkles,
  howToOrder: ListOrdered,
  testimonials: MessageSquareQuote,
  cta: TextQuote,
}

type AdminNavProps = {
  sections: { id: AdminSectionId; label: string }[]
  activeSection: AdminSectionId
  sectionsWithErrors: AdminSectionId[]
  onSelect: (id: AdminSectionId) => void
  className?: string
}

/**
 * Navigasi section admin.
 *
 * Satu markup untuk dua bentuk: baris chip yang bisa digeser di ponsel, kolom
 * vertikal mulai breakpoint md.
 */
export function AdminNav({
  sections,
  activeSection,
  sectionsWithErrors,
  onSelect,
  className,
}: AdminNavProps) {
  return (
    <nav
      aria-label="Bagian konten"
      className={cn(
        'flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-x-visible md:pb-0',
        className,
      )}
    >
      {sections.map((section) => {
        const Icon = SECTION_ICONS[section.id]
        const isActive = section.id === activeSection
        const hasError = sectionsWithErrors.includes(section.id)

        return (
          <button
            // Tanpa type="button" tombol ini akan men-submit form pembungkusnya.
            type="button"
            key={section.id}
            onClick={() => onSelect(section.id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors md:rounded-lg md:px-3',
              isActive
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {section.label}
            {hasError ? (
              <span
                className={cn(
                  'size-1.5 shrink-0 rounded-full',
                  isActive ? 'bg-accent' : 'bg-primary',
                )}
                role="img"
                aria-label="ada isian yang belum benar"
              />
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}
