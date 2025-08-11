import { cn } from '@/helpers/utils'
import { type ReactNode } from 'react'

function SidebarHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{children}</div>
    </div>
  )
}

function SidebarBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function SidebarFooter({ children }: { children: ReactNode }) {
  return <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-700">{children}</div>
}

interface SidebarOverlayProps {
  className?: string
  onClose: () => void
  open: boolean
  overlayRef?: React.RefObject<HTMLDivElement | null>
}

function SidebarOverlay({ className, onClose, open, overlayRef }: SidebarOverlayProps) {
  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      className={cn(
        'fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm',
        'dark:bg-slate-950/50',
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
