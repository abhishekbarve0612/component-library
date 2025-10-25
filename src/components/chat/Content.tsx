import type { BubbleProps, TipArrow, Variant } from "./types"
import { cn } from "@/helpers/utils"

const RADIUS_MAP = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    pill: 'rounded-full',
} as const


function resolveTipArrow(arrow: TipArrow, incoming: boolean, variant: Variant) {
    if (arrow && arrow !== 'auto') return arrow

    if (variant !== 'outline') return 'none'

    return incoming ? 'bottom-left' : 'top-right'
}

function MessageContent(props: BubbleProps) {
    const { incoming = true, radius = 'md', variant = 'solid', tipArrow = 'auto', className, children, ...rest } = props

    const tip = resolveTipArrow(tipArrow, incoming, variant)

    return (
        <div
            data-variant={variant}
            className={cn(
                'relative max-w-[75%] ps-4 pe-8 py-2 text-sm shadow-sm',
                RADIUS_MAP[radius],
                !incoming && 'ml-auto',

                variant === 'solid' && '',
                variant === 'outline' && 'border bg-transparent',
                variant === 'ghost' && 'bg-transparent',

                className,
            )}
            {...rest}
        >
            {children}
            {
                tip !== 'none' && (
                    <span
                        aria-hidden="true"
                        className={cn(
                            'absolute block size-2 rotate-45 bg-inherit',
                            tip.startsWith('top') ? '-top-1' : '-bottom-1',
                            tip.endsWith('left') ? '-left-3' : '-right-3',
                        )}
                    />
                )
            }
        </div>
    )
}


MessageContent.displayName = 'MessageContent'

export default MessageContent