import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

type RepeatableItemProps = {
  title: string
  onRemove: () => void
  canRemove: boolean
  children: React.ReactNode
}

export function RepeatableItem({ title, onRemove, canRemove, children }: RepeatableItemProps) {
  return (
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{title}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          disabled={!canRemove}
          className="text-muted-foreground hover:text-primary h-8 px-2"
          aria-label={`Hapus ${title}`}
        >
          <Trash2 className="size-4" aria-hidden />
        </Button>
      </div>
      {children}
    </div>
  )
}
