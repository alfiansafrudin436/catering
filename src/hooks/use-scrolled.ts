'use client'

import { useEffect, useState } from 'react'

/** True setelah halaman di-scroll melewati `offset` px — untuk efek header. */
export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset)

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => window.removeEventListener('scroll', update)
  }, [offset])

  return scrolled
}
