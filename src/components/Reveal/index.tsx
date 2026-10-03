'use client'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

type RevealTag = 'div' | 'section' | 'article' | 'figure' | 'li' | 'ul' | 'ol' | 'span' | 'p'

type RevealProps = {
  as?: RevealTag
  /** Variasi arah masuk elemen. */
  variant?: 'up' | 'left' | 'right' | 'zoom' | 'fade'
  /** Jeda sebelum animasi mulai (ms) — dipakai untuk stagger antar kartu. */
  delay?: number
  /** Animasikan ulang setiap kali elemen masuk viewport. */
  repeat?: boolean
  className?: string
  children: React.ReactNode
} & Pick<React.ComponentProps<'div'>, 'id' | 'style' | 'aria-hidden'>

const VARIANT_CLASS = {
  up: 'reveal-up',
  left: 'reveal-left',
  right: 'reveal-right',
  zoom: 'reveal-zoom',
  fade: 'reveal-fade',
} as const

/** Wrapper animasi: elemen fade + slide masuk saat pertama kali terlihat di viewport. */
export function Reveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  repeat = false,
  className,
  children,
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: !repeat })
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref}
      data-revealed={inView}
      className={cn('reveal', VARIANT_CLASS[variant], className)}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
