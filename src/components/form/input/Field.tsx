'use client'

import { useState } from 'react'
import { useInputContext } from './context'
import { cn } from '@/helpers/utils'
import Error from './Error'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: React.HTMLInputTypeAttribute
  name: string
}

function Field({ className, type = 'text', ...props }: InputProps) {
  const { id } = useInputContext()
  const [error, setError] = useState<string | null>(null)
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  const ariaDescribedBy = [errorId, descriptionId].filter(Boolean).join(' ')

  return (
    <>
      <input
        id={id}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground',
          'hover:border-border/80 hover:bg-muted/20',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground',
          'user-invalid:border-destructive user-invalid:text-destructive user-invalid:focus-visible:ring-destructive',
          className
        )}
        type={type}
        aria-describedby={ariaDescribedBy}
        aria-required={props.required}
        aria-disabled={props.disabled}
        aria-readonly={props.readOnly}
        aria-invalid={!!error}
        onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
          setError((e.target as HTMLInputElement).validationMessage)
        }}
        {...props}
      />
      <Error>{error}</Error>
    </>
  )
}

Field.displayName = 'Input.Field'

export default Field
