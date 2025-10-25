import { cn } from "@/helpers/utils"
import { useEffect, useRef } from "react"
import type { MessageProps } from "./types"
import MessageContent from "./Content"
import Divider from "./Divider"

function Message(props: MessageProps) {
    const { incoming = true, autoFocus = false, ariaLabel, className, children, ...rest } = props

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (autoFocus && ref.current) {
            ref.current.focus()
        }
    }, [autoFocus])

    return (
        <div
            ref={ref}
            role="article"
            aria-roledescription="message"
            aria-label={ariaLabel}
            tabIndex={autoFocus ? -1 : undefined}
            data-incoming={incoming}
            className={cn(
                "flex items-end gap-2",
                incoming ? "justify-start" : "justify-end",
                "mt-2",
                className
            )}
            {...rest}
        >
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )

}

Message.Divider = Divider

Message.Content = MessageContent

Message.displayName = 'Message'

export default Message