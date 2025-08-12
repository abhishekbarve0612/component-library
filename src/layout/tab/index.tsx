import { useState, type HTMLAttributes } from 'react'
import TabsContext from './context'
import List from './List'
import Trigger from './Trigger'
import Content from './Content'

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.List = List
Tabs.Trigger = Trigger
Tabs.Content = Content

Tabs.displayName = 'Tabs'

export default Tabs
