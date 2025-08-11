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
          'fixed top-0 bottom-0 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300',
          {
            'left-0': side === 'left' && open,
            'right-0': side === 'right' && open,
            'translate-x-0': open,
            'translate-x-full': !open,
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
