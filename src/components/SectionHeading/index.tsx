import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  title: string
  description?: string
  className?: string
  as?: 'h2' | 'h3'
}

export function SectionHeading({
  title,
  description,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-xl', className)}>
      <Tag className="font-display text-[2rem] leading-[1.15] font-semibold tracking-tight text-balance md:text-[2.75rem]">
        {title}
      </Tag>
      {description ? (
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
