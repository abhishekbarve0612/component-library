import type { ButtonSize, ButtonVariant } from './button.types'
import { SIZES, VARIANTS, buttonVariants } from './button.constants'
import './button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  ref?: React.RefObject<HTMLButtonElement>
}

const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button ref={ref} className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}

Button.variants = VARIANTS
Button.sizes = SIZES

export default Button
