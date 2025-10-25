import { cn } from "@/helpers/utils"
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import type { LayoutProps } from "./types"
import Message from "./Message"
import Composer from "./Composer"

function ChatLayout(props: LayoutProps) {
    const {
        autoScroll = true, stickToBottomOffset = 100, onReachTop, 'aria-label': ariaLabel, className, children, ...rest
    } = props

    const scrollRef = useRef<HTMLDivElement>(null)
    const containerTopRef = useRef<HTMLDivElement>(null)

    const isNearBottom = useCallback(() => {
        const element = scrollRef.current
        if (!element) return true

        const distance = element.scrollHeight - element.scrollTop - element.clientHeight

        return distance <= stickToBottomOffset
    }, [stickToBottomOffset])

    const shouldStickRef = useRef(true)

    const childCount = React.Children.count(children)

    useLayoutEffect(() => {
        if (!autoScroll) return

        const element = scrollRef.current
        if (!element) return

        if (shouldStickRef.current) {
            element.scrollTop = element.scrollHeight
        }

        const updateStickState = () => {
            shouldStickRef.current = isNearBottom()
        }

        updateStickState()

        element.addEventListener('scroll', updateStickState, { passive: true })

        return () => {
            element.removeEventListener('scroll', updateStickState)
            shouldStickRef.current = isNearBottom()
        }
    }, [childCount, autoScroll, isNearBottom])

    useEffect(() => {
        if (!onReachTop) return

        const root = scrollRef.current

        const top = containerTopRef.current

        if (!root || !top) return

        const intersectionObserver = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    onReachTop()
                }
            }
        }, {
            root,
            threshold: 0.01,
        })

        intersectionObserver.observe(top)

        return () => intersectionObserver.disconnect()
    }, [onReachTop])

    return (
        <div
            ref={scrollRef}
            role='log'
            aria-live='polite'
            aria-relevant='additions'
            aria-label={ariaLabel}
            className={cn(
                'flex-1 overflow-y-auto px-3',
                'scroll-smooth overscroll-contain',
                'scrollbar-gutter-stable',
                className,
            )}
            {...rest}
        >
            <div ref={containerTopRef} aria-hidden="true" />

            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )
}

ChatLayout.Message = Message

ChatLayout.Composer = Composer

ChatLayout.displayName = 'ChatLayout'

export default ChatLayout
