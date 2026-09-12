import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import PlaceholderImage from '../shared/PlaceholderImage'
import iceEnforcementRaid from '../../assets/photos/ice-enforcement-raid.webp'
import iceProtestMegaphoneUmn from '../../assets/photos/ice-protest-megaphone-umn.webp'
import iceProtestUniversityMn from '../../assets/photos/ice-protest-university-mn.jpg'
import haircutDetailWork from '../../assets/photos/haircut-detail-work.jpg'
import haircutFinishingTouches from '../../assets/photos/haircut-finishing-touches.jpg'
import haircutCurlyHighlights from '../../assets/photos/haircut-curly-highlights.jpg'
import borgenCheck from '../../assets/photos/borgen-check.jpg'
import borgenProjectGlobe from '../../assets/photos/borgen-project-globe.jpg'

interface ProjectPhoto {
  src: string
  label: string
}

interface Project {
  number: string
  category: string
  name: string
  to: string
  // legacy placeholder-slot layout (used while no real photos exist yet)
  col1Label1?: string
  col1Label2?: string
  col2Label?: string
  // once real photos exist, use this instead -- a simple photo row
  photos?: ProjectPhoto[]
  // 'wide' (default): landscape photos, row stretches full card width.
  // 'portrait': portrait photos, sized prominent but NOT stretched full-width --
  // portrait + full-width would make the row too tall for this card's
  // scroll-pinned height budget (see PortraitPhotoRow comment).
  photoLayout?: 'wide' | 'portrait'
}

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Nonprofit',
    name: 'The Borgen Project',
    to: '/advocacy',
    photos: [
      { src: borgenCheck, label: '$1,000 check, funded by haircuts' },
      { src: borgenProjectGlobe, label: 'The Borgen Project' },
    ],
  },
  {
    number: '02',
    category: 'Research',
    name: 'ICE Economic Fallout Study',
    to: '/research',
    photos: [
      { src: iceEnforcementRaid, label: 'Interior enforcement activity, St. Paul' },
      { src: iceProtestUniversityMn, label: 'Student response, University of Minnesota' },
      { src: iceProtestMegaphoneUmn, label: 'Rally organizing, University of Minnesota' },
    ],
  },
  {
    number: '03',
    category: 'Small Business',
    name: 'Barbering -- @pomar.blendz',
    to: '/more',
    photos: [
      { src: haircutDetailWork, label: 'Tools of the trade' },
      { src: haircutCurlyHighlights, label: 'Curly highlights' },
      { src: haircutFinishingTouches, label: 'Finishing touches' },
    ],
  },
]

// Landscape boxes that always stretch edge-to-edge across the card, no matter
// how many photos are in the row (2 or 3) -- every row uses the exact same
// full-width treatment.
const PHOTO_BOX_ASPECT_RATIO = '3 / 2'

function PhotoGrid({ photos }: { photos: ProjectPhoto[] }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="flex-1 overflow-hidden rounded-[24px] bg-black sm:rounded-[32px]"
          style={{ aspectRatio: PHOTO_BOX_ASPECT_RATIO }}
        >
          <img src={photo.src} alt={photo.label} className="h-full w-full object-contain" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

// Portrait photos, sized by a fixed HEIGHT (not stretched to fill the card
// width) -- at this card's sticky top-offset, a full-width portrait photo
// would exceed the viewport before the sticky card is done being pinned,
// recreating the earlier cutoff bug. Capping height and letting width follow
// the aspect ratio keeps these prominent while staying inside that budget.
const PORTRAIT_BOX_ASPECT_RATIO = '3 / 4'

function PortraitPhotoRow({ photos }: { photos: ProjectPhoto[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="overflow-hidden rounded-[24px] bg-black sm:rounded-[32px]"
          style={{ height: 'clamp(140px, 18vw, 250px)', aspectRatio: PORTRAIT_BOX_ASPECT_RATIO }}
        >
          <img src={photo.src} alt={photo.label} className="h-full w-full object-contain" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetScale = 1 - (PROJECTS.length - 1 - index) * 0.03

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={containerRef} className="h-[85vh]">
      <motion.div
        className="sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <div className="flex flex-wrap items-center gap-4 pb-6 sm:gap-6">
          <span
            className="font-black text-[#D7E2EA]"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA] opacity-60">
              {project.category}
            </span>
            <h3 className="text-xl font-medium uppercase text-[#D7E2EA] sm:text-2xl md:text-3xl">
              {project.name}
            </h3>
          </div>
          <Link
            to={project.to}
            className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
          >
            Learn More
          </Link>
        </div>

        {project.photos ? (
          project.photoLayout === 'portrait' ? (
            <PortraitPhotoRow photos={project.photos} />
          ) : (
            <PhotoGrid photos={project.photos} />
          )
        ) : (
          <div className="flex gap-3">
            <div className="flex w-[40%] flex-col gap-3">
              <PlaceholderImage
                label={project.col1Label1 ?? ''}
                className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
              <PlaceholderImage
                label={project.col1Label2 ?? ''}
                className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
            <div className="w-[60%]">
              <PlaceholderImage
                label={project.col2Label ?? ''}
                className="h-full w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">
      <h2
        className="hero-heading text-center font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div className="mt-16">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
