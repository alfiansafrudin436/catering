import Link from 'next/link'
import { ExternalLink, RotateCcw } from 'lucide-react'

import { Container } from '@/components'
import { Button } from '@/components/ui/button'

type AdminToolbarProps = {
  isSaving: boolean
  isDirty: boolean
  onReset: () => void
}

export function AdminToolbar({ isSaving, isDirty, onReset }: AdminToolbarProps) {
  return (
    <div className="border-border bg-background/90 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex h-auto flex-wrap items-center justify-between gap-3 py-3 md:h-20 md:flex-nowrap md:py-0">
        <div>
          <h1 className="font-display text-lg font-semibold tracking-tight md:text-xl">
            Kelola Konten Landing Page
          </h1>
          <p className="text-muted-foreground text-xs">
            {isDirty ? 'Ada perubahan yang belum disimpan.' : 'Semua perubahan tersimpan.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="size-4" aria-hidden />
            Reset
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/landingpage" target="_blank">
              <ExternalLink className="size-4" aria-hidden />
              Lihat halaman
            </Link>
          </Button>
          <Button type="submit" size="sm" disabled={isSaving}>
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </Container>
    </div>
  )
}
