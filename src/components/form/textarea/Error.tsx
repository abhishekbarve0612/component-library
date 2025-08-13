'use client'

import React from 'react'
import { useGSAP } from '@gsap/react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'
import { errorAnimation } from './animations'
import type { TextareaErrorProps } from './types'

function TextareaError({ children, className }: TextareaErrorProps) {
  const { error, errorId, hasError } = useTextareaContext()
  const errorRef = React.useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!errorRef.current) return

    if (hasError) {
      errorAnimation(errorRef.current)
    }
  }, [hasError])

  if (!hasError) return null

  const errorMessage = children || (typeof error === 'string' ? error : 'This field has an error')

  return (
    <div
      ref={errorRef}
      id={errorId}
      role="alert"
      aria-live="polite"
      className={cn('flex items-center gap-1.5 text-sm text-red-600', className)}
    >
      <FaExclamationTriangle className="h-3 w-3 flex-shrink-0" />
      <span>{errorMessage}</span>
    </div>
  )
}

TextareaError.displayName = 'Textarea.Error'

export default TextareaError
