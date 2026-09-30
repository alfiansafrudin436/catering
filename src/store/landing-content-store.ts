import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DEFAULT_LANDING_CONTENT } from '@/lib/landing-content'
import type { LandingContent } from '@/types'

type LandingContentState = {
  content: LandingContent
  /**
   * Konten tersimpan baru tersedia setelah rehydrate dari localStorage.
   * Selama false, konsumen memakai DEFAULT_LANDING_CONTENT agar render server
   * dan render pertama di client identik (mencegah hydration mismatch).
   */
  hasHydrated: boolean
  setContent: (content: LandingContent) => void
  resetContent: () => void
  setHasHydrated: (value: boolean) => void
}

export const useLandingContentStore = create<LandingContentState>()(
  persist(
    (set) => ({
      content: DEFAULT_LANDING_CONTENT,
      hasHydrated: false,
      setContent: (content) => set({ content }),
      resetContent: () => set({ content: DEFAULT_LANDING_CONTENT }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'catering-landing-content',
      partialize: (state) => ({ content: state.content }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
)
