import React from 'react'
import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'

export interface TextareaLabelProps {
  children: React.ReactNode
  className?: string
  htmlFor?: string
}

function TextareaLabel({ children, className, htmlFor }: TextareaLabelProps) {
  const { textareaId, required, labelId } = useTextareaContext()
  
  return (
    <label
      id={labelId}
      htmlFor={htmlFor || textareaId}
      className={cn(
        'block text-sm font-medium text-gray-700',
        className
      )}
    >
      {children}
      {required && (
        <span className='text-red-500 ml-1' aria-label='required'>
          *
        </span>
      )}
    </label>
  )
}

TextareaLabel.displayName = 'Textarea.Label'

export default TextareaLabel