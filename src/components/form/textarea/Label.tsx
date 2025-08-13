'use client'

import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'
import type { TextareaLabelProps } from './types'

function TextareaLabel({ children, className, htmlFor }: TextareaLabelProps) {
  const { textareaId, required, labelId } = useTextareaContext()

  return (
    <label
      id={labelId}
      htmlFor={htmlFor || textareaId}
      className={cn('block text-sm font-medium text-gray-700', className)}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-label="required">
          *
        </span>
      )}
    </label>
  )
}

TextareaLabel.displayName = 'Textarea.Label'

export default TextareaLabel
