import { ImageOff } from 'lucide-react'
import type { CSSProperties } from 'react'

interface PlaceholderImageProps {
  label?: string
  className?: string
  style?: CSSProperties
}

export default function PlaceholderImage({ label = 'Image goes here', className, style }: PlaceholderImageProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D7E2EA]/30 bg-[#141414] text-[#D7E2EA]/40 ${className ?? 'aspect-[4/3] w-full'}`}
      style={style}
    >
      <ImageOff className="h-8 w-8" strokeWidth={1.5} />
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
  )
}
