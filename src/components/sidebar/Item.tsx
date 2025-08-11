import { type ReactNode } from 'react'
import { cn } from '@/helpers/utils'

interface ItemProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
}

function Item({ children, active, onClick }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn('w-full rounded px-4 py-2 text-left transition-colors hover:bg-gray-100', {
        'bg-gray-200 font-medium': active,
      })}
    >
      {children}
    </button>
  )
}

Item.displayName = 'SidebarItem'

export default Item
