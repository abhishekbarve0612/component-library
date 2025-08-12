'use client'

import React from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { FaCircleChevronDown } from 'react-icons/fa6'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

function SelectTrigger({ children, className = '' }: SelectTriggerProps) {
  const { isOpen, setIsOpen, highlightedIndex } = useSelectContext()
  const chevronRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  // Generate IDs for ARIA relationships
  const triggerId = React.useId()
  const listboxId = `${triggerId}-listbox`
  const activeDescendant =
    highlightedIndex >= 0 ? `${triggerId}-option-${highlightedIndex}` : undefined

  // GSAP animations for chevron rotation
  useGSAP(() => {
    if (!chevronRef.current) return

    gsap.to(chevronRef.current, {
      rotation: isOpen ? 180 : 0,
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [isOpen])

  // Subtle pulse animation on focus
  const handleFocus = () => {
    if (triggerRef.current) {
      gsap.fromTo(
        triggerRef.current,
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.15,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        }
      )
    }
  }

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-all outline-none',
        'hover:hover:border-border/80 hover:hover:bg-hover/20',
        'focus:border-ring focus:ring-2 focus:ring-ring/20 focus:ring-offset-2 focus:ring-offset-background',
        {
          'border-ring ring-2 ring-ring/20': isOpen,
        },
        className
      )}
      onClick={() => setIsOpen(!isOpen)}
      onFocus={handleFocus}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={isOpen ? listboxId : undefined}
      aria-activedescendant={activeDescendant}
      role="combobox"
      type="button"
      tabIndex={0}
    >
      {children}
      <div ref={chevronRef}>
        <FaCircleChevronDown
          className="ml-auto inline-block h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </button>
  )
}

SelectTrigger.displayName = 'Select.Trigger'

export default SelectTrigger
