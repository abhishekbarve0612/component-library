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
        'relative inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-foreground transition-all duration-200 outline-none',
        'hover:hover:border-border/80 hover:hover:bg-hover/20',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        {
          'bg-primary border-primary text-primary-foreground': checked,
          'hover:hover:bg-primary/90': checked,
        },
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
      <FaCheck 
        className={cn(
          'h-3 w-3 transition-opacity duration-200',
          checked ? 'opacity-100 text-primary-foreground' : 'opacity-0'
        )} 
      />
    </button>
  )
}

export default Checkbox
