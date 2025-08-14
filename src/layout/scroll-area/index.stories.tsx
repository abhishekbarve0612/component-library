import type { Meta, StoryObj } from '@storybook/react-vite'

import ScrollArea from './index'

const meta = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'both'],
    },
    type: {
      control: { type: 'select' },
      options: ['auto', 'always', 'scroll', 'hover'],
    },
    hideScrollbar: {
      control: { type: 'boolean' },
    },
    scrollHideDelay: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'text' },
    },
    maxHeight: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    height: '16rem',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Scrollable Content</h3>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="rounded border bg-gray-50 p-3">
            <h4 className="font-medium">Item {i + 1}</h4>
            <p className="mt-1 text-sm text-gray-600">
              This is item {i + 1} with some content that demonstrates scrolling behavior. The
              scroll area provides a smooth scrolling experience with customizable scrollbars.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const VerticalScroll: Story = {
  args: {
    orientation: 'vertical',
    height: '16rem',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-2 p-4">
        <h3 className="mb-4 text-lg font-semibold">Vertical Scrolling</h3>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="rounded bg-blue-50 p-2">
            <span className="text-sm">Vertical scroll item {i + 1}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const HorizontalScroll: Story = {
  args: {
    orientation: 'horizontal',
    height: '8rem',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex space-x-4 p-4" style={{ width: '150%' }}>
        <h3 className="text-lg font-semibold whitespace-nowrap">Horizontal Scrolling:</h3>
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="flex-shrink-0 rounded border bg-green-50 p-3">
            <span className="text-sm whitespace-nowrap">Horizontal item {i + 1}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const BothDirections: Story = {
  args: {
    orientation: 'both',
    height: '16rem',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4" style={{ width: '150%' }}>
        <h3 className="mb-4 text-lg font-semibold">Scroll Both Directions</h3>
        <div className="grid grid-cols-8 gap-4">
          {Array.from({ length: 120 }, (_, i) => (
            <div key={i} className="min-w-[120px] flex-shrink-0 rounded border bg-purple-50 p-3">
              <span className="text-sm whitespace-nowrap">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
}

export const HiddenScrollbar: Story = {
  args: {
    hideScrollbar: true,
    height: '16rem',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Hidden Scrollbar</h3>
        <p className="text-sm text-gray-600">
          The scrollbar is hidden but scrolling still works with mouse wheel, touch gestures, or
          keyboard navigation.
        </p>
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className="rounded border bg-orange-50 p-3">
            <h4 className="font-medium">Hidden scrollbar item {i + 1}</h4>
            <p className="text-sm text-gray-600">
              Content is still scrollable even without visible scrollbars.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const AlwaysVisible: Story = {
  args: {
    type: 'always',
    height: '16rem',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Always Visible Scrollbar</h3>
        <p className="text-sm text-gray-600">
          The scrollbar is always visible regardless of hover state or scrolling activity.
        </p>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="rounded border bg-red-50 p-3">
            <h4 className="font-medium">Always visible item {i + 1}</h4>
            <p className="text-sm text-gray-600">Scrollbar remains visible at all times.</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const ChatInterface: Story = {
  args: {
    height: '20rem',
    className: 'w-full border border-gray-200 rounded-lg bg-white',
    children: undefined,
  },
  render: (args) => (
    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-semibold">Chat Interface Example</h3>
      <ScrollArea {...args}>
        <div className="space-y-3 p-4">
          {[
            {
              sender: 'Alice',
              message: 'Hey everyone! How is the project going?',
              time: '10:30 AM',
              own: false,
            },
            {
              sender: 'You',
              message: 'Great progress! Just finished the new component library.',
              time: '10:32 AM',
              own: true,
            },
            {
              sender: 'Bob',
              message: "That's awesome! Can you share a preview?",
              time: '10:33 AM',
              own: false,
            },
            {
              sender: 'You',
              message: "Sure! I'll upload the Storybook link in a moment.",
              time: '10:35 AM',
              own: true,
            },
            {
              sender: 'Charlie',
              message: 'Looking forward to testing it out!',
              time: '10:36 AM',
              own: false,
            },
            {
              sender: 'Alice',
              message: 'This ScrollArea component looks really smooth!',
              time: '10:40 AM',
              own: false,
            },
            {
              sender: 'You',
              message: 'Thanks! It supports different orientations and scroll behaviors.',
              time: '10:41 AM',
              own: true,
            },
            {
              sender: 'Bob',
              message: 'Perfect for our dashboard redesign.',
              time: '10:42 AM',
              own: false,
            },
            {
              sender: 'Charlie',
              message: 'Should we schedule a review meeting?',
              time: '10:45 AM',
              own: false,
            },
            {
              sender: 'You',
              message: 'Sounds good! How about tomorrow at 2 PM?',
              time: '10:46 AM',
              own: true,
            },
            { sender: 'Alice', message: 'Works for me!', time: '10:47 AM', own: false },
            { sender: 'Bob', message: "I'll be there too.", time: '10:48 AM', own: false },
          ].map((chat, i) => (
            <div key={i} className={`flex ${chat.own ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  chat.own ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {!chat.own && <div className="mb-1 text-xs font-semibold">{chat.sender}</div>}
                <div className="text-sm">{chat.message}</div>
                <div className={`mt-1 text-xs ${chat.own ? 'text-blue-100' : 'text-gray-500'}`}>
                  {chat.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-4 rounded-b-lg border-t bg-white p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  ),
}

export const CodeEditor: Story = {
  args: {
    orientation: 'both',
    height: '24rem',
    className: 'w-full border border-gray-200 rounded-lg bg-gray-900 text-green-400',
    type: 'hover',
    children: undefined,
  },
  render: (args) => (
    <div className="rounded-lg bg-gray-800 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Code Editor Example</h3>
      <ScrollArea {...args}>
        <div className="p-4 font-mono text-sm" style={{ minWidth: '800px' }}>
          <div className="mb-2 text-gray-500">// Example React component with long lines</div>
          {`import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { cn } from '@/helpers/utils'
import { ScrollArea } from '@/components/layout/scroll-area'

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

const ExampleComponent = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  ...props
}: ComponentProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const handleClick = useCallback(() => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }, [disabled, loading, onClick])
  
  const memoizedClassName = useMemo(() => {
    return cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outlined',
        'bg-muted hover:bg-muted/80': variant === 'filled',
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4': size === 'md',  
        'h-12 px-6 text-lg': size === 'lg',
        'opacity-50 cursor-not-allowed': disabled,
        'animate-pulse': loading,
      },
      className
    )
  }, [variant, size, disabled, loading, className])
  
  return (
    <button
      className={memoizedClassName}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  )
}

export default ExampleComponent`
            .split('\n')
            .map((line, i) => (
              <div key={i} className="whitespace-pre">
                <span className="mr-4 text-gray-600 select-none">
                  {String(i + 1).padStart(2, ' ')}
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace(/('.*?')/g, '<span style="color: #facc15">$1</span>')
                      .replace(
                        /(\b(?:import|export|const|let|var|function|return|if|else|for|while|class|interface|type)\b)/g,
                        '<span style="color: #c084fc">$1</span>'
                      )
                      .replace(
                        /(\b(?:React|useState|useEffect|useCallback|useMemo|HTMLAttributes)\b)/g,
                        '<span style="color: #60a5fa">$1</span>'
                      ),
                  }}
                />
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

export const FlexibleHeight: Story = {
  args: {
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Flexible Height - Adapts to Content</h3>
      <p className="text-sm text-gray-600">
        This ScrollArea doesn't have a fixed height and adapts to its content. Put it in a container
        with constrained height to make it scrollable.
      </p>
      <div className="h-48 rounded-lg border-2 border-dashed border-blue-300 p-4">
        <p className="mb-2 text-sm text-blue-600">Container with fixed height (h-48)</p>
        <ScrollArea {...args}>
          <div className="space-y-2">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="rounded bg-blue-50 p-2">
                <span className="text-sm">Flexible height item {i + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  ),
}

export const MaxHeightExample: Story = {
  args: {
    maxHeight: '200px',
    className: 'w-full border border-gray-200 rounded-lg',
    children: undefined,
  },
  render: (args) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Max Height - Grows with Content, Limited at 200px</h3>
      <ScrollArea {...args}>
        <div className="space-y-2 p-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="rounded border bg-green-50 p-3">
              <span className="text-sm">Max height item {i + 1}</span>
              <p className="mt-1 text-xs text-gray-600">
                This content grows naturally until it hits the maxHeight limit.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

export const CustomStyling: Story = {
  args: {
    height: '16rem',
    className:
      'w-full border-2 border-dashed border-blue-300 rounded-xl bg-gradient-to-b from-blue-50 to-indigo-50',
    scrollbarClassName: 'bg-blue-100/50',
    thumbClassName: 'before:!bg-blue-500 hover:before:!bg-blue-600',
    type: 'always',
    children: undefined,
  },
  render: (args) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Custom Styled ScrollArea</h3>
      <ScrollArea {...args}>
        <div className="space-y-4 p-6">
          <h4 className="text-lg font-semibold text-blue-800">Custom Styling Example</h4>
          <p className="text-blue-700">
            This ScrollArea demonstrates custom styling capabilities with gradient backgrounds,
            custom scrollbar colors, and themed content.
          </p>
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="rounded-lg border border-blue-200 bg-white/60 p-4 shadow-sm backdrop-blur-sm"
            >
              <h5 className="font-medium text-blue-800">Styled Item {i + 1}</h5>
              <p className="mt-2 text-sm text-blue-600">
                Custom styled content with gradient backgrounds and themed scrollbars. This
                demonstrates how flexible the ScrollArea component can be.
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}
