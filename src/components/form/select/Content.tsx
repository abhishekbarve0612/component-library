import React from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'

export interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

function SelectContent({ children, className }: SelectContentProps) {
  const { isOpen, setOptions } = useSelectContext()
  const contentId = React.useId()
  const listboxId = `${contentId}-listbox`
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  // Extract option values and register them with context
  React.useEffect(() => {
    const optionValues: string[] = []
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.value) {
        optionValues.push(child.props.value)
      }
    })
    
    setOptions(optionValues)
  }, [children, setOptions])

  // GSAP animations for dropdown open/close
  useGSAP(() => {
    if (!contentRef.current) return

    if (isOpen) {
      // Opening animation: scale from top with fade in
      gsap.fromTo(contentRef.current, 
        {
          opacity: 0,
          scaleY: 0,
          transformOrigin: 'top center',
          y: -10
        },
        {
          opacity: 1,
          scaleY: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        }
      )
    } else if (contentRef.current) {
      // Closing animation: scale to top with fade out
      gsap.to(contentRef.current, {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'top center',
        y: -5,
        duration: 0.15,
        ease: 'power2.in'
      })
    }
  }, [isOpen])
  
  if (!isOpen) return null

  return (
    <div 
      ref={contentRef}
      id={listboxId}
      className={cn(
        'absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto',
        className
      )}
      role="listbox"
      tabIndex={-1}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            index,
            optionId: `${contentId}-option-${index}`,
          })
        }
        return child
      })}
    </div>
  )
}

SelectContent.displayName = 'Select.Content'

export default SelectContent