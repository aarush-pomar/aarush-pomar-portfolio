import { useLayoutEffect, useRef, useState } from 'react'

export interface ArrowPoint {
  /** Where the arrow should point, as a percentage of the photo's natural
   *  (full, uncropped) width/height -- NOT the rendered box. */
  xPercent: number
  yPercent: number
}

/**
 * An <img> that can carry a small red arrow pointing at a specific person,
 * positioned in the photo's own natural coordinate space (`arrow`) rather
 * than the rendered box. Whatever crop `object-cover`/`object-contain`
 * applies at the current box size is measured live (via ResizeObserver) and
 * the arrow's on-screen position is recomputed to match -- so the same
 * `arrow` coordinates stay correct whether this renders as a small square
 * carousel tile, a stretched card photo, or a full `object-contain`
 * lightbox view, and keep tracking correctly if the box is resized
 * (responsive breakpoints, orientation change, window resize).
 */
export default function AnnotatedPhoto({
  src,
  alt,
  fit = 'cover',
  arrow,
  className,
  imgClassName,
  style,
}: {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
  arrow?: ArrowPoint
  className?: string
  imgClassName?: string
  style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  // Percent-of-container position for the arrow's tip, or null until the
  // image has loaded and a first measurement has been taken.
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)

  useLayoutEffect(() => {
    if (!arrow) return
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const compute = () => {
      const natW = img.naturalWidth
      const natH = img.naturalHeight
      const cw = container.clientWidth
      const ch = container.clientHeight
      if (!natW || !natH || !cw || !ch) return

      const containerAspect = cw / ch
      const imageAspect = natW / natH
      let leftPx: number
      let topPx: number

      if (fit === 'cover') {
        if (imageAspect > containerAspect) {
          // Image is relatively wider than the box: height fills the box,
          // width overflows and is cropped equally off both sides.
          const scale = ch / natH
          const offsetX = (natW * scale - cw) / 2
          leftPx = (arrow.xPercent / 100) * natW * scale - offsetX
          topPx = (arrow.yPercent / 100) * ch
        } else {
          // Width fills the box, height overflows and is cropped top/bottom.
          const scale = cw / natW
          const offsetY = (natH * scale - ch) / 2
          leftPx = (arrow.xPercent / 100) * cw
          topPx = (arrow.yPercent / 100) * natH * scale - offsetY
        }
      } else {
        // contain: the whole image is visible, letterboxed on one axis.
        if (imageAspect > containerAspect) {
          const scale = cw / natW
          const displayedH = natH * scale
          const gapY = (ch - displayedH) / 2
          leftPx = (arrow.xPercent / 100) * cw
          topPx = gapY + (arrow.yPercent / 100) * displayedH
        } else {
          const scale = ch / natH
          const displayedW = natW * scale
          const gapX = (cw - displayedW) / 2
          leftPx = gapX + (arrow.xPercent / 100) * displayedW
          topPx = (arrow.yPercent / 100) * ch
        }
      }

      setPos({ left: (leftPx / cw) * 100, top: (topPx / ch) * 100 })
    }

    compute()
    const observer = new ResizeObserver(compute)
    observer.observe(container)
    if (img.complete) compute()
    else img.addEventListener('load', compute)
    return () => {
      observer.disconnect()
      img.removeEventListener('load', compute)
    }
  }, [arrow, fit, src])

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`} style={style}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ objectFit: fit }}
      />
      {arrow && pos && (
        // Fixed-size (44px) so it stays clearly visible without scaling with
        // the photo; positioned so its tip -- not its center -- lands on the
        // computed point.
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute z-10 h-11 w-11 overflow-visible drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-13px, -27px)' }}
          viewBox="0 0 44 44"
        >
          <line x1="40" y1="2" x2="21" y2="19" stroke="#E0201C" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="13,27 24,21 20,33" fill="#E0201C" />
        </svg>
      )}
    </div>
  )
}
