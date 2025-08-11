import Input from '@/components/form/input'
import type { InputHTMLAttributes } from 'react'

type ForgotPasswordInputType = 'email'

interface ForgotPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: ForgotPasswordInputType
  error?: string
}

const inputConfig = {
  email: {
    type: 'email' as const,
    label: 'Email Address',
    placeholder: 'Enter your email address',
    autoComplete: 'email',
    required: true,
  },
} as const

function ForgotPasswordInput({
  type = 'email',
  error,
  name,
  className,
  ...props
}: ForgotPasswordInputProps) {
  const config = inputConfig[type]
  const fieldName = name || type

  return (
    <Input className={className}>
      <Input.Label>{config.label}</Input.Label>
      <Input.Field
        name={fieldName}
        type={config.type}
        placeholder={config.placeholder}
        autoComplete={config.autoComplete}
        required={config.required}
        {...props}
      />
      {error && <Input.Error>{error}</Input.Error>}
    </Input>
  )
}

ForgotPasswordInput.displayName = 'ForgotPassword.Input'

export default ForgotPasswordInput
