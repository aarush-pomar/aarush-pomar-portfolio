import { useRef } from 'react'
import type { RefObject } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../shared/FadeIn'
import Magnet from '../shared/Magnet'
import FitText from '../shared/FitText'
import portraitImg from '../../assets/portrait.webp'

interface HeroSectionProps {
  /** The page's persistent SiteNav bar -- excluded from the portrait's
   *  magnetic pull so it doesn't visibly reach for a cursor sitting over
   *  the nav bar above it. */
  navRef?: RefObject<HTMLElement | null>
}

export default function HeroSection({ navRef }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <div className="overflow-hidden px-6 pt-14 md:px-10 md:pt-20">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full select-none font-black uppercase leading-[0.95] tracking-tighter sm:mt-4 md:-mt-2">
            <FitText text="Hello, I am" className="block whitespace-nowrap" />
            <FitText text="Aarush Pomar" className="block whitespace-nowrap" />
          </h1>
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-[220px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[280px] sm:translate-y-0 md:w-[340px] lg:w-[400px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            strength={2.2}
            excludeRefs={navRef ? [navRef] : []}
            activeAreaRef={sectionRef}
            maxOffset={70}
            maxOffsetUp={160}
          >
            <img src={portraitImg} alt="Aarush" className="w-full" />
          </Magnet>
        </FadeIn>
      </div>

      <div className="flex items-end justify-between px-6 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a student, social entrepreneur, and advocate turning everyday skills into impact
          </p>
        </FadeIn>
      </div>

      {/* Centering is on the plain wrapper, not the motion.div -- framer-motion's
          inline transform would overwrite a Tailwind -translate-x-1/2. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-2 text-[#D7E2EA]/60">
            <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: 'easeInOut' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
