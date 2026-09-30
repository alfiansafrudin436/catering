import { cn } from '@/lib/utils'

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1120px] px-5 md:px-10', className)}>{children}</div>
  )
}
