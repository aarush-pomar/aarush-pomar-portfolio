import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import PlaceholderImage from './PlaceholderImage'
import Lightbox, { EnlargeHint } from './Lightbox'

interface FeatureCardProps {
  number?: string
  category: string
  title: string
  children: ReactNode
  imageLabel?: string
  imageSrc?: string
  imageCaption?: string
  /** Width / height of the main photo -- shows it uncropped instead of forcing a square. */
  imageAspectRatio?: number
  /**
   * 'cover' (default): fills its box, cropping overflow. 'contain': shows the
   * whole image letterboxed instead -- use this for a logo/graphic with its
   * own border or edge detail, where `stretchPhoto`'s taller box would
   * otherwise crop that edge away on one or both sides.
   */
  imageFit?: 'cover' | 'contain'
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
  /**
   * Overrides the default cap on how wide fitPhotosToText will grow the
   * photo column (normally capped at 240px / 30% of the card, tuned for a
   * narrow side-thumbnail look). Set this when a card actually wants the
   * photo to grow large enough to fill the full height next to a long text
   * block, rather than staying a small thumbnail.
   */
  maxPhotoColumnWidth?: number
  /**
   * Side layout only: measures the text column's real rendered pixel height
   * and sets the photo to that exact height via an inline style (not a CSS
   * percentage/stretch), with a fixed column width and object-cover. An
   * explicit pixel value can't be ambiguous the way `height: 100%` through a
   * CSS Grid stretch context can be across browsers -- it's the same number
   * everywhere. Below the md breakpoint it falls back to a fixed aspect
   * ratio instead. Trade-off on desktop: the photo gets cropped to fit
   * rather than staying at its native aspect ratio.
   */
  stretchPhoto?: boolean
  /**
   * stretchPhoto only: stops re-measuring and keeps the photo at whatever
   * height it last had. Use this when `children` contains something that
   * can grow after the initial render (like an expandable donor list) and
   * the photo should NOT follow that growth -- flip this to true exactly
   * when that growth starts (e.g. pass your "expanded" state directly) so
   * the last measurement, taken before the growth, sticks.
   */
  stretchFrozen?: boolean
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
  stretchHeight,
  fit = 'cover',
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
  // Explicit measured pixel height (desktop only) -- see FeatureCard's
  // `stretchPhoto` prop. null/undefined means "no measurement yet, or below
  // md" -- falls back to aspect-square so it still has SOME size.
  stretchHeight?: number | null
  // See FeatureCard's `imageFit`.
  fit?: 'cover' | 'contain'
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const hasStretchHeight = stretchHeight != null

  return (
    <div className="flex flex-col gap-2">
      {src ? (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Enlarge photo: ${label}`}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl"
          style={hasStretchHeight ? { height: stretchHeight } : undefined}
        >
          <img
            src={src}
            alt={label}
            className={`w-full transition-transform duration-500 group-hover:scale-105 ${
              fit === 'contain' ? 'object-contain' : 'object-cover'
            } ${hasStretchHeight ? 'h-full' : `aspect-square ${alwaysSquare ? '' : 'sm:aspect-[4/3] md:aspect-square'}`}`}
            style={objectPosition || aspectRatio ? { objectPosition, aspectRatio } : undefined}
            loading="lazy"
          />
          <EnlargeHint />
        </button>
      ) : (
        <PlaceholderImage label={label} className={`aspect-square w-full ${alwaysSquare ? '' : 'sm:aspect-[4/3] md:aspect-square'}`} />
      )}
      {caption && <p className="text-xs italic text-[#0C0C0C]/60">{caption}</p>}
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
  imageFit,
  extraImages,
  photoLayout = 'side',
  photoColumnWidth = 230,
  fitPhotosToText = false,
  maxPhotoColumnWidth,
  stretchPhoto = false,
  stretchFrozen = false,
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
  const fitEnabled = fitPhotosToText && !photoRow && !!imageLabel && !stretchPhoto
  const stretchEnabled = stretchPhoto && !photoRow && !!imageLabel
  const [stretchHeight, setStretchHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    // While frozen, skip re-measuring entirely -- stretchHeight just keeps
    // whatever value it last had, so the photo doesn't follow `children`
    // growing (e.g. an expanded donor list) after that point.
    if (!stretchEnabled || stretchFrozen) return
    const text = textRef.current
    if (!text) return

    const desktop = window.matchMedia('(min-width: 768px)')

    const measure = () => {
      setStretchHeight(desktop.matches ? text.offsetHeight : null)
    }

    measure()
    // The web font (Kanit) can finish loading after this first measurement,
    // reflowing the text to its final metrics -- re-measure once it's ready
    // so the photo doesn't lock in a height based on the fallback font.
    document.fonts?.ready.then(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(text)
    desktop.addEventListener('change', measure)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', measure)
    }
  }, [stretchEnabled, stretchFrozen])

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
      // Capped at ~30% of the card by default: a wider photo column narrows
      // the text, which makes it taller, which asks for an even wider column
      // -- without a cap that feedback runs away on narrow windows. A caller
      // that explicitly wants a bigger photo (maxPhotoColumnWidth) opts out
      // of that default cap and trusts its own number instead.
      const maxWidth = maxPhotoColumnWidth ?? Math.min(210, Math.round((column.parentElement?.offsetWidth ?? 0) * 0.27))
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
  }, [fitEnabled, inverseAspectSum, fittedWidth, maxPhotoColumnWidth])

  return (
    <div
      id={id}
      className={`scroll-mt-24 rounded-[20px] border-2 border-[#0C0C0C]/25 bg-white p-3.5 shadow-[0_1px_3px_rgba(12,12,12,0.06),0_12px_28px_-18px_rgba(12,12,12,0.28)] sm:rounded-[24px] sm:p-5 md:rounded-[28px] md:p-6 ${className ?? ''}`}
    >
      <div className="flex flex-wrap items-center gap-3 pb-3.5 sm:gap-4 sm:pb-4">
        {number && (
          <span className="font-black text-[#0C0C0C]" style={{ fontSize: 'clamp(2rem, 6vw, 4.75rem)' }}>
            {number}
          </span>
        )}
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-widest text-[#0C0C0C]/60">
            {category}
          </span>
          <h3 className="text-base font-black uppercase tracking-tight text-[#0C0C0C] sm:text-lg md:text-xl">
            {title}
          </h3>
        </div>
        {actions}
      </div>

      <div
        className={imageLabel && !photoRow ? 'grid gap-4 md:grid-cols-[1fr_var(--photo-w)] md:gap-7' : ''}
        style={
          {
            '--photo-w': `${stretchPhoto ? (maxPhotoColumnWidth ?? photoColumnWidth) : (fittedWidth ?? photoColumnWidth)}px`,
          } as React.CSSProperties
        }
      >
        <div className="text-sm leading-relaxed text-[#0C0C0C]">
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
              stretchHeight={stretchEnabled ? stretchHeight : undefined}
              fit={imageFit}
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
