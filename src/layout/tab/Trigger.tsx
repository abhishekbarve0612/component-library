import { useContext } from 'react'
import TabsContext from './context'
import { cn } from '@/helpers/utils'
import type { TabTriggerProps } from './types'

function TabTrigger({
  value,
  children,
  className = '',
  onKeyDown,
  disabled,
  ...props
}: TabTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab, size, baseId, onKeyDown: contextKeyDown } = context
  const isActive = activeTab === value
  const tabId = `${baseId}-tab-${value}`
  const panelId = `${baseId}-panel-${value}`

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e)
    if (!e.defaultPrevented) {
      contextKeyDown?.(e.nativeEvent, value)
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs rounded',
    md: 'px-3 py-1.5 text-sm rounded-sm',
    lg: 'px-4 py-2 text-base rounded-md',
  }

  return (
    <button
      role="tab"
      id={tabId}
      aria-selected={isActive}
      aria-controls={panelId}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      data-state={isActive ? 'active' : 'inactive'}
      data-tabs-trigger={baseId}
      data-value={value}
      className={cn(
        'inline-flex items-center justify-center font-medium whitespace-nowrap',
        'ring-offset-white transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        'text-[var(--tabs-trigger-text,rgb(100_116_139))] hover:text-[var(--tabs-trigger-hover-text,rgb(15_23_42))]',
        'data-[state=active]:bg-[var(--tabs-trigger-active-bg,white)] data-[state=active]:text-[var(--tabs-trigger-active-text,rgb(2_8_23))] data-[state=active]:shadow-sm',
        '@media (hover: hover) and (pointer: fine) { } hover:text-[var(--tabs-trigger-hover-text,rgb(15_23_42))]',
        sizeClasses[size],
        className
      )}
      onClick={() => !disabled && setActiveTab(value)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  )
}

TabTrigger.displayName = 'Tabs.Trigger'
export default TabTrigger
