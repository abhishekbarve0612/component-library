import { useEffect, useRef, useState } from 'react'
import { type Format, TAGS } from './constants'
import Toolbar from '@/components/toolbar'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'

interface RichTextareaProps {
  className?: string
  initialValue?: string
}

function RichTextarea({ className }: RichTextareaProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Format[]>([])

  const applyFormat = (format: Format) => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    const range = selection.getRangeAt(0)

    if (!selection.isCollapsed) {
      const wrapper = document.createElement(TAGS[format])
      range.surroundContents(wrapper)
    } else {
      setActiveFormats((prev) =>
        prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
      )
    }
  }

  const handleInput = () => {
    if (activeFormats.length > 0) {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return
      const range = selection.getRangeAt(0)

      activeFormats.forEach((format) => {
        const wrapper = document.createElement(TAGS[format])
        range.surroundContents(wrapper)
        range.setStartAfter(wrapper)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      })
    }
  }

  useEffect(() => {
    const onSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return
      const node = selection.anchorNode as HTMLElement | null
      if (!node) return

      const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as HTMLElement)

      const newFormats: Format[] = []
      if (el?.closest(TAGS.bold)) newFormats.push('bold')
      if (el?.closest(TAGS.italic)) newFormats.push('italic')
      if (el?.closest(TAGS.underline)) newFormats.push('underline')
      setActiveFormats(newFormats)
    }

    document.addEventListener('selectionchange', onSelectionChange)
    return () => document.removeEventListener('selectionchange', onSelectionChange)
  }, [])

  return (
    <div className={className}>
      <Toolbar className="mb-2">
        <Toolbar.Item
          id="bold"
          label="Bold"
          icon={<FaBold />}
          onSelect={() => applyFormat('bold')}
        />
        <Toolbar.Item
          id="italic"
          label="Italic"
          icon={<FaItalic />}
          onSelect={() => applyFormat('italic')}
        />
        <Toolbar.Item
          id="underline"
          label="Underline"
          icon={<FaUnderline />}
          onSelect={() => applyFormat('underline')}
        />
      </Toolbar>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          minHeight: '120px',
        }}
      ></div>
    </div>
  )
}

export default RichTextarea
