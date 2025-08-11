import { createContext } from 'react'
import type { LinkProps } from '@components/link'

export interface BreadcrumbContextValue {
  divider?: React.ReactNode
  LinkComponent?: React.ComponentType<Partial<LinkProps>>
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  divider: '/',
  LinkComponent: undefined,
})

export default BreadcrumbContext
