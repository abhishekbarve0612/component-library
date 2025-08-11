import { createPortal } from 'react-dom'
import { type ReactNode, useEffect } from 'react'
import { cn } from '@/helpers/utils'
import Item from './Item'
import { SidebarBody, SidebarFooter, SidebarHeader, SidebarOverlay } from './Components'

interface SidebarProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  children: ReactNode
  overlayClassName?: string
}

function Sidebar({ open, onClose, side = 'left', children, overlayClassName }: SidebarProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (typeof window === 'undefined') return null

  return createPortal(
    <>
      <SidebarOverlay className={overlayClassName} onClose={onClose} open={open} />

      <div
        className={cn(
          'fixed top-0 bottom-0 z-50 flex w-80 flex-col bg-white shadow-xl transition-transform duration-300',
          'dark:bg-slate-900 dark:shadow-slate-900/20',
          'border-r border-slate-200 dark:border-slate-700',
          {
            'left-0': side === 'left',
            'right-0': side === 'right',
            '-translate-x-full': side === 'left' && !open,
            'translate-x-full': side === 'right' && !open,
            'translate-x-0': open,
          }
        )}
      >
        {children}
      </div>
    </>,
    document.body
  )
}

Sidebar.Header = SidebarHeader
Sidebar.Body = SidebarBody
Sidebar.Footer = SidebarFooter
Sidebar.Item = Item

export default Sidebar
