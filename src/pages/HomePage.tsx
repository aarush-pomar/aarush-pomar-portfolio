import { useRef } from 'react'
import SiteNav from '../components/shared/SiteNav'
import HeroSection from '../components/sections/HeroSection'
import MarqueeSection from '../components/sections/MarqueeSection'
import HomeIntroSection from '../components/sections/HomeIntroSection'
import MyStorySection from '../components/sections/MyStorySection'

export default function HomePage() {
  const navRef = useRef<HTMLElement>(null)

  return (
    <>
      <SiteNav ref={navRef} />
      <HeroSection navRef={navRef} />
      <MarqueeSection />
      <MyStorySection />
      <HomeIntroSection />
    </>
  )
}
