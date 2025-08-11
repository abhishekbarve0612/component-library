import React from 'react'
import type { ButtonSize, ButtonVariant } from './button.types'
import { SIZES, VARIANTS, buttonVariants } from './button.constants'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  active?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  active = false,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button ref={ref} className={buttonVariants({ variant, size, className, active })} {...props}>
      {children}
    </button>
  )
}

Button.variants = VARIANTS
Button.sizes = SIZES

export default Button
