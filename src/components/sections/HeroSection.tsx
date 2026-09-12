import { useRef } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../shared/FadeIn'
import Magnet from '../shared/Magnet'
import FitText from '../shared/FitText'
import portraitImg from '../../assets/portrait.png'

const NAV_LINKS = [
  { label: 'Advocacy', to: '/advocacy' },
  { label: 'Research', to: '/research' },
  { label: 'Writing', to: '/writing' },
  { label: 'Resume', to: '/resume' },
  { label: 'More', to: '/more' },
]

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null)

  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn ref={navRef} as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
          >
            {link.label}
          </Link>
        ))}
      </FadeIn>

      <div className="overflow-hidden px-6 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full font-black uppercase leading-[0.95] tracking-tighter sm:mt-4 md:-mt-2">
            <FitText text="Hello, I am" className="block whitespace-nowrap" />
            <FitText text="Aarush Pomar" className="block whitespace-nowrap" />
          </h1>
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-[320px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[420px] sm:translate-y-0 md:w-[500px] lg:w-[600px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={180}
            strength={2.2}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            excludeRefs={[navRef]}
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
            a student, barber, and advocate turning everyday skills into impact
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
