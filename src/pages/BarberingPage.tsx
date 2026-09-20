import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import VerticalImageStack from '../components/ui/vertical-image-stack'
import ImageComparison from '../components/ui/image-comparison-slider'
import classicFade from '../assets/photos/haircut-classic-fade.jpg'
import groupGarage from '../assets/photos/haircut-group-garage.jpg'
import sharpLineup from '../assets/photos/haircut-sharp-lineup.jpg'
import studioChair from '../assets/photos/haircut-studio-chair.jpg'
import finishingTouches from '../assets/photos/haircut-finishing-touches.jpg'
import cleanTaper from '../assets/photos/haircut-clean-taper.jpg'
import haircutBefore from '../assets/photos/haircut-before.jpg'
import haircutAfter from '../assets/photos/haircut-after.jpg'
import seniorPortraitScissors from '../assets/photos/senior-portrait-scissors.jpg'

const haircutImages = [
  { id: 1, src: classicFade, alt: 'Modern Mullet' },
  { id: 2, src: groupGarage, alt: 'Mobile Barbering' },
  { id: 3, src: sharpLineup, alt: 'Sharp Lineup' },
  { id: 4, src: studioChair, alt: 'Between Classes' },
  { id: 5, src: finishingTouches, alt: 'Finishing Touches', objectPosition: 'right top' },
  { id: 6, src: cleanTaper, alt: 'First Taper' },
]

export default function BarberingPage() {
  return (
    <PageLayout>
      <PageHeader title="Barbering" subtitle="A look at recent work -- freelance barbering, @pomar.blendz" />

      <div className="mx-auto mb-12 max-w-[280px] px-5 sm:px-8">
        <img
          src={seniorPortraitScissors}
          alt="Aarush Pomar holding barbering scissors and a fade brush"
          className="w-full rounded-[32px] border-2 border-[#D7E2EA] object-cover sm:rounded-[40px]"
        />
      </div>

      <div className="mx-auto max-w-2xl px-5 pb-16 sm:px-8">
        <ImageComparison
          beforeImage={haircutBefore}
          afterImage={haircutAfter}
          altBefore="Before the haircut -- overgrown curls, no shape"
          altAfter="After the haircut -- tapered fade with defined curls on top"
          className="aspect-[4/5]"
        />
        <p className="mt-4 text-center text-xs uppercase tracking-widest text-[#D7E2EA]/50">Before -&gt; After -- drag to compare</p>
      </div>

      <VerticalImageStack images={haircutImages} />
    </PageLayout>
  )
}
