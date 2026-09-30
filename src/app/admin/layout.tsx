import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelola Konten Landing Page',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background min-h-screen">{children}</div>
}
