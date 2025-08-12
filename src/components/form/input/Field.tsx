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
          'input user-invalid:border-red-500 user-invalid:text-red-500',
          'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500',
          'focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
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
