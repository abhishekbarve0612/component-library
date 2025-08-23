import type { HTMLAttributes } from 'react'
import { cn } from '@/helpers/utils'

interface MainProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

function Main({ children, className, ...props }: MainProps) {
  return (
    <main
      className={cn('mx-auto w-full max-w-full lg:container lg:px-4 lg:py-8', className)}
      {...props}
    >
      {children}
    </main>
  )
}

export default Main
