import { useContext } from 'react'
import TabsContext from './context'
import { cn } from '@/helpers/utils'

function TabTrigger({
  value,
  children,
  className = '',
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context
  const isActive = activeTab === value

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap',
        'ring-offset-white transition-all focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm',
        className
      )}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

TabTrigger.displayName = 'Tabs.Trigger'
export default TabTrigger
