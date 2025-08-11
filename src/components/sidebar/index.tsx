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
}

function Sidebar({ open, onClose, side = 'left', children, overlayClassName }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
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
        overlayRef={overlayRef}
        className={overlayClassName}
        onClose={onClose}
        open={open}
      />

      <div
        ref={sidebarRef}
        className={cn(
          'fixed top-0 bottom-0 z-50 flex w-80 flex-col bg-white shadow-xl',
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
