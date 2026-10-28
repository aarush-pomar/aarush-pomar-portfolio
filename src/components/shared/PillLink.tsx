import type { ReactNode } from 'react'

interface PillLinkProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full border-2 border-[#230cd1] px-6 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#230cd1] transition-colors hover:bg-[#230cd1]/8'

export default function PillLink({ children, href, onClick, className }: PillLinkProps) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${className ?? ''}`}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${className ?? ''}`}>
      {children}
    </button>
  )
}
