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
            I donate all profits from pomar.blendz to{' '}
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
            I co-founded Seasonal Services with another student in my neighborhood in June 2023.
            We help neighbors with jobs like mowing lawns, raking leaves, shoveling snow, painting
            rooms, and looking after dogs.
          </p>
          <p>
            Alongside doing the work, I organize appointments, coordinate who handles each job,
            collect payments, and stay in touch with customers to make sure they&rsquo;re happy
            with the results.
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
