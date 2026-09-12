import type { ReactNode } from 'react'
import PlaceholderImage from './PlaceholderImage'

interface FeatureCardProps {
  number: string
  category: string
  title: string
  children: ReactNode
  imageLabel?: string
  imageSrc?: string
  imageCaption?: string
  actions?: ReactNode
  className?: string
}

export default function FeatureCard({
  number,
  category,
  title,
  children,
  imageLabel,
  imageSrc,
  imageCaption,
  actions,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={`rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:rounded-[40px] sm:p-7 md:rounded-[48px] md:p-8 ${className ?? ''}`}
    >
      <div className="flex flex-wrap items-center gap-4 pb-6 sm:gap-6">
        <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)' }}>
          {number}
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA] opacity-60 sm:text-sm">
            {category}
          </span>
          <h3 className="hero-heading text-xl font-black uppercase tracking-tight sm:text-2xl md:text-3xl">
            {title}
          </h3>
        </div>
        {actions}
      </div>

      <div className={imageLabel ? 'grid gap-6 md:grid-cols-[1fr_260px]' : ''}>
        <div className="space-y-3 text-sm leading-relaxed text-[#D7E2EA]/85 sm:text-base">{children}</div>
        {imageLabel && (
          <div className="flex flex-col gap-2">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageLabel}
                className="aspect-square w-full rounded-2xl object-cover sm:aspect-[4/3] md:aspect-square"
                loading="lazy"
              />
            ) : (
              <PlaceholderImage label={imageLabel} className="aspect-square w-full sm:aspect-[4/3] md:aspect-square" />
            )}
            {imageCaption && <p className="text-xs italic text-[#D7E2EA]/50">{imageCaption}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
