import React from 'react'
import Button, { type ButtonProps } from '@/components/button'
import ToggleContext, { type ToggleState } from './context'

export interface ToggleProps {
  children: React.ReactNode | ((state: ToggleState) => React.ReactNode)
  onToggle: (on: boolean) => void
}

function Toggle({ children, onToggle }: ToggleProps) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    setOn((prevOn) => !prevOn)
  }

  React.useEffect(() => {
    onToggle(on)
  }, [on])

  const state = { on, toggle }

  return (
    <ToggleContext.Provider value={state}>
      {typeof children === 'function' ? children(state) : children}
    </ToggleContext.Provider>
  )
}

Toggle.On = function On({ children }: { children: React.ReactNode }) {
  const { on } = React.useContext(ToggleContext)
  return on ? children : null
}

Toggle.Off = function Off({ children }: { children: React.ReactNode }) {
  const { on } = React.useContext(ToggleContext)
  return on ? null : children
}

interface ToggleButtonProps extends ButtonProps {
  children: React.ReactNode
}

Toggle.Button = function ToggleButton({ children, ...props }: ToggleButtonProps) {
  const { toggle } = React.useContext(ToggleContext)
  return (
    <Button variant="ghost" onClick={toggle} {...props}>
      {children}
    </Button>
  )
}

export default Toggle
