'use client'

import React from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'
import type { SelectItemProps } from './types'

function SelectItem({
  value,
  children,
  disabled = false,
  className,
  index = -1,
  optionId,
}: SelectItemProps) {
  const {
    value: selectedValue,
    setValue,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
  } = useSelectContext()
  const itemRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (disabled) return

    // Selection feedback animation
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { scale: 1 },
        {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            setValue(value)
            setIsOpen(false)
          },
        }
      )
    } else {
      setValue(value)
      setIsOpen(false)
    }
  }

  const handleMouseEnter = () => {
    if (!disabled && !isHighlighted) {
      setHighlightedIndex(index)

      // Subtle hover animation
      if (itemRef.current) {
        gsap.fromTo(
          itemRef.current,
          { x: 0 },
          {
            x: 4,
            duration: 0.2,
            ease: 'power2.out',
          }
        )
      }
    }
  }

  const handleMouseLeave = () => {
    if (!disabled && itemRef.current) {
      gsap.to(itemRef.current, {
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const isSelected = selectedValue === value
  const isHighlighted = highlightedIndex === index

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (isHighlighted && itemRef.current) {
      itemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [isHighlighted])

  // Highlight animation for keyboard navigation
  useGSAP(() => {
    if (!itemRef.current) return

    if (isHighlighted && !isSelected) {
      gsap.fromTo(
        itemRef.current,
        { backgroundColor: 'transparent' },
        {
          backgroundColor: 'hsl(var(--hover))',
          duration: 0.15,
          ease: 'power2.out',
        }
      )
    }
  }, [isHighlighted, isSelected])

  return (
    <button
      ref={itemRef}
      id={optionId}
      className={cn(
        'text-foreground relative w-full px-3 py-2 text-left text-sm transition-colors focus:outline-none',
        'hover:hover:bg-hover hover:hover:text-foreground',
        {
          'bg-primary/10 text-primary': isSelected,
          'cursor-not-allowed opacity-50': disabled,
          'cursor-pointer': !disabled,
        },
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      type="button"
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
    >
      {children}
    </button>
  )
}

SelectItem.displayName = 'Select.Item'

export default SelectItem
