'use client'
import { type ReactNode, useContext, createContext } from 'react'
import { IoClose } from 'react-icons/io5'
import { useModalManager } from './context'
import { cn } from '@/helpers/utils'
import Button from '../button'

const ModalIdContext = createContext<string | null>(null)

export function ModalProvider({ id, children }: { id: string; children: ReactNode }) {
  return <ModalIdContext.Provider value={id}>{children}</ModalIdContext.Provider>
}

interface ModalHeaderProps {
  children: ReactNode
  className?: string
  withCloseButton?: boolean
}

export function ModalHeader({ children, className, withCloseButton = false }: ModalHeaderProps) {
  return (
    <div
      className={cn(
        'border-border flex items-center justify-between border-b px-6 py-4',
        className
      )}
    >
      <div className="text-foreground text-lg font-semibold">{children}</div>
      {withCloseButton && <ModalCloseButton />}
    </div>
  )
}

interface ModalBodyProps {
  children: ReactNode
  className?: string
  scrollable?: boolean
}

export function ModalBody({ children, className, scrollable = true }: ModalBodyProps) {
  return (
    <div className={cn('flex-1 px-6 py-4', scrollable && 'overflow-y-auto', className)}>
      {children}
    </div>
  )
}

interface ModalFooterProps {
  children: ReactNode
  className?: string
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'border-border flex items-center justify-end gap-3 border-t px-6 py-4',
        className
      )}
    >
      {children}
    </div>
  )
}

interface ModalCloseButtonProps {
  modalId?: string
  children?: ReactNode
  className?: string
  variant?: 'icon' | 'button'
}

export function ModalCloseButton({
  modalId,
  children,
  className,
  variant = 'icon',
}: ModalCloseButtonProps) {
  const { closeModal } = useModalManager()
  const contextModalId = useContext(ModalIdContext)
  const idToUse = modalId || contextModalId

  if (!idToUse) {
    console.warn('ModalCloseButton: No modal ID provided and not inside Modal context')
    return null
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={() => closeModal(idToUse)}
        aria-label="Close modal"
        className={cn(
          'text-muted-foreground rounded-lg p-2 transition-colors',
          'hover:hover:bg-hover hover:hover:text-foreground',
          'focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none',
          className
        )}
      >
        {children || <IoClose className="h-5 w-5" />}
      </button>
    )
  }

  return (
    <Button variant="default" size="sm" onClick={() => closeModal(idToUse)} className={className}>
      {children || 'Close'}
    </Button>
  )
}
