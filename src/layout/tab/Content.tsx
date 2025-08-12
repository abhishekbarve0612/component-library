import { useContext, useRef, useEffect, useState, type HTMLAttributes } from 'react'
import TabsContext from './context'
import { cn } from '@/helpers/utils'

interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
  className?: string
  forceMount?: boolean
  loading?: boolean
}

function TabContent({
  value,
  children,
  className = '',
  forceMount = false,
  loading = false,
  ...props
}: TabContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab, size, baseId } = context
  const isActive = activeTab === value
  const panelId = `${baseId}-panel-${value}`
  const tabId = `${baseId}-tab-${value}`

  const [hasBeenActive, setHasBeenActive] = useState(isActive)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive && !hasBeenActive) {
      setHasBeenActive(true)
    }
  }, [isActive, hasBeenActive])

  useEffect(() => {
    const element = contentRef.current
    if (!element) return

    if (isActive) {
      element.style.display = 'block'
      requestAnimationFrame(() => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      })
    } else if (hasBeenActive) {
      element.style.opacity = '0'
      element.style.transform = 'translateY(-4px)'

      const timeout = setTimeout(() => {
        if (!forceMount) {
          element.style.display = 'none'
        }
      }, 200)

      return () => clearTimeout(timeout)
    }
  }, [isActive, hasBeenActive, forceMount])

  if (!hasBeenActive && !forceMount) return null

  const sizeClasses = {
    sm: 'mt-1',
    md: 'mt-2',
    lg: 'mt-3',
  }

  return (
    <div
      ref={contentRef}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      hidden={!isActive && !forceMount}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'ring-offset-white focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none',
        'translate-y-1 opacity-0 transition-all duration-200 ease-out',
        isActive && 'translate-y-0 opacity-100',
        sizeClasses[size],
        className
      )}
      style={{
        display: isActive || forceMount || hasBeenActive ? 'block' : 'none',
      }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

TabContent.displayName = 'Tabs.Content'
export default TabContent
