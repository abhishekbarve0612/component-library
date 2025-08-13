'use client'

import TextareaProvider from './TextAreaProvider'
import TextareaField from './Field'
import TextareaLabel from './Label'
import TextareaDescription from './Description'
import TextareaError from './Error'
import TextareaCount from './Count'
import type { TextareaProps } from './types'

function Textarea({
  children,
  value = '',
  onValueChange,
  name,
  required = false,
  disabled = false,
  error,
  description,
  maxLength,
  autoResize = false,
  className,
  ...props
}: TextareaProps) {
  return (
    <TextareaProvider
      value={value}
      onValueChange={onValueChange}
      name={name}
      required={required}
      disabled={disabled}
      error={error}
      description={description}
      maxLength={maxLength}
      autoResize={autoResize}
      className={className}
      {...props}
    >
      <div className="space-y-2">{children}</div>
    </TextareaProvider>
  )
}

Textarea.Field = TextareaField
Textarea.Label = TextareaLabel
Textarea.Description = TextareaDescription
Textarea.Error = TextareaError
Textarea.Count = TextareaCount

Textarea.displayName = 'Textarea'

export default Textarea
