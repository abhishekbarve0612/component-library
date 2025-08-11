import Input from '@/components/form/input'
import type { InputHTMLAttributes } from 'react'

type SignInInputType = 'email' | 'password' | 'username'

interface SignInInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: SignInInputType
  error?: string
}

const inputConfig = {
  email: {
    type: 'email' as const,
    label: 'Email',
    placeholder: 'Enter your email address',
    autoComplete: 'email',
    required: true,
  },
  password: {
    type: 'password' as const,
    label: 'Password',
    placeholder: 'Enter your password',
    autoComplete: 'current-password',
    required: true,
  },
  username: {
    type: 'text' as const,
    label: 'Username',
    placeholder: 'Enter your username',
    autoComplete: 'username',
    required: true,
  },
} as const

function SignInInput({ 
  type = 'email', 
  error,
  name,
  className,
  ...props 
}: SignInInputProps) {
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

SignInInput.displayName = 'SignIn.Input'

export default SignInInput