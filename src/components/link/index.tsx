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
    <a className={cn('text-primary-500 dark:text-primary-400', className)} {...props}>
      {children}
    </a>
  )
}

export default Link
