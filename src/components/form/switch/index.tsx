'use client'
import { useState } from 'react'
import type { SwitchProps } from './types'

const sizeVariants = {
  sm: {
    container: 'h-4 w-8',
    thumb: 'h-2.5 w-2.5',
    translate: { off: 'translate-x-0.5', on: 'translate-x-4.5' },
  },
  md: {
    container: 'h-6 w-11',
    thumb: 'h-4 w-4',
    translate: { off: 'translate-x-1', on: 'translate-x-6' },
  },
  lg: {
    container: 'h-7 w-12',
    thumb: 'h-5 w-5',
    translate: { off: 'translate-x-1', on: 'translate-x-6' },
  },
}

function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  id,
  className = '',
  size = 'md',
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(checked)
  const isChecked = onCheckedChange ? checked : internalChecked

  const handleToggle = () => {
    if (disabled) return

    if (onCheckedChange) {
      onCheckedChange(!checked)
    } else {
      setInternalChecked(!internalChecked)
    }
  }

  const variant = sizeVariants[size]

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      id={id}
      disabled={disabled}
      onClick={handleToggle}
      className={`focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex items-center rounded-full transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none hover:hover:enabled:scale-[1.02] hover:hover:enabled:shadow-md hover:hover:enabled:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none ${variant.container} ${
        isChecked ? 'bg-primary hover:hover:enabled:bg-primary/90' : 'bg-input hover:hover:enabled:bg-surface-2'
      } ${className} `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      <span
        className={`bg-background inline-block rounded-full shadow-sm transition-transform duration-200 ease-out motion-reduce:transition-none ${variant.thumb} ${isChecked ? variant.translate.on : variant.translate.off} `
          .trim()
          .replace(/\s+/g, ' ')}
      />
    </button>
  )
}

export default Switch
