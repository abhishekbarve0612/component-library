import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useGSAP } from '@gsap/react'
import { IoClose } from 'react-icons/io5'
import { TooltipContext } from './context'
import { calculateTooltipPosition, calculateArrowPosition, type Placement } from './positioning'
import { showTooltipAnimation, hideTooltipAnimation } from './animations'
import Button from '../button'
import TooltipContent from './Content'
import TooltipHeader from './Header'
import TooltipBody from './Body'
import TooltipArrow from './Arrow'

interface TooltipProps {
  id?: string
  targetRef?: React.RefObject<HTMLElement>
  placement?: Placement
  offset?: number
  delay?: number
  showArrow?: boolean
  interactive?: boolean
  trigger?: 'hover' | 'click' | 'focus'
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
  children: React.ReactNode
  className?: string
}

export function Tooltip({
  id,
  targetRef,
  placement = 'top',
  offset = 8,
  delay = 150,
  showArrow = false,
  interactive = false,
  trigger = 'hover',
  closeOnOutsideClick = true,
  showCloseButton = false,
  children,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: -9999, left: -9999 })
  const [actualPlacement, setActualPlacement] = useState<Placement>(placement)
  const [arrowPosition, setArrowPosition] = useState<any>({})
  const tooltipRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerEl = useRef<HTMLElement | null>(null)
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).slice(2, 9)}`)
  const isAnimating = useRef(false)

  useEffect(() => {
    let el: HTMLElement | null = null;

    if (targetRef?.current) {
      el = targetRef.current
    } else if (id) {
      const found = document.getElementById(id)
      if (found) {
        el = found
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[Tooltip] No element found with id="${id}"`)
        }
        return
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[Tooltip] No id or targetRef provided')
      }
      return
    }

    triggerEl.current = el

    // Enhance accessibility
    if (!el.hasAttribute('tabindex') && el.tabIndex < 0) {
      el.tabIndex = 0
    }
    el.setAttribute('aria-describedby', tooltipId.current)

    const showTooltip = () => {
      if (isAnimating.current) return
      if (showTimer.current) clearTimeout(showTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)
      
      showTimer.current = setTimeout(() => {
        setVisible(true)
      }, delay)
    }

    const hideTooltip = () => {
      if (isAnimating.current) return
      if (showTimer.current) clearTimeout(showTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)
      
      if (interactive) {
        hideTimer.current = setTimeout(() => setVisible(false), 300)
      } else {
        setVisible(false)
      }
    }

    const handleClick = () => {
      if (trigger === 'click') {
        visible ? hideTooltip() : showTooltip()
      }
    }

    const handleMouseEnter = () => {
      if (trigger === 'hover') showTooltip()
    }

    const handleMouseLeave = () => {
      if (trigger === 'hover') hideTooltip()
    }

    const handleFocus = () => {
      if (trigger === 'focus' || trigger === 'hover') showTooltip()
    }

    const handleBlur = () => {
      if (trigger === 'focus' || trigger === 'hover') hideTooltip()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false)
      if (e.key === 'Enter' || e.key === ' ') {
        if (trigger === 'click') {
          e.preventDefault()
          visible ? hideTooltip() : showTooltip()
        }
      }
    }

    // Add event listeners based on trigger type
    if (trigger === 'hover') {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
      el.addEventListener('focus', handleFocus)
      el.addEventListener('blur', handleBlur)
    } else if (trigger === 'click') {
      el.addEventListener('click', handleClick)
      el.addEventListener('keydown', handleKeyDown)
    } else if (trigger === 'focus') {
      el.addEventListener('focus', handleFocus)
      el.addEventListener('blur', handleBlur)
    }
    
    el.addEventListener('keydown', handleKeyDown)

    return () => {
      el.removeAttribute('aria-describedby')
      if (showTimer.current) clearTimeout(showTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)
      
      // Remove event listeners based on trigger type
      if (trigger === 'hover') {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.removeEventListener('focus', handleFocus)
        el.removeEventListener('blur', handleBlur)
      } else if (trigger === 'click') {
        el.removeEventListener('click', handleClick)
        el.removeEventListener('keydown', handleKeyDown)
      } else if (trigger === 'focus') {
        el.removeEventListener('focus', handleFocus)
        el.removeEventListener('blur', handleBlur)
      }
      
      el.removeEventListener('keydown', handleKeyDown)
    }
     
  }, [id, targetRef, delay, placement, offset, trigger, interactive, visible])

  // Handle outside click to close tooltip
  useEffect(() => {
    if (!visible || !closeOnOutsideClick) return

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node
      
      // Don't close if clicking on trigger element
      if (triggerEl.current?.contains(target)) return
      
      // Don't close if clicking inside tooltip content
      if (tooltipRef.current?.contains(target)) return
      
      setVisible(false)
    }

    // Add small delay to prevent immediate closing when tooltip appears
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideClick)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [visible, closeOnOutsideClick, interactive])

  const positionTooltip = () => {
    if (!triggerEl.current || !tooltipRef.current) return
    
    const triggerRect = triggerEl.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    const position = calculateTooltipPosition({
      triggerRect,
      tooltipRect,
      placement,
      offset,
      arrowSize: showArrow ? 8 : 0
    })
    
    setCoords({ top: position.top, left: position.left })
    setActualPlacement(position.actualPlacement)
    
    // Calculate arrow position if needed
    if (showArrow) {
      const arrowPos = calculateArrowPosition(
        position.actualPlacement,
        triggerRect,
        tooltipRect,
        { top: position.top, left: position.left }
      )
      setArrowPosition(arrowPos)
    }
  }

  // Position tooltip after DOM update but before paint
  useLayoutEffect(() => {
    if (visible) {
      positionTooltip()
    }
  }, [visible])

  // GSAP animations
  useGSAP(() => {
    if (!tooltipRef.current) return
    
    if (visible) {
      isAnimating.current = true
      showTooltipAnimation(tooltipRef.current, actualPlacement)
      setTimeout(() => {
        isAnimating.current = false
      }, 200)
    }
  }, [visible, actualPlacement])

  // Handle tooltip hide with animation
  const handleHideTooltip = () => {
    if (!tooltipRef.current) {
      setVisible(false)
      return
    }
    
    isAnimating.current = true
    const animation = hideTooltipAnimation(tooltipRef.current, actualPlacement)
    animation.then(() => {
      setVisible(false)
      isAnimating.current = false
    })
  }

  // Interactive tooltip mouse events
  const handleTooltipMouseEnter = () => {
    if (interactive && hideTimer.current) {
      clearTimeout(hideTimer.current)
    }
  }

  const handleTooltipMouseLeave = () => {
    if (interactive && trigger === 'hover') {
      hideTimer.current = setTimeout(() => setVisible(false), 200)
    }
  }

  if (!visible) return null

  return ReactDOM.createPortal(
    <TooltipContext.Provider value={{ visible, setVisible }}>
      <div
        ref={tooltipRef}
        id={tooltipId.current}
        role='tooltip'
        aria-live='polite'
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={handleTooltipMouseLeave}
        style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          zIndex: 9999,
          pointerEvents: (interactive || showCloseButton) ? 'auto' : 'none',
          opacity: coords.top === -9999 ? 0 : 1,
        }}
        className={className}
      >
        <div className='relative'>
          {showCloseButton && (
            <button
              type='button' 
              className='absolute -top-1 -right-1 h-6 w-6 p-0 rounded-full bg-white hover:bg-gray-100 shadow-md border border-gray-200 z-20 flex items-center justify-center cursor-pointer' 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setVisible(false)
              }}
              aria-label='Close tooltip'
            >
              <IoClose className='h-3 w-3 text-gray-600' />
            </button>
          )}
          {children}
        </div>
        {showArrow && (
          <TooltipArrow
            placement={actualPlacement}
            style={arrowPosition}
            className='text-white'
          />
        )}
      </div>
    </TooltipContext.Provider>,
    document.body
  )
}

function Close({ children }: { children?: React.ReactNode }) {
  const { setVisible } = useContext(TooltipContext)
  return (
    <Button 
      type='button' 
      variant='ghost' 
      size='sm' 
      className='absolute top-1 right-1' 
      onClick={() => setVisible(false)}
    >
      {children ?? <IoClose className='size-3 inline-block text-current' />}
    </Button>
  )
}

Close.displayName = 'Tooltip.Close'

// Compound components
Tooltip.Content = TooltipContent
Tooltip.Header = TooltipHeader
Tooltip.Body = TooltipBody
Tooltip.Arrow = TooltipArrow
Tooltip.Close = Close
Tooltip.displayName = 'Tooltip'

export default Tooltip