import Input from '@/components/form/input'
import type { InputHTMLAttributes } from 'react'

type ResetPasswordInputType = 'password' | 'confirmPassword'

interface ResetPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: ResetPasswordInputType
  error?: string
}

const inputConfig = {
  password: {
    type: 'password' as const,
    label: 'New Password',
    placeholder: 'Enter your new password',
    autoComplete: 'new-password',
    required: true,
  },
  confirmPassword: {
    type: 'password' as const,
    label: 'Confirm New Password',
    placeholder: 'Confirm your new password',
    autoComplete: 'new-password',
    required: true,
  },
} as const

function ResetPasswordInput({
  type = 'password',
  error,
  name,
  className,
  ...props
}: ResetPasswordInputProps) {
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

ResetPasswordInput.displayName = 'ResetPassword.Input'

export default ResetPasswordInput
