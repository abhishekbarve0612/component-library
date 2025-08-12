'use client'

import { createContext } from 'react'

interface TooltipContextType {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const TooltipContext = createContext<TooltipContextType>({
  visible: false,
  setVisible: () => {},
})
