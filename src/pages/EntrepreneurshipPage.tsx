import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/shared/PageLayout'
import PageHeader from '../components/shared/PageHeader'
import FeatureCard from '../components/shared/FeatureCard'
import PillLink from '../components/shared/PillLink'
import Lightbox, { EnlargeHint } from '../components/shared/Lightbox'
import studioChair from '../assets/photos/haircut-studio-chair.jpg'
import cleanTaper from '../assets/photos/haircut-clean-taper.jpg'
import backTaper from '../assets/photos/haircut-back-taper.jpg'
import seasonalLawnMower from '../assets/photos/seasonal-services-lawn-mower.webp'
import seasonalGraphic from '../assets/photos/seasonal-services-graphic.webp'
import seasonalDogWalk from '../assets/photos/seasonal-services-dog-walk.webp'

const HAIRCUT_GALLERY = [
  { src: studioChair, caption: 'Between classes, fitting in a cut' },
  { src: cleanTaper, caption: 'Checking the finished taper' },
  { src: backTaper, caption: 'Fresh taper, finished look' },
]

const SEASONAL_GALLERY = [
  { src: seasonalLawnMower, caption: 'Lawn care' },
  { src: seasonalGraphic, caption: 'Seasonal Services -- beautiful outdoors all year long' },
  { src: seasonalDogWalk, caption: 'Looking after dogs' },
]

function GalleryPhoto({ src, caption }: { src: string; caption: string }) {
  const [open, setOpen] = useState(false)

  return (
    // `caption` still drives the img alt text and the enlarge button's
    // aria-label for screen readers -- just not shown visibly anymore.
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge photo: ${caption}`}
        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl"
      >
        <img
          src={src}
          alt={caption}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <EnlargeHint />
      </button>
      {open && <Lightbox src={src} alt={caption} onClose={() => setOpen(false)} />}
    </div>
  )
}

export default function EntrepreneurshipPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Social Entrepreneurship"
        subtitle="Freelance barbering (@pomar.blendz) and Seasonal Services"
      />

      <div className="flex flex-col gap-8 pb-10 pt-4 sm:gap-10">
        <FeatureCard
          category="Freelance Business -- @pomar.blendz"
          title="From Clippers to Clients"
          actions={<PillLink href="https://www.instagram.com/pomar.blendz/">Instagram</PillLink>}
        >
          <p>
            I started cutting hair for friends. Since then, I&rsquo;ve given 500+ haircuts and
            built a client base of 150+ people, mostly local high school and college students. I
            run every part of the business, from booking appointments and buying supplies to
            cutting hair and collecting payments.
          </p>
          <p>
            Donations from pomar.blendz support{' '}
            <a
              href="https://borgenproject.org/"
              target="_blank"
              rel="noreferrer"
              className="text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-4 transition-colors hover:text-[#BBCCD7]"
            >
              The Borgen Project
            </a>{' '}
            and{' '}
            <a
              href="https://www.theremedyproj.org/"
              target="_blank"
              rel="noreferrer"
              className="text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-4 transition-colors hover:text-[#BBCCD7]"
            >
              The Remedy Project
            </a>
            , supporting efforts to reduce global poverty and advocate for incarcerated people.
            Learn more on my{' '}
            <Link
              to="/advocacy"
              className="text-[#D7E2EA] underline decoration-[#D7E2EA]/30 underline-offset-4 transition-colors hover:text-[#BBCCD7]"
            >
              Advocacy page
            </Link>
            .
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {HAIRCUT_GALLERY.map((photo) => (
              <GalleryPhoto key={photo.src} src={photo.src} caption={photo.caption} />
            ))}
          </div>
        </FeatureCard>

        <FeatureCard category="Neighborhood Business -- Co-Founder & Service Worker" title="Seasonal Services">
          <p>
            In June 2023, I co-founded Seasonal Services with another student in my neighborhood.
            We help neighbors with work around their homes throughout the year, including lawn
            mowing, leaf raking, snow shoveling, interior painting, and dog care.
          </p>
          <p>
            I split the hands-on work with my co-founder and manage scheduling, job assignments,
            and payments. I also keep customers updated and follow up after each job to make sure
            they&rsquo;re satisfied with our work.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {SEASONAL_GALLERY.map((photo) => (
              <GalleryPhoto key={photo.src} src={photo.src} caption={photo.caption} />
            ))}
          </div>
        </FeatureCard>
      </div>
    </PageLayout>
  )
}
