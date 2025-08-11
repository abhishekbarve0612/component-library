import { cn } from '@/helpers/utils'
import { type ReactNode } from 'react'

function SidebarHeader({ children }: { children: ReactNode }) {
  return <div className="border-b p-4 font-semibold">{children}</div>
}

function SidebarBody({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-y-auto p-4">{children}</div>
}

function SidebarFooter({ children }: { children: ReactNode }) {
  return <div className="border-t p-4">{children}</div>
}

interface SidebarOverlayProps {
  className?: string
  onClose: () => void
  open: boolean
}

function SidebarOverlay({ className, onClose, open }: SidebarOverlayProps) {
  return (
    <div
      onClick={onClose}
      className={cn(
        'fixed inset-0 bg-black/50 transition-opacity duration-300',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
    />
  )
}

SidebarHeader.displayName = 'SidebarHeader'
SidebarBody.displayName = 'SidebarBody'
SidebarFooter.displayName = 'SidebarFooter'
SidebarOverlay.displayName = 'SidebarOverlay'

export { SidebarBody, SidebarFooter, SidebarHeader, SidebarOverlay }
