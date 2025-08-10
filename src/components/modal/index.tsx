// modal.tsx
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useModalManager } from './context'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from './ModalComponents'

interface ModalProps {
  id: string
  children: React.ReactNode
  closeOnOutsideClick?: boolean
  centered?: boolean
  width?: string
  height?: string
  scrollable?: boolean
}

function Modal({
  id,
  children,
  closeOnOutsideClick = true,
  centered = true,
  width = '500px',
  height = 'auto',
  scrollable = true,
}: ModalProps) {
  const { openModals, stack, closeModal } = useModalManager()
  const isOpen = !!openModals[id]
  const zIndex = 1000 + stack.indexOf(id)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stack[stack.length - 1] === id) {
        closeModal(id)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, stack, id, closeModal])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      style={{ zIndex }}
      onClick={(e) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
          closeModal(id)
        }
      }}
    >
      <div
        ref={ref}
        className="flex flex-col rounded-lg bg-white shadow-lg"
        style={{
          width,
          height,
          maxHeight: '90vh',
          ...(centered ? {} : { marginTop: '2rem', marginBottom: '2rem', alignSelf: 'flex-start' }),
        }}
      >
        <div
          className={`flex flex-col ${scrollable ? 'overflow-auto' : 'overflow-hidden'}`}
          style={{ flex: 1 }}
        >
          {children}
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
