import { cn } from '@/helpers/utils'
import type { ButtonSize, ButtonVariant } from './button.types'

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

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

const VARIANT_CLASSES = {
  default: 'bg-primary text-primary-foreground shadow hover:hover:bg-primary/90',
  primary: 'bg-primary text-primary-foreground shadow hover:hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:hover:bg-secondary/80',
  outline:
    'border border-border bg-background shadow-sm hover:hover:bg-accent hover:hover:text-accent-foreground',
  ghost: 'hover:hover:bg-accent hover:hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:hover:underline',
  destructive: 'bg-destructive text-destructive-foreground shadow hover:hover:bg-destructive/90',
}

const SIZE_CLASSES = {
  default: 'px-3 py-2',
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-3.5 py-2.5 text-lg',
  xl: 'px-4 py-2.5 text-xl',
}

export function buttonVariants({
  variant = 'default',
  size = 'default',
  active = false,
  asChild = false,
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  active?: boolean
  asChild?: boolean
  className?: string
}) {
  return cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    active && !asChild && 'ring-2 ring-ring ring-offset-2',
    className
  )
}
