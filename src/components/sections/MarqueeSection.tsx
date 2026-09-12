import { useEffect, useRef, useState } from 'react'
import awardUmtympMom from '../../assets/photos/award-umtymp-mom.jpg'
import familyGraduation from '../../assets/photos/family-graduation.jpg'
import sisterGraduation from '../../assets/photos/sister-graduation.jpg'
import haircutClassicFade from '../../assets/photos/haircut-classic-fade.jpg'
import haircutFinishingTouches from '../../assets/photos/haircut-finishing-touches.jpg'
import friendsSuitsLake from '../../assets/photos/friends-suits-lake.jpg'
import friendsSuitsField from '../../assets/photos/friends-suits-field.jpg'
import haircutGroupGarage from '../../assets/photos/haircut-group-garage.jpg'
import borgenCheck from '../../assets/photos/borgen-check.jpg'
import friendsNightLights from '../../assets/photos/friends-night-lights.jpg'
import haircutStudioChair from '../../assets/photos/haircut-studio-chair.jpg'
import haircutSharpLineup from '../../assets/photos/haircut-sharp-lineup.jpg'
import haircutCurlyHighlights from '../../assets/photos/haircut-curly-highlights.jpg'
import minnsectShowStage from '../../assets/photos/minnsect-show-stage.jpg'
import haircutBackTaper from '../../assets/photos/haircut-back-taper.jpg'
import formalCoupleBackyard from '../../assets/photos/formal-couple-backyard.jpg'
import friendsCarouselFair from '../../assets/photos/friends-carousel-fair.jpg'
import friendsHifiLake from '../../assets/photos/friends-hifi-lake.jpg'
import dadGhirardelli from '../../assets/photos/dad-ghirardelli.jpg'
import friendsConcertSunglasses from '../../assets/photos/friends-concert-sunglasses.jpg'
import santaMonicaSunset from '../../assets/photos/santa-monica-sunset.jpg'

interface MarqueePhoto {
  src: string
  label: string
  /** 'contain' for the rare photo where a group spans edge-to-edge and a
   *  center crop risks cutting someone off -- everything else safely uses
   *  'cover' since these are all close to the tile's 3:4 ratio already. */
  fit?: 'cover' | 'contain'
  objectPosition?: string
}

// 21 distinct photos now (11 + 10, tripled below for the seamless scroll
// loop) -- no repeats needed. Deliberately interleaved so the same category
// (haircuts, prom, friends/concerts, family, academics) never appears twice
// in a row within either row.
const ROW1: MarqueePhoto[] = [
  { src: haircutFinishingTouches, label: 'Finishing touches, haircut' },
  { src: familyGraduation, label: "Family at my sister's graduation" },
  { src: haircutClassicFade, label: 'Modern mullet haircut' },
  { src: friendsSuitsLake, label: 'Prom night at Excelsior Commons' },
  { src: friendsNightLights, label: 'VANTAGE Health Sciences crew' },
  { src: santaMonicaSunset, label: 'Sunset at Santa Monica Pier', objectPosition: '20% center' },
  { src: borgenCheck, label: '$1,000 check for The Borgen Project' },
  { src: awardUmtympMom, label: 'UMTYMP graduation, with my mom' },
  { src: sisterGraduation, label: 'With my sister, U of M graduation' },
  { src: haircutGroupGarage, label: 'Mobile barbering' },
  { src: friendsSuitsField, label: 'Prom dance at Veterans Field' },
]

const ROW2: MarqueePhoto[] = [
  { src: friendsCarouselFair, label: 'Friends at the fair' },
  { src: haircutSharpLineup, label: 'Sharp lineup haircut' },
  { src: dadGhirardelli, label: 'With my dad, San Francisco' },
  { src: haircutStudioChair, label: 'Between classes, haircut' },
  { src: formalCoupleBackyard, label: 'Formal night' },
  { src: friendsHifiLake, label: 'HiFi on the Lake' },
  { src: minnsectShowStage, label: 'The Great Minnsect Show' },
  { src: haircutCurlyHighlights, label: 'Curly highlights haircut' },
  { src: friendsConcertSunglasses, label: 'Summer concert' },
  { src: haircutBackTaper, label: 'Fresh taper' },
]

const TILE_CLASS = 'h-[340px] w-[255px] shrink-0 overflow-hidden rounded-2xl bg-black'

function tripled(row: MarqueePhoto[]) {
  return [...row, ...row, ...row]
}

function MarqueeTile({ photo }: { photo: MarqueePhoto }) {
  const fit = photo.fit ?? 'cover'
  return (
    <div className={`flex items-center justify-center ${TILE_CLASS}`}>
      <img
        src={photo.src}
        alt={photo.label}
        className={fit === 'cover' ? 'h-full w-full object-cover' : 'h-full w-full object-contain'}
        style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
        loading="lazy"
      />
    </div>
  )
}

// Wraps `value` into [0, width) with correct handling of negative values
// (JS's `%` can return negative results, which a naive modulo doesn't fix).
function wrap(value: number, width: number) {
  if (!width) return 0
  return ((value % width) + width) % width
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  // Width of ONE copy of each row's content (the tripled row's rendered
  // width, divided by 3) -- the actual loop period for the wrap-around math
  // below. Content is fixed-size tiles, so this is stable once measured.
  const [row1Width, setRow1Width] = useState(0)
  const [row2Width, setRow2Width] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (row1Ref.current) setRow1Width(row1Ref.current.scrollWidth / 3)
      if (row2Ref.current) setRow2Width(row2Ref.current.scrollWidth / 3)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const next = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(next)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Wrapping the raw (unbounded) scroll offset into a single row-width's
  // worth of range before applying it as a translateX keeps the visible
  // strip permanently anchored within the tripled content -- no matter how
  // far or how long you scroll, it can never run past the end of the buffer
  // and expose blank space, in either direction, for either row.
  const row1TranslateX = wrap(offset - 200, row1Width) - row1Width
  const row2TranslateX = wrap(-(offset - 200), row2Width) - row2Width

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <div
          ref={row1Ref}
          className="flex gap-3"
          style={{ transform: `translateX(${row1TranslateX}px)`, willChange: 'transform' }}
        >
          {tripled(ROW1).map((photo, i) => (
            <MarqueeTile key={i} photo={photo} />
          ))}
        </div>
        <div
          ref={row2Ref}
          className="flex gap-3"
          style={{ transform: `translateX(${row2TranslateX}px)`, willChange: 'transform' }}
        >
          {tripled(ROW2).map((photo, i) => (
            <MarqueeTile key={i} photo={photo} />
          ))}
        </div>
      </div>
    </section>
  )
}
