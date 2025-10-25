import { cn } from "@/helpers/utils"
import type { DividerProps } from "./types"

function Divider(props: DividerProps) {
    const { label, srLabel, isDecorative = true, lineClass, labelClass, className, ...rest } = props

    const ariaLabel = typeof label === 'string' ? label : srLabel || undefined

    return (
        <div
            role={isDecorative ? undefined : 'separator'}
            aria-orientation={isDecorative ? undefined : 'horizontal'}
            aria-label={isDecorative ? undefined : ariaLabel}
            className={cn(
                'my-2 flex items-center gap-3 text-xs',
                className,
            )}
            {...rest}
        >
            <div className={cn('h-px flex-1 bg-current/20', lineClass)} />
            {
                label && (
                    <span
                        className={labelClass}
                    >
                        {label}
                    </span>
                )
            }
            <div className={cn('h-px flex-1 bg-current/20', lineClass)} />
        </div>
    )
}

export default Divider