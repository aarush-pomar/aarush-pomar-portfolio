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
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#0C0C0C]/25 bg-[#0C0C0C]/[0.03] text-[#0C0C0C]/55 ${className ?? 'aspect-[4/3] w-full'}`}
      style={style}
    >
      <ImageOff className="h-8 w-8" strokeWidth={1.5} />
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
  )
}
