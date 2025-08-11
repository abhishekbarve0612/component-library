import { createContext } from 'react'

export interface CardContextValue {
  variant: 'default' | 'elevated' | 'outlined' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  padding: 'none' | 'sm' | 'md' | 'lg'
}

export const CardContext = createContext<CardContextValue>({
  variant: 'default',
  size: 'md',
  padding: 'md'
})

export default CardContext