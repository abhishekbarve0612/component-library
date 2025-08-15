'use client'

import { createContext, useContext } from 'react'

export interface ModalContextValue {
  openModals: Record<string, boolean>
  stack: string[]
  openModal: (id: string) => void
  closeModal: (id: string) => void
  toggleModal: (id: string) => void
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

export function useModalManager() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModalManager must be used inside ModalProvider')
  return ctx
}

export default ModalContext
