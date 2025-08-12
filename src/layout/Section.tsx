import type { HTMLAttributes } from 'react'
import { cn } from '@/helpers/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn('space-y-8', className)} {...props}>
      {children}
    </section>
  )
}

export default Section
