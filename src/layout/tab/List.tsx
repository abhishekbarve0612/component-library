import { cn } from '@/helpers/utils'
import { useContext } from 'react'
import TabsContext from './context'
import type { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function List({ children, className = '', ...props }: Props) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.List must be used within Tabs')

  const { orientation, size } = context

  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'h-8 p-0.5' : 'w-auto p-0.5',
    md: orientation === 'horizontal' ? 'h-10 p-1' : 'w-auto p-1',
    lg: orientation === 'horizontal' ? 'h-12 p-1.5' : 'w-auto p-1.5',
  }

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-slate-500',
        'bg-[var(--tabs-list-bg,rgb(241_245_249))]',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        sizeClasses[size],
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
