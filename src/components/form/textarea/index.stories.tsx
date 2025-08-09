import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import Textarea from './index'

const meta = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: 'A flexible textarea component with auto-resize, character counting, validation, and accessibility features.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current textarea value',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when value changes',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
      defaultValue: false,
    },
    autoResize: {
      control: 'boolean',
      description: 'Enable auto-resize functionality',
      defaultValue: false,
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character limit',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

// Interactive story with controls
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    
    return (
      <Textarea 
        value={value} 
        onValueChange={setValue}
        required={args.required}
        disabled={args.disabled}
        autoResize={args.autoResize}
        maxLength={args.maxLength}
        error={args.error}
        className={args.className}
      >
        <Textarea.Label>Interactive Textarea</Textarea.Label>
        <Textarea.Description>
          Try typing, enabling auto-resize, or setting a character limit in the controls.
        </Textarea.Description>
        <Textarea.Field placeholder="Start typing..." />
        <Textarea.Count />
        <Textarea.Error />
      </Textarea>
    )
  },
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic textarea with label and placeholder.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Textarea value={value} onValueChange={setValue}>
        <Textarea.Label>Message</Textarea.Label>
        <Textarea.Field placeholder="Enter your message..." />
      </Textarea>
    )
  },
}

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea with helpful description text.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Textarea value={value} onValueChange={setValue}>
        <Textarea.Label>Feedback</Textarea.Label>
        <Textarea.Description>
          Please provide detailed feedback about your experience.
        </Textarea.Description>
        <Textarea.Field placeholder="Your feedback..." rows={3} />
      </Textarea>
    )
  },
}

export const WithCharacterCount: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea with character counting and limits.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Textarea value={value} onValueChange={setValue} maxLength={200}>
        <Textarea.Label>Bio</Textarea.Label>
        <Textarea.Description>
          Write a brief bio (max 200 characters).
        </Textarea.Description>
        <Textarea.Field placeholder="Tell us about yourself..." rows={4} />
        <Textarea.Count />
      </Textarea>
    )
  },
}

export const AutoResize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea that automatically grows with content.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Textarea value={value} onValueChange={setValue} autoResize>
        <Textarea.Label>Auto-Resize Comment</Textarea.Label>
        <Textarea.Description>
          This textarea will grow as you type more content.
        </Textarea.Description>
        <Textarea.Field 
          placeholder="Start typing and watch the textarea grow..." 
          rows={3} 
        />
      </Textarea>
    )
  },
}

export const WithValidation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea with validation states and error messages.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    const [showError, setShowError] = useState(false)
    
    const handleValueChange = (newValue: string) => {
      setValue(newValue)
      setShowError(newValue.length > 0 && newValue.length < 10)
    }
    
    return (
      <Textarea 
        value={value} 
        onValueChange={handleValueChange}
        required
        error={showError ? 'Message must be at least 10 characters long' : undefined}
      >
        <Textarea.Label>Required Message</Textarea.Label>
        <Textarea.Description>
          Enter a message with at least 10 characters.
        </Textarea.Description>
        <Textarea.Field placeholder="Your message (min 10 characters)..." />
        <Textarea.Error />
      </Textarea>
    )
  },
}

export const DisabledState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea in disabled state.',
      },
    },
  },
  render: () => {
    const [value] = useState('This textarea is disabled and cannot be edited.')
    
    return (
      <Textarea value={value} disabled>
        <Textarea.Label>Disabled Textarea</Textarea.Label>
        <Textarea.Description>
          This field is read-only and cannot be modified.
        </Textarea.Description>
        <Textarea.Field placeholder="You cannot type here..." />
      </Textarea>
    )
  },
}

export const LongContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Textarea with longer content demonstrating scrolling.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(
      `This is a longer textarea with multiple lines of content.

It demonstrates how the component handles:
• Line breaks
• Multiple paragraphs
• Longer text content
• Scrolling behavior when content exceeds the visible area

You can continue editing this content to see how the textarea behaves with extensive text.`
    )
    
    return (
      <Textarea value={value} onValueChange={setValue} maxLength={1000}>
        <Textarea.Label>Article Content</Textarea.Label>
        <Textarea.Description>
          Edit this longer content to see scrolling behavior.
        </Textarea.Description>
        <Textarea.Field rows={8} />
        <Textarea.Count />
      </Textarea>
    )
  },
}

export const CharacterLimitDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demo showing character limit warnings and animations.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('Type here to see character limit warnings...')
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium mb-2">Character Limit Features:</h3>
          <ul className="text-sm space-y-1">
            <li>• Normal state: Gray counter</li>
            <li>• Warning (80%): Orange counter with scale animation</li>
            <li>• Over limit: Red counter with larger scale</li>
          </ul>
        </div>
        
        <Textarea value={value} onValueChange={setValue} maxLength={100}>
          <Textarea.Label>Limited Text (100 chars)</Textarea.Label>
          <Textarea.Description>
            Try typing past 80 characters to see warning animations.
          </Textarea.Description>
          <Textarea.Field placeholder="Start typing..." rows={4} />
          <Textarea.Count />
        </Textarea>
      </div>
    )
  },
}

export const AllFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive demo showing all textarea features together.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    const [hasError, setHasError] = useState(false)
    
    const handleValueChange = (newValue: string) => {
      setValue(newValue)
      // Simulate validation
      setHasError(newValue.includes('error'))
    }
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-md">
          <h3 className="font-medium mb-3">All Features Demo:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Auto-resize enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Character limit: 300</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Required field</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>GSAP animations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>Validation (type 'error')</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>Full accessibility</span>
            </div>
          </div>
        </div>
        
        <Textarea 
          value={value} 
          onValueChange={handleValueChange}
          required
          autoResize
          maxLength={300}
          error={hasError ? 'Remove the word "error" from your text' : undefined}
        >
          <Textarea.Label>Complete Feature Demo</Textarea.Label>
          <Textarea.Description>
            This textarea demonstrates all features: auto-resize, character counting, validation, animations, and accessibility.
          </Textarea.Description>
          <Textarea.Field 
            placeholder="Try typing 'error' to see validation, or write a lot to see auto-resize..." 
            rows={3}
          />
          <Textarea.Count />
          <Textarea.Error />
        </Textarea>
        
        {value && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium text-green-800">
                Content: <span className="font-bold">{value.length} characters</span>
              </span>
            </div>
          </div>
        )}
      </div>
    )
  },
}
