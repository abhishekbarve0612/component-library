import { useState, useId, useCallback } from 'react'
import TabsContext from './context'
import List from './List'
import Trigger from './Trigger'
import Content from './Content'
import type { TabsProps } from './types'

function Tabs({
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  size = 'md',
  children,
  className = '',
  ...props
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || '')
  const baseId = useId()

  const isControlled = value !== undefined
  const activeTab = isControlled ? value : internalActiveTab

  const setActiveTab = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalActiveTab(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, currentValue: string) => {
      const triggers = Array.from(
        document.querySelectorAll(`[data-tabs-trigger="${baseId}"]`)
      ) as HTMLElement[]

      const currentIndex = triggers.findIndex(
        (trigger) => trigger.getAttribute('data-value') === currentValue
      )

      let nextIndex = currentIndex
      const isVertical = orientation === 'vertical'

      switch (e.key) {
        case isVertical ? 'ArrowDown' : 'ArrowRight':
          e.preventDefault()
          nextIndex = (currentIndex + 1) % triggers.length
          break
        case isVertical ? 'ArrowUp' : 'ArrowLeft':
          e.preventDefault()
          nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = triggers.length - 1
          break
        default:
          return
      }

      const nextTrigger = triggers[nextIndex]
      const nextValue = nextTrigger?.getAttribute('data-value')
      if (nextValue) {
        setActiveTab(nextValue)
        nextTrigger.focus()
      }
    },
    [baseId, orientation, setActiveTab]
  )

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        orientation,
        size,
        baseId,
        onKeyDown: handleKeyDown,
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.List = List
Tabs.Trigger = Trigger
Tabs.Content = Content

Tabs.displayName = 'Tabs'

export default Tabs
