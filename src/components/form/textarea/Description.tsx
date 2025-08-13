'use client'

import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'
import type { TextareaDescriptionProps } from './types'

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
