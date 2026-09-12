import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const total = text.length
  const tokens = text.split(/(\s+)/)
  let charIndex = 0

  return (
    <p ref={ref} className={className} style={style}>
      {tokens.map((token, ti) => {
        const isSpace = /^\s+$/.test(token)
        const startIndex = charIndex
        charIndex += token.length

        if (isSpace) {
          // Render as plain text -- animating a space's opacity has no visible
          // effect, and wrapping it in its own inline-block box causes browsers
          // to collapse it to zero width (it's both leading and trailing
          // whitespace inside that box).
          return token
        }

        return (
          <span key={ti} className="inline-block whitespace-nowrap">
            {token.split('').map((char, i) => (
              <Char key={startIndex + i} char={char} index={startIndex + i} total={total} progress={scrollYProgress} />
            ))}
          </span>
        )
      })}
    </p>
  )
}
