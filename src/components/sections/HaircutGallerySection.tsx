import VerticalImageStack from '../ui/vertical-image-stack'
import classicFade from '../../assets/photos/haircut-classic-fade.jpg'
import groupGarage from '../../assets/photos/haircut-group-garage.jpg'
import sharpLineup from '../../assets/photos/haircut-sharp-lineup.jpg'
import studioChair from '../../assets/photos/haircut-studio-chair.jpg'
import finishingTouches from '../../assets/photos/haircut-finishing-touches.jpg'
import cleanTaper from '../../assets/photos/haircut-clean-taper.jpg'

const haircutImages = [
  { id: 1, src: classicFade, alt: 'Modern Mullet' },
  { id: 2, src: groupGarage, alt: 'Mobile Barbering' },
  { id: 3, src: sharpLineup, alt: 'Sharp Lineup' },
  { id: 4, src: studioChair, alt: 'Between Classes' },
  { id: 5, src: finishingTouches, alt: 'Finishing Touches', objectPosition: 'right top' },
  { id: 6, src: cleanTaper, alt: 'First Taper' },
]

export default function HaircutGallerySection() {
  return (
    <section className="bg-[#0C0C0C]">
      <div className="mx-auto max-w-4xl px-5 pt-20 text-center sm:px-8 md:px-10">
        <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
          Haircuts
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[#D7E2EA]/60 sm:text-base">
          A look at recent work -- freelance barbering, @pomar.blendz
        </p>
      </div>

      <VerticalImageStack images={haircutImages} />
    </section>
  )
}
