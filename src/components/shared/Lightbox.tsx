import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'

interface LightboxProps {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

// Shows a photo in full (uncropped). Rendered in a portal so no ancestor's
// transform can turn `fixed` into something relative to the card it came from.
export default function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-black/90 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D7E2EA]/60 bg-[#0C0C0C]/70 text-[#D7E2EA] transition-colors hover:border-[#D7E2EA] sm:right-6 sm:top-6"
      >
        <X size={20} strokeWidth={2} />
      </button>
      <motion.img
        src={src}
        alt={alt}
        className="max-h-[80vh] max-w-full rounded-2xl object-contain"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      />
      {caption && <p className="max-w-xl text-center text-sm italic text-[#D7E2EA]/70">{caption}</p>}
    </motion.div>,
    document.body,
  )
}

// The small "Click to enlarge" pill that sits in a corner of a clickable photo.
export function EnlargeHint() {
  return (
    <span className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-[#0C0C0C]/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA] backdrop-blur-sm">
      <motion.span
        className="flex"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: 'easeInOut' }}
      >
        <Maximize2 size={12} strokeWidth={2.25} />
      </motion.span>
      Click to enlarge
    </span>
  )
}
