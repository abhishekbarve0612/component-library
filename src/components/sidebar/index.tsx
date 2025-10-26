'use client'

import { createPortal } from 'react-dom'
import { type ReactNode, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import Item from './Item'
import { SidebarBody, SidebarFooter, SidebarHeader, SidebarOverlay } from './Components'

interface SidebarProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  children: ReactNode
  overlayClassName?: string
  shouldBlurOverlay?: boolean
}

function Sidebar({ open, onClose, side = 'left', children, overlayClassName, shouldBlurOverlay = false }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
        previousActiveElement.current = null
      }
      return
    }

    previousActiveElement.current = document.activeElement as HTMLElement
    if (sidebarRef.current) {
      sidebarRef.current.focus()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && sidebarRef.current) {
        const focusableElements = sidebarRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstFocusable = focusableElements[0] as HTMLElement
        const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable?.focus()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable?.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useGSAP(() => {
    if (!sidebarRef.current || !overlayRef.current) return

    if (open) {
      gsap.set(sidebarRef.current, {
        [side === 'left' ? 'x' : 'x']: side === 'left' ? '-100%' : '100%',
      })
      gsap.set(overlayRef.current, { opacity: 0 })

      const tl = gsap.timeline()
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      }).to(
        sidebarRef.current,
        {
          x: '0%',
          duration: 0.3,
          ease: 'power2.out',
        },
        '-=0.1'
      )
    } else {
      const tl = gsap.timeline()
      tl.to(sidebarRef.current, {
        x: side === 'left' ? '-100%' : '100%',
        duration: 0.25,
        ease: 'power2.in',
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in',
        },
        '-=0.1'
      )
    }
  }, [open, side])

  if (typeof window === 'undefined') return null

  return createPortal(
    <>
      <SidebarOverlay
        shouldBlurOverlay={shouldBlurOverlay}
        overlayRef={overlayRef}
        className={overlayClassName}
        onClose={onClose}
        open={open}
      />

      <div
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
        aria-describedby="sidebar-description"
        className={cn(
          'bg-background fixed top-0 bottom-0 z-50 flex w-80 flex-col shadow-xl',
          'border-border border-r',
          'focus:outline-none',
          {
            'left-0': side === 'left',
            'right-0': side === 'right',
            '-translate-x-full': side === 'left' && !open,
            'translate-x-full': side === 'right' && !open,
            'translate-x-0': open,
          }
        )}
        tabIndex={-1}
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
