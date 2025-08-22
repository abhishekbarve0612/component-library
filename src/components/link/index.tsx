import { cn } from '@/helpers/utils'
import type { AnchorHTMLAttributes } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
  href?: string
  to?: string
  [key: string]: unknown
}

function Link({ children, className, ...props }: LinkProps) {
  return (
    <a
      className={cn(
        'text-primary hover:text-primary/80 underline-offset-4 transition-colors duration-200',
        'focus:ring-ring focus:ring-offset-background hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export default Link
