import * as React from 'react'

import { cn } from '@/lib/utils'

type TextareaProps = React.ComponentProps<'textarea'>

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'border-border bg-surface placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-primary min-h-20 w-full rounded-lg border px-3 py-2 text-sm transition-[color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
