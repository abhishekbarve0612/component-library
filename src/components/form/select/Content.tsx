import React from 'react'
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
  
  if (!isOpen) return null

  return (
    <div 
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