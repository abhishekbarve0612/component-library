import type { HTMLAttributes } from 'react'
import { cn } from '@/helpers/utils'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  className?: string
}

function H1({ children, className, ...props }: HeadingProps) {
  return (
    <h1 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight', className)} {...props}>
      {children}
    </h1>
  )
}

function H2({ children, className, ...props }: HeadingProps) {
  return (
    <h2 className={cn('text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h2>
  )
}

function H3({ children, className, ...props }: HeadingProps) {
  return (
    <h3 className={cn('text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
}

function H4({ children, className, ...props }: HeadingProps) {
  return (
    <h4 className={cn('text-lg md:text-xl font-medium tracking-tight', className)} {...props}>
      {children}
    </h4>
  )
}

function H5({ children, className, ...props }: HeadingProps) {
  return (
    <h5 className={cn('text-base md:text-lg font-medium tracking-tight', className)} {...props}>
      {children}
    </h5>
  )
}

function H6({ children, className, ...props }: HeadingProps) {
  return (
    <h6 className={cn('text-sm md:text-base font-medium tracking-tight', className)} {...props}>
      {children}
    </h6>
  )
}

const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}

export default Heading
