import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect, within, userEvent } from '@storybook/test'

import RichTextarea from './index'

const meta = {
  title: 'Components/Form/RichTextarea',
  component: RichTextarea,
  parameters: {
    docs: {
      description: {
        component: 'A rich text editor component with formatting toolbar and keyboard shortcuts.',
      },
    },
  },
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'Initial HTML content',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled',
    },
    onChange: {
      action: 'changed',
      description: 'Called when content changes',
    },
    onFocus: {
      action: 'focused',
      description: 'Called when editor gains focus',
    },
    onBlur: {
      action: 'blurred', 
      description: 'Called when editor loses focus',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof RichTextarea>

export default meta

type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that editor is present
    const editor = canvas.getByRole('textbox')
    await expect(editor).toBeInTheDocument()
    await expect(editor).toHaveAttribute('aria-multiline', 'true')
    
    // Check toolbar items
    const boldButton = canvas.getByRole('button', { name: /bold/i })
    const italicButton = canvas.getByRole('button', { name: /italic/i })
    const underlineButton = canvas.getByRole('button', { name: /underline/i })
    
    await expect(boldButton).toBeInTheDocument()
    await expect(italicButton).toBeInTheDocument()
    await expect(underlineButton).toBeInTheDocument()
  },
}

// With initial content
export const WithInitialContent: Story = {
  args: {
    initialValue: '<p>This is <strong>bold</strong> and <em>italic</em> text.</p>',
    placeholder: 'Edit this content...',
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    initialValue: '<p>This editor is disabled.</p>',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    const editor = canvas.getByRole('textbox')
    const boldButton = canvas.getByRole('button', { name: /bold/i })
    
    await expect(editor).toHaveAttribute('contenteditable', 'false')
    await expect(boldButton).toBeDisabled()
  },
}

// Interactive example with keyboard shortcuts
export const Interactive: Story = {
  args: {
    placeholder: 'Try keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+U (underline)',
    onChange: (content) => console.log('Content changed:', content),
  },
  render: (args) => (
    <div className="space-y-4">
      <RichTextarea {...args} />
      <div className="text-sm text-slate-600">
        <p><strong>Keyboard shortcuts:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Ctrl+B or Cmd+B - Bold</li>
          <li>Ctrl+I or Cmd+I - Italic</li>
          <li>Ctrl+U or Cmd+U - Underline</li>
          <li>Escape - Blur editor</li>
        </ul>
      </div>
    </div>
  ),
}

// Accessibility demo
export const Accessibility: Story = {
  args: {
    'aria-label': 'Message composition',
    'aria-describedby': 'editor-help',
    placeholder: 'Compose your message...',
  },
  render: (args) => (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Message
      </label>
      <RichTextarea {...args} />
      <div id="editor-help" className="text-sm text-slate-500">
        Use the toolbar buttons or keyboard shortcuts to format your text.
        Screen readers will announce active formatting.
      </div>
    </div>
  ),
}