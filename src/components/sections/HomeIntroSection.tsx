import { useLayoutEffect, useRef, useState } from 'react'
import FadeIn from '../shared/FadeIn'
import seniorHeadshot from '../../assets/photos/senior-headshot-vertical.jpg'
import signatureWhite from '../../assets/signature-white.jpg'

// The photo's real aspect ratio (width / height) -- used to size the photo
// column by WIDTH so its natural height lands on the text column's height,
// without ever cropping or stretching the photo itself.
const PHOTO_ASPECT = 2 / 3
const MIN_TEXT_WIDTH = 280
// Raised from 680 -- a wider text column wraps each paragraph into fewer
// lines, which is the single biggest lever for fitting this much copy
// (6 paragraphs) into roughly one screen's height without scrolling, without
// having to shrink the font small enough to hurt readability.
const MAX_TEXT_WIDTH = 860
const MIN_PHOTO_WIDTH = 200
// This cap had been lowered to 360 alongside the text-column widening below,
// but that undershot the actual height-matching target -- the text column
// (even at MAX_TEXT_WIDTH) is still taller than a 360px-wide photo, which
// left blank space under the photo instead of the two columns' bottoms
// lining up. Raised back up so the solve below can actually reach parity.
const MAX_PHOTO_WIDTH = 460
const COLUMN_GAP = 48 // matches md:gap-12

const DEFAULT_SIZES = { photoWidth: 360, textWidth: 420 }

