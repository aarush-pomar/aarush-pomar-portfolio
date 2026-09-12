import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, type PanInfo } from 'framer-motion'

interface StackImage {
  id: number
  src: string
  alt: string
  /** Overrides the default top-anchored crop for this one image -- e.g. a
   *  photo wider than the card gets cropped left/right instead of top/bottom,
   *  and centering that crop can cut off whoever's standing at the edge. */
  objectPosition?: string
}

interface VerticalImageStackProps {
  images: StackImage[]
}

export default function VerticalImageStack({ images }: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400
  const containerRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback(
    (newDirection: number) => {
      const now = Date.now()
      if (now - lastNavigationTime.current < navigationCooldown) return
      lastNavigationTime.current = now

      setCurrentIndex((prev) => {
        if (newDirection > 0) {
          return prev === images.length - 1 ? 0 : prev + 1
        }
        return prev === 0 ? images.length - 1 : prev - 1
      })
    },
    [images.length]
  )

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  // Scoped to this component's container (not window) so normal page
  // scrolling still works everywhere except directly over the stack.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault()
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [navigate])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div ref={containerRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#0C0C0C]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D7E2EA]/[0.02] blur-3xl" />
      </div>

      <div
        className="relative flex h-[440px] w-[330px] items-center justify-center sm:h-[500px] sm:w-[375px] md:h-[560px] md:w-[420px]"
        style={{ perspective: '1200px' }}
      >
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: 'preserve-3d',
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[440px] w-[330px] overflow-hidden rounded-3xl bg-[#141414] ring-1 ring-[#D7E2EA]/20 sm:h-[500px] sm:w-[375px] md:h-[560px] md:w-[420px]"
                style={{
                  boxShadow: isCurrent
                    ? '0 25px 50px -12px rgba(215,226,234,0.15), 0 0 0 1px rgba(215,226,234,0.05)'
                    : '0 10px 30px -10px rgba(215,226,234,0.1)',
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#D7E2EA]/10 via-transparent to-transparent" />

                <img
                  src={image.src}
                  alt={image.alt}
                  // Default object-position 'top' (not center): these are
                  // all barbershop profile/over-the-shoulder shots where the
                  // hair/head is the top-most content, and any slack below is
                  // cape/shoulder/background -- cropping only from the
                  // bottom keeps every photo's head fully intact regardless
                  // of how far its own aspect ratio is from the card's,
                  // without needing a per-photo exception. `objectPosition`
                  // overrides this for the rare photo that instead needs
                  // left/right cropping (wider than the card, not taller).
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: image.objectPosition ?? 'center top' }}
                  draggable={false}
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0C0C]/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-medium text-[#D7E2EA]">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:right-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'h-6 bg-[#D7E2EA]' : 'bg-[#D7E2EA]/30 hover:bg-[#D7E2EA]/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-[#D7E2EA]/60">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: 'easeInOut' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
          </motion.div>
          <span className="text-xs font-medium uppercase tracking-widest">Scroll or drag</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: 'easeInOut' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 sm:left-8">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light tabular-nums text-[#D7E2EA]">{String(currentIndex + 1).padStart(2, '0')}</span>
          <div className="my-2 h-px w-8 bg-[#D7E2EA]/20" />
          <span className="text-sm tabular-nums text-[#D7E2EA]/60">{String(images.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  )
}
