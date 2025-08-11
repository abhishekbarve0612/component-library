import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import type { LoaderSize } from '../types'

interface RippleProps {
  size: LoaderSize
  color: string
  className?: string
}

const sizeClasses = {
  xs: { container: 'w-6 h-6', circle: 'w-2 h-2' },
  sm: { container: 'w-8 h-8', circle: 'w-3 h-3' },
  md: { container: 'w-12 h-12', circle: 'w-4 h-4' },
  lg: { container: 'w-16 h-16', circle: 'w-6 h-6' },
  xl: { container: 'w-24 h-24', circle: 'w-8 h-8' },
}

function Ripple({ size, color, className }: RippleProps) {
  const rippleRef = useRef<HTMLDivElement>(null)
  const sizeConfig = sizeClasses[size]

  useGSAP(() => {
    if (rippleRef.current) {
      const circles = rippleRef.current.children
      const tl = gsap.timeline({ repeat: -1 })
      
      Array.from(circles).forEach((circle, index) => {
        tl.fromTo(circle, 
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 2,
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
          }, index * 0.6
        )
      })
    }
  }, [])

  return (
    <div
      ref={rippleRef}
      className={cn('relative flex items-center justify-center', sizeConfig.container, className)}
      role="img"
      aria-label="Loading ripple"
    >
      <div 
        className={cn(
          'absolute rounded-full border-2 border-current transform-gpu',
          sizeConfig.circle,
          color
        )} 
      />
      <div 
        className={cn(
          'absolute rounded-full border-2 border-current transform-gpu',
          sizeConfig.circle,
          color
        )} 
      />
    </div>
  )
}

export default Ripple