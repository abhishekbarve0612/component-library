import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import type { LoaderSize } from '../types'

interface BarsProps {
  size: LoaderSize
  color: string
  className?: string
}

const sizeClasses = {
  xs: { width: 'w-0.5', height: 'h-3', gap: 'gap-0.5' },
  sm: { width: 'w-0.5', height: 'h-4', gap: 'gap-1' },
  md: { width: 'w-1', height: 'h-6', gap: 'gap-1' },
  lg: { width: 'w-1', height: 'h-8', gap: 'gap-1.5' },
  xl: { width: 'w-1.5', height: 'h-12', gap: 'gap-2' },
}

function Bars({ size, color, className }: BarsProps) {
  const barsRef = useRef<HTMLDivElement>(null)
  const sizeConfig = sizeClasses[size]

  useGSAP(() => {
    if (barsRef.current) {
      const bars = barsRef.current.children
      const tl = gsap.timeline({ repeat: -1 })
      
      Array.from(bars).forEach((bar, index) => {
        tl.to(bar, {
          scaleY: 2,
          duration: 0.4,
          ease: 'power2.inOut',
        }, index * 0.1)
        .to(bar, {
          scaleY: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        }, index * 0.1 + 0.4)
      })
    }
  }, [])

  return (
    <div
      ref={barsRef}
      className={cn('flex items-end', sizeConfig.gap, className)}
      role="img"
      aria-label="Loading bars"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-current rounded-sm transform-gpu origin-bottom',
            sizeConfig.width,
            sizeConfig.height,
            color
          )}
        />
      ))}
    </div>
  )
}

export default Bars