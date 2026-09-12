import { motion } from 'framer-motion'
import type { ReactNode, ElementType, Ref } from 'react'

interface FadeInProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
  // React 19 lets function components accept `ref` as a plain prop -- no
  // forwardRef needed. Useful when a caller needs the underlying DOM node
  // (e.g. to measure it for another element to react to).
  ref?: Ref<HTMLElement>
}

export default function FadeIn({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ref,
}: FadeInProps) {
  const MotionTag = motion.create(as)

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  )
}
