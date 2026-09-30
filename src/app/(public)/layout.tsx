import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
