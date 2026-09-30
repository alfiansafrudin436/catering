import type { Metadata } from 'next'

import { AdminGuard } from './components/AdminGuard'

export const metadata: Metadata = {
  title: 'Kelola Konten Landing Page',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <AdminGuard>{children}</AdminGuard>
    </div>
  )
}
