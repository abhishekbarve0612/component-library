import React, { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useModalManager } from './context'
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalProvider,
} from './ModalComponents'
import { cn } from '@/helpers/utils'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ModalProps {
  id: string
  children: React.ReactNode
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  centered?: boolean
  size?: ModalSize
  scrollable?: boolean
  className?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

// Size configurations
const sizeConfig = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
} as const

function Modal({
  id,
  children,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  centered = true,
  size = 'md',
  scrollable = true,
  className,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) {
  const { openModals, stack, closeModal } = useModalManager()
  const isOpen = !!openModals[id]
  const zIndex = 1000 + stack.indexOf(id)
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stack[stack.length - 1] === id) {
        closeModal(id)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, stack, id, closeModal])

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousFocus.current = document.activeElement as HTMLElement

      // Focus the modal when it opens
      setTimeout(() => {
        modalRef.current?.focus()
      }, 100)

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore focus when modal closes
      previousFocus.current?.focus()

      // Restore body scroll
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Focus trap
  const trapFocus = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll(
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
  }, [])

  // GSAP animations
  useGSAP(() => {
    if (!isOpen || !modalRef.current || !backdropRef.current) return

    // Animate backdrop
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: 'power2.out' }
    )

    // Animate modal
    gsap.fromTo(
      modalRef.current,
      {
        opacity: 0,
        scale: 0.9,
        y: -20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.05,
      }
    )
  }, [isOpen])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      style={{ zIndex }}
      onClick={(e) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
          closeModal(id)
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        onKeyDown={trapFocus}
        className={cn(
          // Base styles
          'relative flex max-h-[90vh] w-full flex-col rounded-xl border border-slate-200',
          'bg-white shadow-2xl focus:outline-none',
          'dark:border-slate-700 dark:bg-slate-900',

          // Size variants
          sizeConfig[size],

          // Positioning
          centered ? 'mx-auto' : 'mt-8 self-start',

          // Custom className
          className
        )}
      >
        <div
          className={cn(
            'flex flex-1 flex-col',
            scrollable ? 'overflow-hidden' : 'overflow-visible'
          )}
        >
          <ModalProvider id={id}>{children}</ModalProvider>
        </div>
      </div>
    </div>,
    document.body
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
Modal.CloseButton = ModalCloseButton

export default Modal
