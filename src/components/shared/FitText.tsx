import { useLayoutEffect, useRef, useState } from 'react'

interface FitTextProps {
  text: string
  className?: string
  /** Caps how large the computed font-size can get, in px. Without this, a
   *  short string filling the same container width as a long one (e.g. a
   *  4-letter page title vs. a 16-letter one, both meant to render at a
   *  similar "page heading" size) would blow up far past any reasonable
   *  size -- the fill-to-width math has no sense of what's "too big" on its
   *  own. Long text that would naturally come out smaller than this is
   *  unaffected; this only ever makes the result smaller, never bigger. */
  maxFontSize?: number
}

const REF_SIZE = 100

/**
 * Sizes its text so the rendered width exactly matches the available
 * container width -- measured with a real offscreen DOM clone (same
 * rendering pipeline as the visible element, avoiding canvas font-matching
 * quirks with custom web-font weights), so it never overflows regardless
 * of which font/OS actually ends up rendering.
 */
export default function FitText({ text, className, maxFontSize }: FitTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const el = spanRef.current
    if (!el) return

    function fit() {
      if (!el) return
      const targetWidth = el.getBoundingClientRect().width
      if (targetWidth <= 0) return

      const cs = getComputedStyle(el)
      // letter-spacing's `em` resolves against the ancestor it's declared on
      // (the h1), so the computed px value is fixed -- it does NOT scale
      // proportionally with this span's own font-size. Measure glyph width
      // alone (no letter-spacing) so it scales linearly with font-size, then
      // subtract the fixed letter-spacing contribution separately.
      const fixedLetterSpacingPx = parseFloat(cs.letterSpacing) || 0
      const fixedExtra = Math.max(0, text.length - 1) * fixedLetterSpacingPx

      const clone = document.createElement('span')
      clone.textContent = text
      clone.style.position = 'fixed'
      clone.style.top = '-9999px'
      clone.style.left = '0'
      clone.style.whiteSpace = 'nowrap'
      clone.style.visibility = 'hidden'
      clone.style.fontFamily = cs.fontFamily
      clone.style.fontWeight = cs.fontWeight
      clone.style.fontStyle = cs.fontStyle
      clone.style.textTransform = cs.textTransform
      clone.style.fontSize = `${REF_SIZE}px`
      clone.style.letterSpacing = '0px'
      document.body.appendChild(clone)
      const measuredAtRef = clone.getBoundingClientRect().width
      document.body.removeChild(clone)

      if (measuredAtRef <= 0) return
      const widthPerPx = measuredAtRef / REF_SIZE
      const computed = (targetWidth - fixedExtra) / widthPerPx
      setFontSize(maxFontSize ? Math.min(computed, maxFontSize) : computed)
    }

    fit()
    document.fonts.ready.then(fit)

    const ro = new ResizeObserver(() => fit())
    if (el.parentElement) ro.observe(el.parentElement)

    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, maxFontSize])

  return (
    <span
      ref={spanRef}
      className={className}
      style={{ fontSize: fontSize ? `${fontSize}px` : undefined, visibility: fontSize ? 'visible' : 'hidden' }}
    >
      {text}
    </span>
  )
}
