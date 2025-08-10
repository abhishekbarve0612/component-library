import { createContext } from 'react'

export interface ToggleState {
  on: boolean
  toggle: () => void
}

const ToggleContext = createContext<ToggleState>({
  on: false,
  toggle: () => {},
})

export default ToggleContext
