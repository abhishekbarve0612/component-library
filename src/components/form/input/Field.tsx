'use client'

import { useState } from 'react'
import { useInputContext } from './context'
import { cn } from '@/helpers/utils'
import Error from './Error'
import type { InputFieldProps } from './types'

function Field({ className, type = 'text', ...props }: InputFieldProps) {
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
          'border-input bg-background text-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors',
          'file:text-foreground placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'hover:border-border/80 hover:bg-muted/20',
          'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
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