export default function HomeIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [sizes, setSizes] = useState(DEFAULT_SIZES)

  // Solves for the photo width whose natural (uncropped) height exactly
  // matches the text column's height -- at every desktop width, not just
  // wide ones. A real-DOM, multi-pass "measure the visible text, resize the
  // photo, see what changed" approach can't guarantee an exact match: it
  // either has to protect a fixed text width (so the photo falls short
  // whenever there isn't enough room left over) or let both sides react to
  // each other (which can compound instead of settling). Instead, this
  // measures an OFFSCREEN clone of the text at many candidate widths --
  // same technique as FitText's hidden-clone measurement elsewhere in this
  // codebase -- and binary-searches for the text width where "space left
  // over for the photo" and "photo width the resulting text height calls
  // for" are equal. The real, visible elements are then set directly to
  // that answer in one shot: no visible multi-pass reflow, no flicker, and
  // the two columns' bottoms land together by construction.
  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    const desktop = window.matchMedia('(min-width: 768px)')

    const measureHeightAtWidth = (width: number) => {
      const clone = text.cloneNode(true) as HTMLElement
      clone.style.position = 'fixed'
      clone.style.top = '-9999px'
      clone.style.left = '0'
      clone.style.visibility = 'hidden'
      clone.style.transform = 'none'
      clone.style.opacity = '1'
      clone.style.width = `${width}px`
      clone.style.height = 'auto'
      document.body.appendChild(clone)
      const height = clone.getBoundingClientRect().height
      document.body.removeChild(clone)
      return height
    }

    const solve = () => {
      if (!desktop.matches) {
        setSizes(DEFAULT_SIZES)
        return
      }

      const containerWidth = container.clientWidth
      // The text column is never asked to go narrower than MIN_TEXT_WIDTH --
      // `hi` is the only bound that responds to the container, and is
      // clamped to stay >= lo so the range is never inverted.
      let lo = MIN_TEXT_WIDTH
      let hi = Math.max(lo, Math.min(MAX_TEXT_WIDTH, containerWidth - MIN_PHOTO_WIDTH - COLUMN_GAP))

      // g(textWidth) = (space left for the photo) - (photo width its ideal
      // height calls for). Positive means there's more room than the photo
      // needs at this text width (text too narrow / photo would be
      // undersized for its space); negative means the opposite.
      const gOf = (textWidth: number) => {
        const height = measureHeightAtWidth(textWidth)
        const idealPhoto = Math.min(MAX_PHOTO_WIDTH, Math.max(MIN_PHOTO_WIDTH, height * PHOTO_ASPECT))
        const availablePhoto = containerWidth - COLUMN_GAP - textWidth
        return availablePhoto - idealPhoto
      }

      let gLo = gOf(lo)
      let gHi = gOf(hi)
      let bestTextWidth = Math.abs(gLo) <= Math.abs(gHi) ? lo : hi

      if ((gLo > 0) !== (gHi > 0)) {
        // Signs differ -> an exact crossing exists in range; bisect for it.
        for (let i = 0; i < 16 && hi - lo > 0.5; i++) {
          const mid = (lo + hi) / 2
          const gMid = gOf(mid)
          bestTextWidth = mid
          if (Math.abs(gMid) < 0.5) break
          if ((gMid > 0) === (gLo > 0)) {
            lo = mid
            gLo = gMid
          } else {
            hi = mid
            gHi = gMid
          }
        }
      }
      // Otherwise no exact crossing fits inside the bounds (e.g. a very
      // narrow or very wide container, or simply more text than this
      // container can show beside a height-matched photo at all) --
      // bestTextWidth already holds whichever endpoint gets closest.

      const finalHeight = measureHeightAtWidth(bestTextWidth)
      // Hard ceiling: never exceed the space actually left over, even when
      // the height-matching ideal would ask for more than that (no exact
      // solution existed in range). Overflowing the row is worse than an
      // imperfect height match.
      const availableForPhoto = Math.max(MIN_PHOTO_WIDTH, containerWidth - COLUMN_GAP - bestTextWidth)
      const finalPhotoWidth = Math.min(
        MAX_PHOTO_WIDTH,
        availableForPhoto,
        Math.max(MIN_PHOTO_WIDTH, Math.round(finalHeight * PHOTO_ASPECT)),
      )
      setSizes({ photoWidth: Math.round(finalPhotoWidth), textWidth: Math.round(bestTextWidth) })
    }

    solve()
    const resizeObserver = new ResizeObserver(solve)
    resizeObserver.observe(container)
    desktop.addEventListener('change', solve)
    document.fonts?.ready.then(solve)

    return () => {
      resizeObserver.disconnect()
      desktop.removeEventListener('change', solve)
    }
  }, [])

  return (
    <section className="px-5 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7">
      <div
        ref={containerRef}
        className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[var(--photo-w)_var(--text-w)] md:items-start md:justify-center md:gap-12"
        style={{ '--photo-w': `${sizes.photoWidth}px`, '--text-w': `${sizes.textWidth}px` } as React.CSSProperties}
      >
        <FadeIn x={-30} y={0} className="mx-auto w-full max-w-xs md:mx-0 md:w-full md:max-w-none">
          <img
            src={seniorHeadshot}
            alt="Aarush Pomar"
            className="aspect-[2/3] w-full rounded-2xl object-cover object-top"
          />
        </FadeIn>

        <FadeIn
          ref={textRef}
          delay={0.1}
          className="flex flex-col gap-2 text-sm leading-normal text-[#0C0C0C] md:w-[var(--text-w)] md:text-base"
        >
          <p>Hi, I&rsquo;m Aarush.</p>

          <p>
            I&rsquo;m a senior at Minnetonka High School with an interest in economics. I want to
            understand why financial security is so uneven, and how the decisions made by
            governments and businesses affect people&rsquo;s everyday lives.
          </p>

          <p>
            As a Regional Director at{' '}
            <a
              href="https://borgenproject.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#230cd1] underline decoration-[#230cd1]/40 underline-offset-4 transition-colors hover:text-[#160884]"
            >
              The Borgen Project
            </a>
            , I organize fundraising and outreach in my community to build support for legislation
            that reduces global poverty. I&rsquo;ve raised $1,475 for the organization and helped
            get more than 50 people to contact Congress, including messages urging
            Minnesota&rsquo;s senators and our representative to support the Global Fragility
            Reauthorization Act. It&rsquo;s one more way I&rsquo;ve tried to act on the questions
            about economic security that first got me interested in this work.
          </p>

          <p>
            I&rsquo;ve also used proceeds from my own business to support that work. Running a
            business has given me a lot of opportunities to listen -- to clients, friends, and
            people whose experiences are different from mine.
          </p>

          <p>
            Some of those conversations have led to questions I&rsquo;m now exploring through
            research: How do immigration-enforcement concerns affect local businesses in
            Minnesota? How do different generations of South Asian Americans understand and talk
            about caste?
          </p>

          <p>
            At school, I founded Econ Club to give students a place to explore economics together.
            Outside of school, I enjoy playing pickleball, going to the gym, and building PCs.
          </p>

          <p>Thanks for stopping by. If something here interests you, I&rsquo;d love to hear from you.</p>

          {/* The source image is white strokes on a solid black square --
              there's no black-ink version of this asset. `invert(1)` flips
              it to black strokes on a solid white square first, then the
              same knock-out trick as before (now `multiply` instead of
              `screen`, since the field to cancel out is now white instead
              of black) drops that white square against the page. The
              `FadeIn` wrapper's inline `transform` from framer-motion
              creates its own stacking context, so the blend has no real
              page background behind it to blend against -- filling this
              wrapper with the exact page background color gives it a
              same-colored backdrop to cancel against regardless of that
              isolation, so it reads as seamless either way. */}
          <div className="-ml-2 w-36 bg-[#F2F1EE] sm:w-40">
            <img
              src={signatureWhite}
              alt="Aarush Pomar&rsquo;s signature"
              className="block w-full"
              style={{ filter: 'invert(1)', mixBlendMode: 'multiply' }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
