import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import type { LoaderSize } from '../types'

interface PulseProps {
  size: LoaderSize
  color: string
  className?: string
}

const sizeClasses = {
  xs: 'w-2 h-2',
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
}

function Pulse({ size, color, className }: PulseProps) {
  const pulseRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.3,
        opacity: 0.4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }
  }, [])

  return (
    <div
      ref={pulseRef}
      className={cn(
        'inline-block rounded-full bg-current transform-gpu',
        sizeClasses[size],
        color,
        className
      )}
      role="img"
      aria-label="Loading pulse"
    />
  )
}

export default Pulse