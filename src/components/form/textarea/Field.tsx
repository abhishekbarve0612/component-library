import React from 'react'
import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'
import { focusAnimation } from './animations'

export interface TextareaFieldProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'name' | 'required' | 'disabled'> {
  placeholder?: string
  rows?: number
  className?: string
}

function TextareaField({ 
  placeholder,
  rows = 4,
  className,
  ...props 
}: TextareaFieldProps) {
  const {
    value,
    onValueChange,
    name,
    required,
    disabled,
    hasError,
    maxLength,
    autoResize,
    textareaId,
    labelId,
    errorId,
    descriptionId,
    description,
  } = useTextareaContext()
  
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  
  const adjustHeight = React.useCallback(() => {
    if (!autoResize || !textareaRef.current) return
    
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [autoResize])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onValueChange?.(newValue)
    
    if (autoResize) {
      setTimeout(adjustHeight, 0)
    }
  }

  const handleFocus = () => {
    if (textareaRef.current && !disabled) {
      focusAnimation(textareaRef.current)
    }
  }

  React.useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const ariaDescribedBy = [
    description ? descriptionId : null,
    hasError ? errorId : null
  ].filter(Boolean).join(' ') || undefined

  return (
    <textarea
      ref={textareaRef}
      id={textareaId}
      name={name}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      required={required}
      disabled={disabled}
      aria-labelledby={labelId}
      aria-describedby={ariaDescribedBy}
      aria-invalid={hasError}
      className={cn(
        'w-full rounded-md border bg-white/70 backdrop-blur-sm px-3 py-2 text-sm transition-all outline-none resize-y',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
        'hover:bg-white/90 hover:border-gray-400',
        {
          'border-gray-300': !hasError,
          'border-red-500 focus:border-red-500 focus:ring-red-200': hasError,
          'opacity-50 cursor-not-allowed bg-gray-50': disabled,
          'resize-none overflow-hidden': autoResize,
        },
        className
      )}
      style={{
        minHeight: autoResize ? `${rows * 1.5}rem` : undefined,
      }}
      {...props}
    />
  )
}

TextareaField.displayName = 'Textarea.Field'

export default TextareaField