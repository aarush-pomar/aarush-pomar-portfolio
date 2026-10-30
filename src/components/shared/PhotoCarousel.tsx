import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Lightbox from './Lightbox'
import AnnotatedPhoto, { type ArrowPoint } from './AnnotatedPhoto'

interface CarouselPhoto {
  src: string
  caption: string
  /** Points a small red arrow at Aarush when he isn't the obvious sole subject. */
  arrow?: ArrowPoint
}

const css = `
  .photo-coverflow {
    padding-bottom: 56px !important;
  }
  .photo-coverflow .swiper-slide {
    width: min(440px, 72vw);
    aspect-ratio: 1 / 1;
    border-radius: 24px;
    overflow: hidden;
  }
  .photo-coverflow .swiper-pagination-bullet {
    background-color: #0C0C0C;
    opacity: 0.25;
  }
  .photo-coverflow .swiper-pagination-bullet-active {
    opacity: 1;
  }
`

export default function PhotoCarousel({ photos }: { photos: CarouselPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)

  return (
    <div className="relative w-full">
      <style>{css}</style>

      <Swiper
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        effect="coverflow"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        loop
        coverflowEffect={{ rotate: 30, stretch: 0, depth: 220, modifier: 1, slideShadows: true }}
        pagination={{ clickable: true }}
        navigation={{ nextEl: '.photo-carousel-next', prevEl: '.photo-carousel-prev' }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="photo-coverflow"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Enlarge photo: ${photo.caption}`}
              className="h-full w-full cursor-zoom-in"
            >
              {/* No `loading="lazy"` here: Swiper's coverflow effect positions
                  every slide (including ones not yet centered) with a CSS 3D
                  transform rather than normal document flow. Native lazy
                  loading decides whether to fetch an image based on that
                  flow position, and in production builds it was deciding
                  these transformed slides were never close enough to the
                  viewport -- so most photos simply never loaded, even though
                  they were already visible in the coverflow. Eagerly loading
                  all ~9 photos up front is cheap enough that this is the
                  simpler fix, rather than teaching Swiper's own lazy module
                  to coordinate with the transform. */}
              <AnnotatedPhoto
                src={photo.src}
                alt={photo.caption}
                arrow={photo.arrow}
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-2 flex flex-col items-center gap-3">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-[1.25rem] max-w-sm text-center text-sm italic text-[#0C0C0C]/60"
        >
          {photos[activeIndex]?.caption}
        </motion.p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous photo"
            className="photo-carousel-prev flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0C0C0C]/25 text-[#0C0C0C] transition-colors hover:border-[#0C0C0C]"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label="Next photo"
            className="photo-carousel-next flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0C0C0C]/25 text-[#0C0C0C] transition-colors hover:border-[#0C0C0C]"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          src={photos[openIndex].src}
          alt={photos[openIndex].caption}
          caption={photos[openIndex].caption}
          arrow={photos[openIndex].arrow}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  )
}
