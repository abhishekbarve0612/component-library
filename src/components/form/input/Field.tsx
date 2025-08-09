import { useState } from 'react'
import { useInputContext } from './context'
import { cn } from '@/helpers/utils'
import Error from './Error'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: React.HTMLInputTypeAttribute
  name: string
}

function Field({ className, type = 'text', ...props }: InputProps) {
  const { id } = useInputContext()
  const [error, setError] = useState<string | null>(null)
  return (
    <>
      <input
        id={id}
        className={cn('input user-invalid:border-red-500 user-invalid:text-red-500', className)}
        type={type}
        aria-describedby={id}
        aria-label={id}
        aria-required={props.required}
        aria-disabled={props.disabled}
        aria-readonly={props.readOnly}
        aria-invalid={!!error}
        aria-placeholder={props.placeholder}
        onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
          console.log('invalid', (e.target as HTMLInputElement))
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
