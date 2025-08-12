'use client'

import { cn } from '@/helpers/utils'
import { FaCheck } from 'react-icons/fa6'

interface CheckboxProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

function Checkbox({ checked, onCheckedChange, className = '', ...props }: CheckboxProps) {
  const handleClick = () => {
    onCheckedChange(!checked)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onCheckedChange(!checked)
    }
  }

  return (
    <button
      className={cn(
        'relative inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white transition-all duration-200 outline-none',
        checked && 'bg-primary border-primary',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      role="checkbox"
      aria-checked={checked}
      {...props}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        className="hidden"
        tabIndex={-1}
      />
      <FaCheck className="h-3 w-3 text-white opacity-0 transition-opacity duration-200" />
    </button>
  )
}

export default Checkbox
