import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import type { LoaderSize } from '../types'

interface DotsProps {
  size: LoaderSize
  color: string
  className?: string
}

const sizeClasses = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
}

const gapClasses = {
  xs: 'gap-1',
  sm: 'gap-1',
  md: 'gap-1.5',
  lg: 'gap-2',
  xl: 'gap-3',
}

function Dots({ size, color, className }: DotsProps) {
  const dotsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (dotsRef.current) {
      const dots = dotsRef.current.children
      const tl = gsap.timeline({ repeat: -1 })

      Array.from(dots).forEach((dot, index) => {
        tl.to(
          dot,
          {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          index * 0.2
        ).to(
          dot,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          index * 0.2 + 0.6
        )
      })
    }
  }, [])

  return (
    <div
      ref={dotsRef}
      className={cn('flex items-center', gapClasses[size], className)}
      role="img"
      aria-label="Loading dots"
    >
      <div className={cn('rounded-full bg-current', sizeClasses[size], color)} />
      <div className={cn('rounded-full bg-current', sizeClasses[size], color)} />
      <div className={cn('rounded-full bg-current', sizeClasses[size], color)} />
    </div>
  )
}

export default Dots
