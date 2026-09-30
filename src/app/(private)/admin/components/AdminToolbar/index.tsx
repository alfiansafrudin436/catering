import Link from 'next/link'
import { ExternalLink, LogOut, RotateCcw } from 'lucide-react'

import { Container } from '@/components'
import { Button } from '@/components/ui/button'

type AdminToolbarProps = {
  isSaving: boolean
  isDirty: boolean
  onReset: () => void
  onLogout: () => void
}

export function AdminToolbar({ isSaving, isDirty, onReset, onLogout }: AdminToolbarProps) {
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

        {/* Label teks disembunyikan di layar sempit supaya empat tombol tetap muat. */}
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onReset} aria-label="Reset">
            <RotateCcw className="size-4" aria-hidden />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/landingpage" target="_blank" aria-label="Lihat halaman">
              <ExternalLink className="size-4" aria-hidden />
              <span className="hidden sm:inline">Lihat halaman</span>
            </Link>
          </Button>
          <Button type="submit" size="sm" disabled={isSaving}>
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="px-2"
            aria-label="Keluar"
          >
            <LogOut className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </div>
  )
}
