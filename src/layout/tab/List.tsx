import { cn } from '@/helpers/utils'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function List({ children, className = '', ...props }: Props) {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

List.displayName = 'Tabs.List'

export default List
