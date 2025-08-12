import { tv } from 'tailwind-variants'

export const SIZES = {
  default: 'default',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

export const VARIANTS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  link: 'link',
  destructive: 'destructive',
}

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground shadow hover:hover:bg-primary/90',
      primary:
        'bg-primary text-primary-foreground shadow hover:hover:bg-primary/90',
      secondary:
        'bg-secondary text-secondary-foreground shadow-sm hover:hover:bg-secondary/80',
      outline:
        'border border-border bg-background shadow-sm hover:hover:bg-accent hover:hover:text-accent-foreground',
      ghost:
        'hover:hover:bg-accent hover:hover:text-accent-foreground',
      link:
        'text-primary underline-offset-4 hover:hover:underline',
      destructive:
        'bg-destructive text-destructive-foreground shadow hover:hover:bg-destructive/90',
    },
    size: {
      default: 'px-3 py-2',
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-3.5 py-2.5 text-lg',
      xl: 'px-4 py-2.5 text-xl',
    },
    active: {
      true: 'ring-2 ring-ring ring-offset-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})
