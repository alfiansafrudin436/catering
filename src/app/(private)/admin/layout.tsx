import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelola Konten Landing Page',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Penjagaan sesi ada di src/middleware.ts, di sisi server.
  return <div className="bg-background min-h-screen">{children}</div>
}
