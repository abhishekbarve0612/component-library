'use client'

import { cn } from '@/helpers/utils'
import { type ReactNode } from 'react'

interface SidebarHeaderProps {
  children: ReactNode
  className?: string
  id?: string
}

function SidebarHeader({ children, className, id = 'sidebar-title' }: SidebarHeaderProps) {
  return (
    <div className={cn("border-border border-b px-6 py-4", className)}>
      <div id={id} className="text-foreground text-lg font-bold">
        {children}
      </div>
    </div>
  )
}

interface SidebarBodyProps {
  children: ReactNode
  className?: string
  id?: string
}

function SidebarBody({ children, className, id = 'sidebar-description' }: SidebarBodyProps) {
  return (
    <div id={id} className={cn("flex-1 overflow-y-auto px-4 py-4", className)}>
      <div className="space-y-1" role="group">
        {children}
      </div>
    </div>
  )
}

function SidebarFooter({ className, children }: { className?: string, children: ReactNode }) {
  return <div className={cn("border-border border-t px-4 py-4", className)}>{children}</div>
}

interface SidebarOverlayProps {
  className?: string
  onClose: () => void
  open: boolean
  overlayRef?: React.RefObject<HTMLDivElement | null>
  shouldBlurOverlay?: boolean
}

function SidebarOverlay({ className, onClose, open, overlayRef, shouldBlurOverlay = false }: SidebarOverlayProps) {
  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      className={cn(
        'bg-background/80 fixed inset-0 z-40',
        shouldBlurOverlay && 'backdrop-blur-sm',
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
