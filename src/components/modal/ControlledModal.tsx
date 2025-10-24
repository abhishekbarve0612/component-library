'use client'

import { useCallback, useMemo } from 'react'
import Modal, { type ModalProps } from './index'
import ModalContext, { type ModalContextValue } from './context'

type ControlledModalBaseProps = Omit<ModalProps, 'isOpenState'>

interface ControlledModalProps extends ControlledModalBaseProps {
  open: boolean
  onClose: () => void
  onOpen?: () => void
  onToggle?: (nextState: boolean) => void
}

function ControlledModal({ open, onClose, onOpen, onToggle, ...modalProps }: ControlledModalProps) {
  const { id } = modalProps

  const handleOpen = useCallback(() => {
    if (open) return
    onToggle?.(true)
    onOpen?.()
  }, [onOpen, onToggle, open])

  const handleClose = useCallback(() => {
    if (!open) return
    onToggle?.(false)
    onClose()
  }, [onClose, onToggle, open])

  const contextValue = useMemo<ModalContextValue>(
    () => ({
      openModals: { [id]: open },
      stack: open ? [id] : [],
      openModal: handleOpen,
      closeModal: handleClose,
      toggleModal: () => {
        if (open) {
          handleClose()
        } else {
          handleOpen()
        }
      },
    }),
    [handleClose, handleOpen, id, open]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal {...modalProps} isOpenState={open} />
    </ModalContext.Provider>
  )
}

export default ControlledModal
