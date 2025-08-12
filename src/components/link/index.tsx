import { cn } from '@/helpers/utils'
import type { AnchorHTMLAttributes } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
  href?: string
  to?: string
}

function Link({ children, className, ...props }: LinkProps) {
  return (
    <a 
      className={cn(
        'text-primary hover:text-primary/80 underline-offset-4 transition-colors duration-200',
        'hover:hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        className
      )} 
      {...props}
    >
      {children}
    </a>
  )
}

export default Link
