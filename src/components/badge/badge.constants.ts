import { cn } from '@/helpers/utils'
import type { BadgeSize, BadgeVariant } from './badge.types'

export const SIZES = {
  default: 'default',
  sm: 'sm',
  lg: 'lg',
}

export const VARIANTS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
  outline: 'outline',
}

const BASE_CLASSES =
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap'

const VARIANT_CLASSES = {
  default: 'bg-primary/10 text-primary border border-primary/20',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-100 text-green-800 border border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
  outline:
    'bg-transparent border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
}

const SIZE_CLASSES = {
  default: 'px-4 py-1 text-xs min-h-[1.25rem]',
  sm: 'px-3 py-0.5 text-xs min-h-[1rem]',
  lg: 'px-6 py-2 text-sm min-h-[1.5rem]',
}

export function badgeVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}) {
  return cn(BASE_CLASSES, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className)
}
