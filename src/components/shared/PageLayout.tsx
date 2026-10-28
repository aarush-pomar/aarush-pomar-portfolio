import type { ReactNode } from 'react'
import SiteNav from './SiteNav'

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F2F1EE] font-kanit text-[#0C0C0C]">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 pb-24 md:px-10">{children}</main>
    </div>
  )
}
