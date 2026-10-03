'use client'

import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  /** Jarak trigger relatif viewport; default memicu sedikit sebelum elemen terlihat penuh. */
  rootMargin?: string
  threshold?: number
  /** Setelah terlihat sekali, state tidak di-reset saat elemen keluar viewport. */
  once?: boolean
}

export function useInView<T extends HTMLElement = HTMLElement>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Browser/lingkungan tanpa IntersectionObserver: tampilkan pada frame berikutnya.
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setInView(true))

      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
          return
        }

        if (!once) setInView(false)
      },
      { rootMargin, threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
