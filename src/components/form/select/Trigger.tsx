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
  const { isOpen, setIsOpen, options, highlightedIndex } = useSelectContext()
  const chevronRef = React.useRef<SVGSVGElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  
  // Generate IDs for ARIA relationships
  const triggerId = React.useId()
  const listboxId = `${triggerId}-listbox`
  const activeDescendant = highlightedIndex >= 0 ? `${triggerId}-option-${highlightedIndex}` : undefined

  // GSAP animations for chevron rotation
  useGSAP(() => {
    if (!chevronRef.current) return

    gsap.to(chevronRef.current, {
      rotation: isOpen ? 180 : 0,
      duration: 0.25,
      ease: 'power2.out'
    })
  }, [isOpen])

  // Subtle pulse animation on focus
  const handleFocus = () => {
    if (triggerRef.current) {
      gsap.fromTo(triggerRef.current, 
        { scale: 1 },
        { 
          scale: 1.02, 
          duration: 0.15, 
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        }
      )
    }
  }

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      className={cn(
        `flex items-center justify-between w-full rounded-md border 
        border-gray-300 bg-white/70 backdrop-blur-sm px-3 py-2
        text-sm cursor-pointer transition-all outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
        hover:bg-white/90 hover:border-gray-400`,
        {
          'border-blue-500 ring-2 ring-blue-200': isOpen,
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
      <FaCircleChevronDown 
        ref={chevronRef}
        className="inline-block ml-auto w-4 h-4 text-gray-500"
        aria-hidden="true"
      />
    </button>
  )
}

SelectTrigger.displayName = 'Select.Trigger'

export default SelectTrigger