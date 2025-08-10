export type Placement = 'top' | 'bottom' | 'left' | 'right'

export interface Position {
  top: number
  left: number
  actualPlacement: Placement
}

export interface PositionOptions {
  triggerRect: DOMRect
  tooltipRect: DOMRect
  placement: Placement
  offset: number
  arrowSize?: number
}

export function calculateTooltipPosition({
  triggerRect,
  tooltipRect,
  placement,
  offset,
  arrowSize = 8
}: PositionOptions): Position {
  const positions = {
    top: () => ({
      top: triggerRect.top - tooltipRect.height - offset,
      left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
    }),
    bottom: () => ({
      top: triggerRect.bottom + offset,
      left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
    }),
    left: () => ({
      top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.left - tooltipRect.width - offset
    }),
    right: () => ({
      top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.right + offset
    })
  }

  let { top, left } = positions[placement]()
  let actualPlacement = placement

  // Check if tooltip fits in viewport and flip if needed
  if (placement === 'top' && top < arrowSize) {
    actualPlacement = 'bottom'
    const bottomPos = positions.bottom()
    top = bottomPos.top
    left = bottomPos.left
  } else if (placement === 'bottom' && top + tooltipRect.height + arrowSize > window.innerHeight) {
    actualPlacement = 'top'
    const topPos = positions.top()
    top = topPos.top
    left = topPos.left
  } else if (placement === 'left' && left < arrowSize) {
    actualPlacement = 'right'
    const rightPos = positions.right()
    top = rightPos.top
    left = rightPos.left
  } else if (placement === 'right' && left + tooltipRect.width + arrowSize > window.innerWidth) {
    actualPlacement = 'left'
    const leftPos = positions.left()
    top = leftPos.top
    left = leftPos.left
  }

  // Ensure tooltip stays within viewport bounds
  top = Math.max(arrowSize, Math.min(top, window.innerHeight - tooltipRect.height - arrowSize))
  left = Math.max(arrowSize, Math.min(left, window.innerWidth - tooltipRect.width - arrowSize))

  return { top, left, actualPlacement }
}

export function calculateArrowPosition(
  actualPlacement: Placement,
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  tooltipPosition: { top: number; left: number }
): { top?: number; left?: number; transform?: string } {
  const arrowSize = 8

  switch (actualPlacement) {
    case 'top':
      return {
        top: tooltipRect.height,
        left: Math.max(
          arrowSize,
          Math.min(
            triggerRect.left + triggerRect.width / 2 - tooltipPosition.left,
            tooltipRect.width - arrowSize
          )
        ),
        transform: 'translate(-50%, -50%) rotate(180deg)'
      }
    case 'bottom':
      return {
        top: -arrowSize,
        left: Math.max(
          arrowSize,
          Math.min(
            triggerRect.left + triggerRect.width / 2 - tooltipPosition.left,
            tooltipRect.width - arrowSize
          )
        ),
        transform: 'translate(-50%, 0%)'
      }
    case 'left':
      return {
        top: Math.max(
          arrowSize,
          Math.min(
            triggerRect.top + triggerRect.height / 2 - tooltipPosition.top,
            tooltipRect.height - arrowSize
          )
        ),
        left: tooltipRect.width,
        transform: 'translate(-50%, -50%) rotate(-90deg)'
      }
    case 'right':
      return {
        top: Math.max(
          arrowSize,
          Math.min(
            triggerRect.top + triggerRect.height / 2 - tooltipPosition.top,
            tooltipRect.height - arrowSize
          )
        ),
        left: -arrowSize,
        transform: 'translate(-50%, -50%) rotate(90deg)'
      }
    default:
      return {}
  }
}