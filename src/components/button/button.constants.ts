import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center button',
  variants: {
    variant: {
      default: 'button-default',
      primary: 'button-primary',
      secondary: 'button-secondary',
      ghost: 'button-ghost',
      link: 'button-link',
    },
    size: {
      default: 'button-default',
      sm: 'button-sm',
      md: 'button-md',
      lg: 'button-lg',
      xl: 'button-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})
