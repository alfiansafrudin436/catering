import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out active:scale-[0.97] active:duration-75 motion-reduce:transform-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm shadow-secondary/20 hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25',
        outline:
          'border border-foreground/25 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/5',
        cream:
          'bg-surface text-foreground hover:bg-surface/85 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/15',
        ghost: 'bg-transparent text-foreground hover:bg-foreground/5',
        link: 'bg-transparent text-foreground underline underline-offset-4 hover:text-primary active:scale-100',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-13 px-7 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }
export type { ButtonProps }
