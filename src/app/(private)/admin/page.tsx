'use client'

import { Container } from '@/components'

import { AdminNav } from './components/AdminNav'
import { AdminToolbar } from './components/AdminToolbar'
import { BrandFields } from './components/BrandFields'
import { CtaFields } from './components/CtaFields'
import { FactsFields } from './components/FactsFields'
import { HeroFields } from './components/HeroFields'
import { HighlightsFields } from './components/HighlightsFields'
import { HowToOrderFields } from './components/HowToOrderFields'
import { PackagesFields } from './components/PackagesFields'
import { TestimonialsFields } from './components/TestimonialsFields'
import { ADMIN_SECTIONS, type AdminSectionId } from './helper'
import { useAdminPage } from './hooks'

export default function AdminPage() {
  const {
    form,
    fieldArrays,
    onSubmit,
    onRevert,
    onLogout,
    onUploadPhoto,
    activeSection,
    setActiveSection,
    sectionsWithErrors,
    isLoading,
    isSaving,
    isDirty,
    saveState,
  } = useAdminPage()

  const panels: Record<AdminSectionId, React.ReactNode> = {
    brand: <BrandFields form={form} />,
    hero: <HeroFields form={form} />,
    facts: <FactsFields form={form} facts={fieldArrays.facts} />,
    highlights: <HighlightsFields form={form} highlights={fieldArrays.highlights} />,
    packages: (
      <PackagesFields form={form} packages={fieldArrays.packages} onUploadPhoto={onUploadPhoto} />
    ),
    howToOrder: <HowToOrderFields form={form} steps={fieldArrays.steps} />,
    testimonials: <TestimonialsFields form={form} testimonials={fieldArrays.testimonials} />,
    cta: <CtaFields form={form} />,
  }

  return (
    <form onSubmit={onSubmit}>
      <AdminToolbar isSaving={isSaving} isDirty={isDirty} onRevert={onRevert} onLogout={onLogout} />

      <Container className="grid gap-5 py-6 md:grid-cols-[220px_1fr] md:gap-8 md:py-10">
        <AdminNav
          sections={ADMIN_SECTIONS}
          activeSection={activeSection}
          sectionsWithErrors={sectionsWithErrors}
          onSelect={setActiveSection}
          className="md:sticky md:top-24 md:self-start"
        />

        <div className="flex min-w-0 flex-col gap-5">
          {saveState.status === 'error' ? (
            <p className="border-primary/40 bg-surface-muted rounded-card border p-4 text-sm">
              Gagal menyimpan ke Supabase:{' '}
              <span className="text-muted-foreground">{saveState.reason}</span>
            </p>
          ) : null}
          {saveState.status === 'saved' ? (
            <p className="border-border bg-surface-muted rounded-card border p-4 text-sm">
              Perubahan tersimpan.
            </p>
          ) : null}

          {isLoading ? (
            <p className="text-muted-foreground rounded-card border-border border p-6 text-sm">
              Memuat konten...
            </p>
          ) : (
            panels[activeSection]
          )}
        </div>
      </Container>
    </form>
  )
}
