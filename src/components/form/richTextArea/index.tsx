'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/helpers/utils'
import { type Format, COMMANDS, SHORTCUTS } from './constants'
import Toolbar from '@/components/toolbar'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'
import type { RichTextareaProps } from './types'

function RichTextarea({
  className,
  initialValue = '',
  placeholder = 'Enter your text...',
  disabled = false,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: RichTextareaProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Format[]>([])
  const [isFocused, setIsFocused] = useState(false)

  // Safe execCommand wrapper with error handling
  const executeCommand = useCallback((command: string, value?: string) => {
    try {
      // Focus editor to ensure commands work
      if (editorRef.current && !editorRef.current.contains(document.activeElement)) {
        editorRef.current.focus()
      }

      return document.execCommand(command, false, value)
    } catch (error) {
      console.warn('RichTextArea: execCommand failed:', command, error)
      return false
    }
  }, [])

  // Apply formatting using execCommand (more reliable than DOM manipulation)
  const applyFormat = useCallback(
    (format: Format) => {
      if (disabled) return

      const command = COMMANDS[format]
      if (command) {
        executeCommand(command)
        updateActiveFormats()
      }
    },
    [disabled, executeCommand]
  )

  // Update active formats based on current selection
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current || disabled) return

    try {
      const formats: Format[] = []

      // Use queryCommandState for reliable state detection
      if (document.queryCommandState('bold')) formats.push('bold')
      if (document.queryCommandState('italic')) formats.push('italic')
      if (document.queryCommandState('underline')) formats.push('underline')

      setActiveFormats(formats)
    } catch (error) {
      console.warn('RichTextArea: queryCommandState failed:', error)
    }
  }, [disabled])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      // Handle Ctrl/Cmd + key shortcuts
      if (e.ctrlKey || e.metaKey) {
        const shortcut = SHORTCUTS[e.key.toLowerCase()]
        if (shortcut) {
          e.preventDefault()
          applyFormat(shortcut)
          return
        }
      }

      // Handle other shortcuts
      switch (e.key) {
        case 'Tab':
          // Allow tab to exit editor (accessibility)
          break
        case 'Escape':
          // Blur editor on escape
          editorRef.current?.blur()
          break
      }
    },
    [disabled, applyFormat]
  )

  // Handle input changes
  const handleInput = useCallback(() => {
    if (disabled || !editorRef.current) return

    const content = editorRef.current.innerHTML
    onChange?.(content)
    updateActiveFormats()
  }, [disabled, onChange, updateActiveFormats])

  // Handle focus/blur
  const handleFocus = useCallback(() => {
    if (disabled) return
    setIsFocused(true)
    updateActiveFormats()
    onFocus?.()
  }, [disabled, updateActiveFormats, onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    onBlur?.()
  }, [onBlur])

  // Handle selection changes (for toolbar state updates)
  useEffect(() => {
    if (disabled) return

    const handleSelectionChange = () => {
      // Only update if editor is focused and selection is within editor
      if (isFocused && editorRef.current?.contains(document.getSelection()?.anchorNode || null)) {
        updateActiveFormats()
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [disabled, isFocused, updateActiveFormats])

  // Set initial content
  useEffect(() => {
    if (editorRef.current && initialValue && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialValue
    }
  }, [initialValue])

  return (
    <div className={cn('space-y-2', className)}>
      {/* Toolbar */}
      <Toolbar
        variant="compact"
        className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
        activeItems={activeFormats}
      >
        <Toolbar.Item
          id="bold"
          label="Bold (Ctrl+B)"
          icon={<FaBold />}
          disabled={disabled}
          onSelect={() => applyFormat('bold')}
        />
        <Toolbar.Item
          id="italic"
          label="Italic (Ctrl+I)"
          icon={<FaItalic />}
          disabled={disabled}
          onSelect={() => applyFormat('italic')}
        />
        <Toolbar.Item
          id="underline"
          label="Underline (Ctrl+U)"
          icon={<FaUnderline />}
          disabled={disabled}
          onSelect={() => applyFormat('underline')}
        />
      </Toolbar>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={ariaLabel || 'Rich text editor'}
        aria-describedby={ariaDescribedBy}
        data-placeholder={placeholder}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          // Base styles
          'min-h-[120px] w-full rounded-md border px-3 py-2 text-sm',
          'resize-none transition-colors outline-none',

          // Border and background
          'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900',

          // Focus states
          'focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2',

          // Disabled states
          disabled && 'cursor-not-allowed opacity-50',

          // Placeholder styles
          'empty:before:text-slate-500 empty:before:content-[attr(data-placeholder)]',
          'empty:before:pointer-events-none empty:before:float-left empty:before:h-0',

          // Content styles
          '[&_em]:italic [&_strong]:font-bold [&_u]:underline',
          '[&_code]:bg-slate-100 [&_code]:font-mono [&_s]:line-through',
          '[&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4',
          '[&_pre]:rounded [&_pre]:bg-slate-100 [&_pre]:p-2 [&_pre]:font-mono',
          '[&_ol]:list-inside [&_ol]:list-decimal [&_ul]:list-inside [&_ul]:list-disc'
        )}
        style={{
          // Ensure proper line height and spacing
          lineHeight: '1.5',
          wordBreak: 'break-word',
        }}
      />

      {/* Accessibility improvements */}
      <div className="sr-only" aria-live="polite">
        {activeFormats.length > 0 && `Active formatting: ${activeFormats.join(', ')}`}
      </div>
    </div>
  )
}

RichTextarea.displayName = 'RichTextarea'

export default RichTextarea
