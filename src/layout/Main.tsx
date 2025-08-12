import type { HTMLAttributes } from 'react'
import { cn } from '@/helpers/utils'

interface MainProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={cn('container mx-auto px-4 py-8', className)} {...props}>
      {children}
    </main>
  )
}

export default Main
