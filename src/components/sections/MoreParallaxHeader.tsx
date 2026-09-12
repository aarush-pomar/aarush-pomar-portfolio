import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface MoreParallaxHeaderProps {
  title: string
  subtitle: string
}

// A scroll-driven parallax reveal for the More page's header -- a background
// glow, the title, and the subtitle each move at a different rate as you
// scroll through this section, giving the classic layered-parallax feel.
// Built on framer-motion's useScroll/useTransform (already used elsewhere on
// this site, e.g. ProjectsSection's sticky-stacking cards) rather than
// introducing GSAP + Lenis -- this site doesn't use either, and Lenis in
// particular replaces native scroll physics, which would only feel right on
// this one page and jarring everywhere else on the site.
export default function MoreParallaxHeader({ title, subtitle }: MoreParallaxHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  })

  // Background glow drifts the slowest (furthest "layer back").
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.6, 0.3, 0])

  // Title moves fastest and scales down slightly, like it's being scrolled
  // past/away from -- the "reveal" happens as the page content beneath it
  // slides up into view.
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])

  // Subtitle trails behind the title at a slower rate for depth.
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0])

  return (
    <div ref={headerRef} className="relative flex h-[70vh] items-center justify-center overflow-hidden sm:h-[80vh]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7E2EA]/[0.06] blur-3xl sm:h-[700px] sm:w-[700px]"
        style={{ y: glowY, opacity: glowOpacity }}
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.h1
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 14vw, 9rem)', y: titleY, scale: titleScale, opacity: titleOpacity }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-sm font-light uppercase tracking-wide text-[#D7E2EA]/70 sm:text-base"
          style={{ y: subtitleY, opacity: subtitleOpacity }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  )
}
