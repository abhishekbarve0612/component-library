import { cn } from '@/helpers/utils'
import type { ButtonSize, ButtonVariant } from './button.types'
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.constants'
import './button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) => {
  const variantClasses = BUTTON_VARIANTS[variant]
  const sizeClasses = BUTTON_SIZES[size]

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center button',
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

Button.VARIANTS = BUTTON_VARIANTS
Button.SIZES = BUTTON_SIZES

export default Button
