import type { ReactNode } from 'react'
import { useModalManager } from './context'

export function ModalHeader({ children }: { children: ReactNode }) {
  return <div className="border-b border-gray-200 p-4 font-bold">{children}</div>
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div className="flex-1 p-4">{children}</div>
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-2 border-t border-gray-200 p-4">{children}</div>
}

export function ModalCloseButton({ modalId, children }: { modalId: string; children: ReactNode }) {
  const { closeModal } = useModalManager()
  return (
    <button
      onClick={() => closeModal(modalId)}
      className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
    >
      {children}
    </button>
  )
}
