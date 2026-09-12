import { useEffect, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
  /** Elements the pull should ignore entirely -- while the cursor is over
   *  any of these (e.g. a nav bar sitting on top of this element), the magnet
   *  treats it the same as the cursor being far away and returns to rest,
   *  instead of visibly reaching for a cursor position it can't usefully
   *  chase (which read as glitchy when the two were fighting for the same
   *  screen space). */
  excludeRefs?: RefObject<HTMLElement | null>[]
}

export default function Magnet({
  children,
  padding = 100,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  excludeRefs,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // The element's rest-position rect, captured once (and on resize) rather
  // than re-measured on every mousemove. Re-measuring the LIVE element with
  // getBoundingClientRect() while it's already mid-pull meant every
  // calculation was chasing a target that had itself just moved -- that
  // feedback loop is what caused the visible bounce/flicker, especially near
  // the trigger boundary. Using a fixed rest rect keeps the pull stable.
  const restRectRef = useRef<DOMRect | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const measureRestRect = () => {
      const el = wrapperRef.current
      if (!el) return
      const prevTransform = el.style.transform
      el.style.transform = 'none'
      restRectRef.current = el.getBoundingClientRect()
      el.style.transform = prevTransform
    }

    measureRestRect()
    window.addEventListener('resize', measureRestRect)
    // The wrapper usually sits inside a FadeIn that's still animating in
    // (opacity/position) when this effect first runs -- measuring mid-animation
    // bakes in a wrong rest position that never self-corrects until a resize.
    // Re-measure once after any such intro animation has had time to settle.
    const settleTimeout = window.setTimeout(measureRestRect, 1200)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = restRectRef.current
      if (!rect) return

      const overExcludedElement = excludeRefs?.some((ref) => {
        const el = ref.current
        if (!el) return false
        const r = el.getBoundingClientRect()
        return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      })
      if (overExcludedElement) {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
        return
      }

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const withinX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding
      const withinY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding

      if (withinX && withinY) {
        const distX = e.clientX - centerX
        const distY = e.clientY - centerY
        setIsActive(true)
        setPosition({ x: distX / strength, y: distY / strength })
      } else {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', measureRestRect)
      window.clearTimeout(settleTimeout)
    }
  }, [padding, strength, excludeRefs])

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
