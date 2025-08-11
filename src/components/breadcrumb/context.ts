import { createContext } from 'react'
import type { LinkComponentProps } from './types'

export interface BreadcrumbContextValue {
  divider?: React.ReactNode
  LinkComponent?: React.ComponentType<Partial<LinkComponentProps>>
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  divider: '/',
  LinkComponent: undefined,
})

export default BreadcrumbContext
