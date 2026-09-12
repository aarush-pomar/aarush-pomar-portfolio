import type { ReactNode } from 'react'
import SiteNav from './SiteNav'

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0C0C0C] font-kanit text-[#D7E2EA]">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 pb-24 md:px-10">{children}</main>
    </div>
  )
}
