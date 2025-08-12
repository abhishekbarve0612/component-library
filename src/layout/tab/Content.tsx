import { useContext } from 'react'
import TabsContext from './context'
import { cn } from '@/helpers/utils'

function TabContent({
  value,
  children,
  className = '',
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context
  if (activeTab !== value) return null

  return (
    <div
      className={cn(
        'mt-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:outline-none',
        className
      )}
    >
      {children}
    </div>
  )
}

TabContent.displayName = 'Tabs.Content'
export default TabContent
