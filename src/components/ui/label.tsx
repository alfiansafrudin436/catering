import * as React from 'react'

import { cn } from '@/lib/utils'

type LabelProps = React.ComponentProps<'label'>

function Label({ className, ...props }: LabelProps) {
  return <label className={cn('text-xs font-medium', className)} {...props} />
}

export { Label }
export type { LabelProps }
