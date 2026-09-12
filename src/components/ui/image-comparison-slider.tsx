import { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronsLeftRight } from 'lucide-react'

interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
  altBefore?: string
  altAfter?: string
  className?: string
}

export default function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = 'Before',
  altAfter = 'After',
  className,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      let newPosition = ((clientX - rect.left) / rect.width) * 100
      newPosition = Math.max(0, Math.min(100, newPosition))
      setSliderPosition(newPosition)
    },
    [isDragging],
  )

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX)

  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX)

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden rounded-[32px] border-2 border-[#D7E2EA] ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
        <img src={afterImage} alt={altAfter} className="h-full w-full object-cover object-center" draggable="false" />
      </div>

      <img src={beforeImage} alt={altBefore} className="block h-full w-full object-cover object-center" draggable="false" />

      <div
        className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-[#D7E2EA]/80"
        style={{ left: `calc(${sliderPosition}% - 0.125rem)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#D7E2EA] bg-[#0C0C0C] shadow-lg transition-transform duration-200 ease-out ${
            isDragging ? 'scale-110' : ''
          }`}
        >
          <ChevronsLeftRight size={13} strokeWidth={2} className="text-[#D7E2EA]" />
        </div>
      </div>
    </div>
  )
}
