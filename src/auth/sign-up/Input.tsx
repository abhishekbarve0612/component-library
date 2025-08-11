import Input from '@/components/form/input'
import type { InputProps } from '@/components/form/input/Field'

const fields = [
  'email',
  'username',
  'firstName',
  'lastName',
  'password',
  'confirmPassword',
] as const

type Field = (typeof fields)[number]

interface FieldConfig {
  name: string
  type: string
  placeholder?: string
  label?: string
  autoComplete?: string
  required?: boolean
}

const fieldConfig: Record<Field, FieldConfig> = {
  email: {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    autoComplete: 'email',
    required: true,
  },
  username: {
    name: 'username',
    type: 'text',
    placeholder: 'Choose a username',
    label: 'Username',
    autoComplete: 'username',
    required: true,
  },
  firstName: {
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter your first name',
    label: 'First Name',
    autoComplete: 'given-name',
    required: true,
  },
  lastName: {
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter your last name',
    label: 'Last Name',
    autoComplete: 'family-name',
    required: true,
  },
  password: {
    name: 'password',
    type: 'password',
    placeholder: 'Create a password',
    label: 'Password',
    autoComplete: 'new-password',
    required: true,
  },
  confirmPassword: {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
    label: 'Confirm Password',
    autoComplete: 'new-password',
    required: true,
  },
}

interface SignUpInputProps extends Omit<InputProps, 'name'> {
  field: Field
  fieldConfig?: FieldConfig
}

function SignUpInput({ field, ...props }: SignUpInputProps) {
  const config = {
    ...fieldConfig[field],
    ...props,
  }

  return (
    <Input>
      <Input.Group>
        <Input.Label>{config.label}</Input.Label>
        <Input.Field {...config} {...props} />
      </Input.Group>
    </Input>
  )
}

SignUpInput.FIELDS = fields
SignUpInput.displayName = 'SignUpInput'

export default SignUpInput
