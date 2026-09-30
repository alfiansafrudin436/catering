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
    onReset,
    onLogout,
    activeSection,
    setActiveSection,
    sectionsWithErrors,
    isSaving,
    isDirty,
    saveState,
  } = useAdminPage()

  const panels: Record<AdminSectionId, React.ReactNode> = {
    brand: <BrandFields form={form} />,
    hero: <HeroFields form={form} />,
    facts: <FactsFields form={form} facts={fieldArrays.facts} />,
    highlights: <HighlightsFields form={form} highlights={fieldArrays.highlights} />,
    packages: <PackagesFields form={form} packages={fieldArrays.packages} />,
    howToOrder: <HowToOrderFields form={form} steps={fieldArrays.steps} />,
    testimonials: <TestimonialsFields form={form} testimonials={fieldArrays.testimonials} />,
    cta: <CtaFields form={form} />,
  }

  return (
    <form onSubmit={onSubmit}>
      <AdminToolbar isSaving={isSaving} isDirty={isDirty} onReset={onReset} onLogout={onLogout} />

      <Container className="grid gap-5 py-6 md:grid-cols-[220px_1fr] md:gap-8 md:py-10">
        <AdminNav
          sections={ADMIN_SECTIONS}
          activeSection={activeSection}
          sectionsWithErrors={sectionsWithErrors}
          onSelect={setActiveSection}
          className="md:sticky md:top-24 md:self-start"
        />

        <div className="flex min-w-0 flex-col gap-5">
          {saveState.status === 'local' ? (
            <p className="border-border bg-surface-muted rounded-card border p-4 text-sm">
              Perubahan tersimpan di browser ini, tetapi belum terkirim ke backend:{' '}
              <span className="text-muted-foreground">{saveState.reason}</span>
            </p>
          ) : null}
          {saveState.status === 'synced' ? (
            <p className="border-border bg-surface-muted rounded-card border p-4 text-sm">
              Perubahan tersimpan dan tersinkron dengan backend.
            </p>
          ) : null}

          {panels[activeSection]}
        </div>
      </Container>
    </form>
  )
}
