export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  name?: string
  required?: boolean
  disabled?: boolean
  error?: string | boolean
  description?: string
  maxLength?: number
  autoResize?: boolean
  className?: string
}

export interface TextareaLabelProps {
  children: React.ReactNode
  className?: string
  htmlFor?: string
}

export interface TextareaCountProps {
  className?: string
  showMax?: boolean
  warningThreshold?: number
}

export interface TextareaDescriptionProps {
  children: React.ReactNode
  className?: string
}

export interface TextareaErrorProps {
  children?: React.ReactNode
  className?: string
}

export interface TextareaFieldProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'name' | 'required' | 'disabled'
  > {
  placeholder?: string
  rows?: number
  className?: string
}
