import { useEffect, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
  /** Elements the pull should ignore entirely -- while the cursor is over
   *  any of these (e.g. a nav bar sitting on top of this element), the magnet
   *  treats it the same as the cursor being far away and returns to rest,
   *  instead of visibly reaching for a cursor position it can't usefully
   *  chase (which read as glitchy when the two were fighting for the same
   *  screen space). */
  excludeRefs?: RefObject<HTMLElement | null>[]
  /** When given, the cursor stays "connected" (pulling) anywhere inside this
   *  element's bounds, not just within `padding` pixels of this Magnet's own
   *  (usually much smaller) box. Use this to cover the whole section the
   *  magnet sits in -- e.g. a wide heading can span nearly the full screen
   *  while the magnet's own image is a small fixed-width column in the
   *  middle of it, so checking distance from the image's own box alone meant
   *  the pull let go as soon as the cursor was anywhere near the edges of
   *  that wide heading, well before it felt like it had left the section. */
  activeAreaRef?: RefObject<HTMLElement | null>
  /** Caps how far the pull can visually displace the element, in px. Needed
   *  once the active area is much bigger than this element's own box --
   *  otherwise a cursor at the far edge of that area would drag it an
   *  unreasonably large distance. */
  maxOffset?: number
  /** Overrides `maxOffset` for the upward direction only (negative y). Lets
   *  the element travel further toward the top of its active area than it
   *  does toward the bottom, where there's less room before it runs into
   *  whatever sits below (e.g. a "scroll" hint pinned to the section's own
   *  bottom edge). Defaults to `maxOffset`. */
  maxOffsetUp?: number
}

export default function Magnet({
  children,
  padding = 100,
  strength = 3,
  className,
  excludeRefs,
  activeAreaRef,
  maxOffset = 70,
  maxOffsetUp = maxOffset,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Mutable, render-free state for the hot path. Previously every single
  // mousemove called setState (position + isActive), which re-rendered this
  // component on every pixel of mouse movement -- that many renders per
  // second competing with the rest of the page's work (FitText's
  // ResizeObserver, framer-motion's own rAF updates, etc.) is what made the
  // pull feel like it needed aggressive/repeated input before it "caught up".
  // Refs + a single rAF loop that writes the transform directly to the DOM
  // avoids React entirely for this, so the pull tracks the live cursor
  // position every animation frame regardless of how busy the rest of the
  // page's render cycle is.
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const restRectRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const measureRestRect = () => {
      const prevTransform = el.style.transform
      el.style.transform = 'none'
      restRectRef.current = el.getBoundingClientRect()
      el.style.transform = prevTransform
    }

    measureRestRect()

    // Covers any layout shift that changes this element's rest position --
    // a web font finishing its (possibly slow) load, a sibling's size
    // changing, a real window resize -- continuously, instead of guessing a
    // single timeout long enough for everything above it to have settled.
    const resizeObserver = new ResizeObserver(measureRestRect)
    resizeObserver.observe(document.body)
    window.addEventListener('resize', measureRestRect)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = restRectRef.current
      if (!rect) return

      const overExcludedElement = excludeRefs?.some((ref) => {
        const excluded = ref.current
        if (!excluded) return false
        const r = excluded.getBoundingClientRect()
        return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      })
      if (overExcludedElement) {
        targetRef.current = { x: 0, y: 0 }
        return
      }

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // The zone that counts as "connected": either the bigger explicit
      // active area (e.g. the whole section), or this element's own box
      // plus `padding` when no active area was given.
      const zone = activeAreaRef?.current?.getBoundingClientRect()
      const withinX = zone
        ? e.clientX >= zone.left && e.clientX <= zone.right
        : e.clientX >= rect.left - padding && e.clientX <= rect.right + padding
      const withinY = zone
        ? e.clientY >= zone.top && e.clientY <= zone.bottom
        : e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding

      if (withinX && withinY) {
        const rawX = (e.clientX - centerX) / strength
        const rawY = (e.clientY - centerY) / strength
        targetRef.current = {
          x: Math.max(-maxOffset, Math.min(maxOffset, rawX)),
          y: Math.max(-maxOffsetUp, Math.min(maxOffset, rawY)),
        }
      } else {
        targetRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Smoothly chases `targetRef` every frame -- a constant per-frame
    // smoothing factor (not a CSS transition restarted on every mousemove
    // event) is what actually gives the fluid "always tracking the live
    // cursor" feel instead of a stair-stepped catch-up.
    let rafId: number
    const tick = () => {
      const current = currentRef.current
      const target = targetRef.current
      const smoothing = 0.18
      current.x += (target.x - current.x) * smoothing
      current.y += (target.y - current.y) * smoothing
      // Snap the last fraction of a pixel so it actually settles at rest
      // instead of approaching (0, 0) forever.
      if (Math.abs(target.x - current.x) < 0.02) current.x = target.x
      if (Math.abs(target.y - current.y) < 0.02) current.y = target.y
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', measureRestRect)
      resizeObserver.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [padding, strength, excludeRefs, activeAreaRef, maxOffset, maxOffsetUp])

  return (
    <div ref={wrapperRef} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
