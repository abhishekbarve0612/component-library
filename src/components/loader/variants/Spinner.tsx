'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import type { LoaderSize } from '../types'

interface SpinnerProps {
  size: LoaderSize
  color: string
  className?: string
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

function Spinner({ size, color, className }: SpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <div className={cn('relative inline-block', sizeClasses[size], color, className)}>
      <div
        ref={spinnerRef}
        className="absolute inset-0 transform-gpu rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, currentColor 90deg, transparent 360deg)`,
          mask: 'radial-gradient(circle, transparent 60%, black 60%)',
          WebkitMask: 'radial-gradient(circle, transparent 60%, black 60%)',
        }}
        role="img"
        aria-label="Loading spinner"
      />
    </div>
  )
}

export default Spinner
