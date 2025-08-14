'use client'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/helpers/utils'
import type { ScrollAreaProps } from './types'

function ScrollArea({
  children,
  className,
  scrollbarClassName,
  thumbClassName,
  viewportClassName,
  orientation = 'vertical',
  hideScrollbar = false,
  scrollHideDelay = 600,
  type = 'hover',
  height,
  maxHeight,
  ...props
}: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showScrollbar, setShowScrollbar] = useState(type === 'always')
  const timeoutRef = useRef<NodeJS.Timeout | string | number | undefined>(undefined)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleScroll = () => {
      setIsScrolling(true)
      setShowScrollbar(true)

      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
        if (type === 'hover' || type === 'scroll') {
          setShowScrollbar(false)
        }
      }, scrollHideDelay)
    }

    const handleMouseEnter = () => {
      if (type === 'hover' || type === 'auto') {
        setShowScrollbar(true)
      }
    }

    const handleMouseLeave = () => {
      if (type === 'hover' && !isScrolling) {
        setShowScrollbar(false)
      }
    }

    viewport.addEventListener('scroll', handleScroll)
    viewport.addEventListener('mouseenter', handleMouseEnter)
    viewport.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      viewport.removeEventListener('scroll', handleScroll)
      viewport.removeEventListener('mouseenter', handleMouseEnter)
      viewport.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeoutRef.current)
    }
  }, [type, isScrolling, scrollHideDelay])

  const scrollbarStyles = {
    vertical: orientation === 'vertical' || orientation === 'both',
    horizontal: orientation === 'horizontal' || orientation === 'both',
  }

  const containerStyle = {
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(maxHeight && { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
  }

  return (
    <div className={cn('relative overflow-hidden', className)} style={containerStyle} {...props}>
      <div
        ref={viewportRef}
        className={cn(
          'w-full',
          height || maxHeight ? 'h-full' : '',
          {
            'overflow-x-hidden overflow-y-auto':
              scrollbarStyles.vertical && !scrollbarStyles.horizontal,
            'overflow-x-auto overflow-y-hidden':
              scrollbarStyles.horizontal && !scrollbarStyles.vertical,
            'overflow-auto': scrollbarStyles.vertical && scrollbarStyles.horizontal,
          },
          hideScrollbar && 'scrollbar-hide',
          !hideScrollbar && [
            'scrollbar-thin scrollbar-track-transparent',
            showScrollbar
              ? 'scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
              : 'scrollbar-thumb-transparent',
            'dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500',
          ],
          viewportClassName
        )}
        style={{
          scrollbarWidth: hideScrollbar ? 'none' : 'thin',
          msOverflowStyle: hideScrollbar ? 'none' : 'auto',
        }}
      >
        {children}
      </div>

      {!hideScrollbar && type !== 'auto' && (
        <>
          {scrollbarStyles.vertical && (
            <div
              className={cn(
                'absolute top-0 right-0 z-10 flex h-full w-2 flex-col',
                'transition-opacity duration-300',
                showScrollbar ? 'opacity-100' : 'opacity-0',
                scrollbarClassName
              )}
            >
              <div
                className={cn(
                  'relative flex-1 rounded-full bg-transparent',
                  'before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-1 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 before:transition-colors before:duration-200',
                  'hover:before:bg-gray-400',
                  'dark:before:bg-gray-600 dark:hover:before:bg-gray-500',
                  thumbClassName
                )}
              />
            </div>
          )}

          {scrollbarStyles.horizontal && (
            <div
              className={cn(
                'absolute bottom-0 left-0 z-10 flex h-2 w-full',
                'transition-opacity duration-300',
                showScrollbar ? 'opacity-100' : 'opacity-0',
                scrollbarClassName
              )}
            >
              <div
                className={cn(
                  'relative flex-1 rounded-full bg-transparent',
                  'before:absolute before:top-1/2 before:left-1/2 before:h-1 before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 before:transition-colors before:duration-200',
                  'hover:before:bg-gray-400',
                  'dark:before:bg-gray-600 dark:hover:before:bg-gray-500',
                  thumbClassName
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

ScrollArea.displayName = 'ScrollArea'

export default ScrollArea
