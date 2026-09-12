import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Megaphone, FlaskConical, PenLine, FileText, Scissors, LayoutGrid, type LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Advocacy', to: '/advocacy', icon: Megaphone },
  { label: 'Research', to: '/research', icon: FlaskConical },
  { label: 'Writing', to: '/writing', icon: PenLine },
  { label: 'Resume', to: '/resume', icon: FileText },
  { label: 'Barbering', to: '/barbering', icon: Scissors },
  { label: 'More', to: '/more', icon: LayoutGrid },
]

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 overflow-x-auto border-b border-[#D7E2EA]/15 bg-[#0C0C0C]/95 px-6 py-4 backdrop-blur md:px-10">
      <NavLink
        to="/"
        className="shrink-0 font-black uppercase tracking-tight text-[#D7E2EA] transition-opacity hover:opacity-70"
      >
        Aarush Pomar
      </NavLink>

      <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#D7E2EA]/15 bg-[#141414]/60 p-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              aria-label={item.label}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors sm:px-5 sm:text-sm ${
                  isActive ? 'text-[#BBCCD7]' : 'text-[#D7E2EA]/70 hover:text-[#D7E2EA]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden">
                    <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-lamp"
                      className="absolute inset-0 -z-10 rounded-full bg-[#D7E2EA]/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    >
                      <span className="absolute -top-1 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#BBCCD7]">
                        <span className="absolute -left-2 -top-2 h-6 w-10 rounded-full bg-[#BBCCD7]/20 blur-md" />
                      </span>
                    </motion.div>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
