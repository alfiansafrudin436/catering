'use client'

import { Container } from '@/components'

import { AdminToolbar } from './components/AdminToolbar'
import { BrandFields } from './components/BrandFields'
import { CtaFields } from './components/CtaFields'
import { HeroFields } from './components/HeroFields'
import { HighlightsFields } from './components/HighlightsFields'
import { HowToOrderFields } from './components/HowToOrderFields'
import { PackagesFields } from './components/PackagesFields'
import { TestimonialsFields } from './components/TestimonialsFields'
import { useAdminPage } from './hooks'

export default function AdminPage() {
  const { form, fieldArrays, onSubmit, onReset, isSaving, isDirty, saveState } = useAdminPage()

  return (
    <form onSubmit={onSubmit}>
      <AdminToolbar isSaving={isSaving} isDirty={isDirty} onReset={onReset} />

      <Container className="flex flex-col gap-5 py-8 md:py-10">
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

        <BrandFields form={form} />
        <HeroFields form={form} facts={fieldArrays.facts} />
        <HighlightsFields form={form} highlights={fieldArrays.highlights} />
        <PackagesFields form={form} packages={fieldArrays.packages} />
        <HowToOrderFields form={form} steps={fieldArrays.steps} />
        <TestimonialsFields form={form} testimonials={fieldArrays.testimonials} />
        <CtaFields form={form} />
      </Container>
    </form>
  )
}
