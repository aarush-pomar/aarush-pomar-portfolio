import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import PlaceholderImage from './PlaceholderImage'
import Lightbox, { EnlargeHint } from './Lightbox'

interface FeatureCardProps {
  number: string
  category: string
  title: string
  children: ReactNode
  imageLabel?: string
  imageSrc?: string
  imageCaption?: string
  /** Width / height of the main photo -- shows it uncropped instead of forcing a square. */
  imageAspectRatio?: number
  /** More photos beside/under the main one, each with the same click-to-enlarge. */
  extraImages?: { src: string; label: string; caption?: string; objectPosition?: string; fullSrc?: string; aspectRatio?: number }[]
  /**
   * 'side' (default): photos stack in a column beside the text.
   * 'row': the main photo + extras sit in one row under the text -- use it when
   * there are enough photos that a column would run far taller than the text
   * and leave a big empty block beside it.
   */
  photoLayout?: 'side' | 'row'
  /** Width in px of the photo column beside the text (default 260). Narrower = shorter stack. */
  photoColumnWidth?: number
  /**
   * Side layout only: size the photo column so the stacked photos end exactly
   * where the text ends. How tall the text is depends on the window width, so a
   * fixed column width can't do this -- this measures and re-fits on resize.
   * Photos keep their own proportions (no cropping); on phones it does nothing.
   */
  fitPhotosToText?: boolean
  actions?: ReactNode
  className?: string
  /** Anchor id so a link elsewhere (e.g. "/research#caste-research") can jump straight to this card. */
  id?: string
}

function CardPhoto({
  src,
  label,
  caption,
  objectPosition,
  fullSrc,
  alwaysSquare,
  aspectRatio,
}: {
  src?: string
  label: string
  caption?: string
  // What the enlarged view shows when the card only displays a cropped version.
  fullSrc?: string
  // Keep the thumbnail square at every screen size (used by the photo row).
  alwaysSquare?: boolean
  // Which part of a photo to keep when the square slot has to crop it (e.g.
  // 'center top' so a tall portrait keeps its face instead of its middle).
  objectPosition?: string
  // Width / height of the photo itself: shows it uncropped (e.g. group photos,
  // where a square crop would cut people off at the edges).
  aspectRatio?: number
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      {src ? (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Enlarge photo: ${label}`}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl"
        >
          <img
            src={src}
            alt={label}
            className={`aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 ${alwaysSquare ? '' : 'sm:aspect-[4/3] md:aspect-square'}`}
            style={objectPosition || aspectRatio ? { objectPosition, aspectRatio } : undefined}
            loading="lazy"
          />
          <EnlargeHint />
        </button>
      ) : (
        <PlaceholderImage label={label} className={`aspect-square w-full ${alwaysSquare ? '' : 'sm:aspect-[4/3] md:aspect-square'}`} />
      )}
      {caption && <p className="text-xs italic text-[#D7E2EA]/50">{caption}</p>}
      {lightboxOpen && src && <Lightbox src={fullSrc ?? src} alt={label} caption={caption} onClose={() => setLightboxOpen(false)} />}
    </div>
  )
}

export default function FeatureCard({
  number,
  category,
  title,
  children,
  imageLabel,
  imageSrc,
  imageCaption,
  imageAspectRatio,
  extraImages,
  photoLayout = 'side',
  photoColumnWidth = 260,
  fitPhotosToText = false,
  actions,
  className,
  id,
}: FeatureCardProps) {
  const photoRow = photoLayout === 'row'
  const textRef = useRef<HTMLDivElement>(null)
  const columnRef = useRef<HTMLDivElement>(null)
  const [fittedWidth, setFittedWidth] = useState<number | null>(null)
  // Refs (not effect-local vars) so they survive the effect re-running after each width change.
  const appliedWidthRef = useRef<number | null>(null)
  const fitPassesRef = useRef(0)
  const fitEnabled = fitPhotosToText && !photoRow && !!imageLabel

  // Photo heights are width / aspect (default square, aspect 1), so total
  // photo height = width * inverseAspectSum + the fixed bits (gaps + captions).
  // Solve for the width that makes that equal the text height.
  const inverseAspectSum =
    1 / (imageAspectRatio ?? 1) + (extraImages ?? []).reduce((sum, e) => sum + 1 / (e.aspectRatio ?? 1), 0)

  useLayoutEffect(() => {
    if (!fitEnabled) return
    const text = textRef.current
    const column = columnRef.current
    if (!text || !column) return

    const desktop = window.matchMedia('(min-width: 768px)')

    const fit = () => {
      if (!desktop.matches) {
        appliedWidthRef.current = null
        setFittedWidth(null)
        return
      }
      const photos = Array.from(column.children) as HTMLElement[]
      const fixed = photos.reduce((sum, el) => {
        const button = el.querySelector('button')
        return sum + (button ? el.offsetHeight - button.offsetHeight : 0)
      }, 24 * (photos.length - 1))
      // Capped at ~30% of the card: a wider photo column narrows the text,
      // which makes it taller, which asks for an even wider column -- without
      // a cap that feedback runs away on narrow windows.
      const maxWidth = Math.min(240, Math.round((column.parentElement?.offsetWidth ?? 0) * 0.3))
      const next = Math.min(maxWidth, Math.max(140, Math.round((text.offsetHeight - fixed) / inverseAspectSum)))
      // Changing the column width re-wraps the text a little, so this runs a
      // few passes to settle. Once it settles the pass count resets; if it
      // never does (flip-flopping at a wrap edge) the cap stops it.
      const applied = appliedWidthRef.current
      if (applied !== null && Math.abs(applied - next) <= 1) {
        fitPassesRef.current = 0
        return
      }
      if (fitPassesRef.current >= 6) return
      fitPassesRef.current += 1
      appliedWidthRef.current = next
      setFittedWidth(next)
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(text)
    desktop.addEventListener('change', fit)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', fit)
    }
  }, [fitEnabled, inverseAspectSum, fittedWidth])

  return (
    <div
      id={id}
      className={`scroll-mt-24 rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:rounded-[40px] sm:p-7 md:rounded-[48px] md:p-8 ${className ?? ''}`}
    >
      <div className="flex flex-wrap items-center gap-4 pb-6 sm:gap-6">
        <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)' }}>
          {number}
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
            {category}
          </span>
          <h3 className="hero-heading text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
            {title}
          </h3>
        </div>
        {actions}
      </div>

      <div
        className={imageLabel && !photoRow ? 'grid gap-6 md:grid-cols-[1fr_var(--photo-w)] md:gap-10' : ''}
        style={{ '--photo-w': `${fittedWidth ?? photoColumnWidth}px` } as React.CSSProperties}
      >
        <div className="text-sm leading-relaxed text-[#D7E2EA]/85 sm:text-base">
          <div ref={textRef} className="space-y-3">
            {children}
          </div>
        </div>
        {imageLabel && (
          <div ref={columnRef} className={photoRow ? 'mt-8 grid gap-6 sm:grid-cols-3' : 'flex flex-col gap-6'}>
            <CardPhoto
              src={imageSrc}
              label={imageLabel}
              caption={imageCaption}
              aspectRatio={imageAspectRatio}
              alwaysSquare={photoRow}
            />
            {extraImages?.map((extra) => (
              <CardPhoto
                key={extra.src}
                src={extra.src}
                label={extra.label}
                caption={extra.caption}
                objectPosition={extra.objectPosition}
                fullSrc={extra.fullSrc}
                aspectRatio={extra.aspectRatio}
                alwaysSquare={photoRow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
