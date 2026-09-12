import HeroSection from '../components/sections/HeroSection'
import MarqueeSection from '../components/sections/MarqueeSection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import HaircutGallerySection from '../components/sections/HaircutGallerySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <HaircutGallerySection />
    </>
  )
}
