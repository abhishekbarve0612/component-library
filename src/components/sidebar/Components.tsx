'use client'

import { cn } from '@/helpers/utils'
import { type ReactNode } from 'react'

interface SidebarHeaderProps {
  children: ReactNode
  id?: string
}

function SidebarHeader({ children, id = 'sidebar-title' }: SidebarHeaderProps) {
  return (
    <div className="border-border border-b px-6 py-4">
      <div id={id} className="text-foreground text-lg font-bold">
        {children}
      </div>
    </div>
  )
}

interface SidebarBodyProps {
  children: ReactNode
  id?: string
}

function SidebarBody({ children, id = 'sidebar-description' }: SidebarBodyProps) {
  return (
    <div id={id} className="flex-1 overflow-y-auto px-4 py-4">
      <div className="space-y-1" role="group">
        {children}
      </div>
    </div>
  )
}

function SidebarFooter({ children }: { children: ReactNode }) {
  return <div className="border-border border-t px-4 py-4">{children}</div>
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
        'bg-background/80 fixed inset-0 z-40 backdrop-blur-sm',
        open ? 'opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
      aria-hidden="true"
    />
  )
}

SidebarHeader.displayName = 'SidebarHeader'
SidebarBody.displayName = 'SidebarBody'
SidebarFooter.displayName = 'SidebarFooter'
SidebarOverlay.displayName = 'SidebarOverlay'

export { SidebarBody, SidebarFooter, SidebarHeader, SidebarOverlay }
