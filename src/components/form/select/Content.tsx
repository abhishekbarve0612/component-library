import React from 'react'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'
import type { SelectContentProps, SelectItemProps } from './types'

function SelectContent({ children, className }: SelectContentProps) {
  const { isOpen, setOptions } = useSelectContext()
  const contentId = React.useId()
  const listboxId = `${contentId}-listbox`
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(false)

  // Extract option values and register them with context
  React.useEffect(() => {
    const optionValues: string[] = []

    React.Children.forEach(children, (child: unknown) => {
      if (React.isValidElement(child) && child?.props) {
        optionValues.push((child?.props as SelectItemProps)?.value)
      }
    })

    setOptions(optionValues)
  }, [children, setOptions])

  // Handle opening animation
  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to ensure element is rendered before starting animation
      const timeout = setTimeout(() => setIsAnimating(true), 10)
      return () => clearTimeout(timeout)
    } else {
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      const timeout = setTimeout(() => setShouldRender(false), 150)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div
      id={listboxId}
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-slate-200 bg-white text-slate-900 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
        'transition-all duration-150 ease-out origin-top',
        'transform-gpu', // Use GPU acceleration
        {
          // Opening state
          'opacity-100 scale-y-100 translate-y-0': isAnimating,
          // Closing state  
          'opacity-0 scale-y-95 -translate-y-1': !isAnimating,
        },
        className
      )}
      role="listbox"
      tabIndex={-1}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...(child.props as SelectItemProps),
            index,
            optionId: `${contentId}-option-${index}`,
          } as SelectItemProps)
        }
        return child
      })}
    </div>
  )
}

SelectContent.displayName = 'Select.Content'

export default SelectContent
