import * as React from 'react'

import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<'input'>

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border-border bg-surface placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-primary h-10 w-full rounded-lg border px-3 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
export type { InputProps }
