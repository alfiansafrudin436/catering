import * as React from 'react'

import { cn } from '@/lib/utils'

type SelectProps = React.ComponentProps<'select'>

function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'border-border bg-surface focus-visible:border-ring focus-visible:ring-ring/30 h-10 w-full rounded-lg border px-3 text-sm transition-[color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export { Select }
export type { SelectProps }
