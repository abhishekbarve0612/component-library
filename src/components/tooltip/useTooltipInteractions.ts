import useElementInteractions, { CONFIG } from '@/helpers/interactions'

interface UseTooltipInteractionsProps {
  trigger: 'hover' | 'click' | 'focus'
  onShow: () => void
  onHide: () => void
  onToggle: () => void
  onEscape: () => void
}

export function useTooltipTriggerInteractions({
  trigger,
  onShow,
  onHide,
  onToggle,
  onEscape,
}: UseTooltipInteractionsProps) {
  return useElementInteractions({
    mouse: trigger === 'hover' ? {
      onEnter: onShow,
      onLeave: onHide,
    } : trigger === 'click' ? {
      onClick: onToggle,
    } : {},
    
    focus: (trigger === 'hover' || trigger === 'focus') ? {
      onFocus: onShow,
      onBlur: onHide,
    } : {},
    
    keys: {
      [CONFIG.KEYS.ESCAPE]: onEscape,
      ...(trigger === 'click' ? {
        [CONFIG.KEYS.ENTER]: (e: KeyboardEvent) => {
          e.preventDefault()
          onToggle()
        },
        [CONFIG.KEYS.SPACE]: (e: KeyboardEvent) => {
          e.preventDefault()
          onToggle()
        },
      } : {}),
    },
    
    preventDefault: {
      keyboard: trigger === 'click',
    },
  })
}

interface UseTooltipContentInteractionsProps {
  interactive: boolean
  trigger: 'hover' | 'click' | 'focus'
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function useTooltipContentInteractions({
  interactive,
  onMouseEnter,
  onMouseLeave,
}: UseTooltipContentInteractionsProps) {
  return useElementInteractions({
    mouse: interactive ? {
      onEnter: onMouseEnter,
      onLeave: onMouseLeave,
    } : {},
    disabled: !interactive,
  })
}

interface UseTooltipCloseButtonProps {
  onClose: () => void
}

export function useTooltipCloseButton({ onClose }: UseTooltipCloseButtonProps) {
  return useElementInteractions({
    mouse: {
      onClick: (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      },
    },
    keys: {
      [CONFIG.KEYS.ENTER]: (e: KeyboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      },
      [CONFIG.KEYS.SPACE]: (e: KeyboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      },
    },
    preventDefault: {
      mouse: true,
      keyboard: true,
    },
    stopPropagation: {
      mouse: true,
      keyboard: true,
    },
  })
}