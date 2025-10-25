import type { FormEvent, KeyboardEvent, KeyboardEventHandler } from "react"
import { cn } from "@/helpers/utils"
import SendButton from "./SendButton"
import type { ComposerProps } from "./types"



function ChatComposer(props: ComposerProps) {
    const {
        onSend, disabled = false, className, children, requireNonEmptyMessage = true, onKeyDown,
        ...rest
    } = props

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (disabled) return
        const formData = new FormData(e.target as HTMLFormElement)

        const message = formData.get('message')?.toString().trim() ?? ''

        if (requireNonEmptyMessage && !message) return

        onSend(message)

        e.currentTarget.reset()
    }

    const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e: KeyboardEvent<HTMLFormElement>) => {
        onKeyDown?.(e)
        if (disabled) return
        if (e.key === 'Enter' && !e.shiftKey) {
            (e.currentTarget as HTMLFormElement).requestSubmit()
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            onKeyDownCapture={handleKeyDown}
            aria-disabled={disabled}
            className={cn(
                'flex items-end gap-2 p-2',
                className,
            )}
            {...rest}
        >
            {children}
        </form>
    )

}

ChatComposer.SendButton = SendButton

ChatComposer.displayName = 'ChatComposer'

export default ChatComposer
