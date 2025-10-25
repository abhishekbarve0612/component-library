import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import type { Radius, User } from '@/helpers/types'
import type { ButtonProps } from '../button'

export interface MessageContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
    incoming: boolean
    sender: User
    timestamp?: Date
    id?: string
}

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    autoScroll?: boolean
    stickToBottomOffset?: number
    onReachTop?: () => void | Promise<void>
    'aria-label'?: string
}

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
    incoming?: boolean
    autoFocus?: boolean
    ariaLabel?: string
}


export type Variant = 'solid' | 'outline' | 'ghost'

export type TipArrow = 'auto' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none'

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
    incoming?: boolean
    radius?: Radius
    variant?: Variant
    tipArrow?: TipArrow
}

export interface SendButtonProps extends ButtonProps {
    loading?: boolean
    loadingText?: string
    className?: string
}

export interface ComposerProps extends HTMLAttributes<HTMLFormElement> {
    onSend: (message: string) => void | Promise<void>
    disabled?: boolean
    className?: string
    children: ReactNode
    requireNonEmptyMessage?: boolean
    onKeyDown?: (e: KeyboardEvent<HTMLFormElement>) => void
}

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode
    srLabel?: string
    isDecorative?: boolean
    lineClass?: string
    labelClass?: string
}