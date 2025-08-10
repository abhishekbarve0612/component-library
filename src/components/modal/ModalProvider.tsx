import { useCallback, useState } from 'react'
import ModalContext from './context'

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({})
  const [stack, setStack] = useState<string[]>([])

  const openModal = useCallback((id: string) => {
    setOpenModals((prev) => ({ ...prev, [id]: true }))
    setStack((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const closeModal = useCallback((id: string) => {
    setOpenModals((prev) => ({ ...prev, [id]: false }))
    setStack((prev) => prev.filter((modalId) => modalId !== id))
  }, [])

  const toggleModal = useCallback((id: string) => {
    setOpenModals((prev) => {
      const isOpen = prev[id]
      if (isOpen) {
        setStack((stackPrev) => stackPrev.filter((modalId) => modalId !== id))
      } else {
        setStack((stackPrev) => (stackPrev.includes(id) ? stackPrev : [...stackPrev, id]))
      }
      return { ...prev, [id]: !isOpen }
    })
  }, [])

  return (
    <ModalContext.Provider value={{ openModals, stack, openModal, closeModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalProvider
