'use client'

import React from 'react'
import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'

export interface TextareaDescriptionProps {
  children: React.ReactNode
  className?: string
}

function TextareaDescription({ children, className }: TextareaDescriptionProps) {
  const { descriptionId } = useTextareaContext()

  return (
    <p id={descriptionId} className={cn('text-sm text-gray-600', className)}>
      {children}
    </p>
  )
}

TextareaDescription.displayName = 'Textarea.Description'

export default TextareaDescription
