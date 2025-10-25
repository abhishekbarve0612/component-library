import type { HTMLAttributes } from "react"
import { cn } from "@/helpers/utils"


function ChatHeader(props: HTMLAttributes<HTMLDivElement>) {
    const { children, className, ...rest } = props
    return (
        <div className={cn("flex items-center justify-between border-b bg-muted/30 px-4 py-3", className)} {...rest}>
            {children}
        </div>
    )
}

ChatHeader.Title = (props: HTMLAttributes<HTMLDivElement>) => {
    const { children, className, ...rest } = props
    return (
        <div className={cn("flex items-center justify-between bg-muted/30 px-4 ps-0 py-3", className)} {...rest}>
            {children}
        </div>
    )
}

ChatHeader.Subtitle = (props: HTMLAttributes<HTMLDivElement>) => {
    const { children, className, ...rest } = props
    return (
        <p className={cn("text-xs text-muted-foreground", className)} {...rest}>
            {children}
        </p>
    )
}

ChatHeader.Status = (props: HTMLAttributes<HTMLDivElement>) => {
    const { children, className, ...rest } = props
    return (
        <span className={cn("inline-flex flex-shrink-0 size-2 rounded-full bg-emerald-500", className)} aria-hidden="true" {...rest}>
            {children}
        </span>
    )
}

export default ChatHeader