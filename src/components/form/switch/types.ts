import type { HTMLAttributes } from 'react'

export interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}
