import { createContext } from "react"

export interface SelectContextType {
  value: string
  setValue: (value: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SelectContext = createContext<SelectContextType>({} as SelectContextType)

export default SelectContext