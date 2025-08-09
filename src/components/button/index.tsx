import type { ButtonSize, ButtonVariant } from './button.types'
import { buttonVariants } from './button.constants'
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
  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}

Button.variants = buttonVariants

export default Button
