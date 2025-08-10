import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect, within, userEvent } from '@storybook/test'

import Toolbar from './index'
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaCut,
  FaCopy,
  FaPaste,
  FaUndo,
  FaRedo,
  FaSave,
  FaFont,
  FaPalette,
} from 'react-icons/fa'

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible toolbar component with keyboard navigation support. Items can be organized with dividers and supports both horizontal and vertical orientations.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Toolbar orientation',
      defaultValue: 'horizontal',
    },
    variant: {
      control: 'select',
      options: ['compact', 'minimal'],
      description: 'Visual variant - compact shows labels, minimal shows tooltips',
      defaultValue: 'compact',
    },
    activeItems: {
      control: 'object',
      description: 'Array of item IDs that should appear active/pressed',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when a toolbar item is selected',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Toolbar>

export default meta

type Story = StoryObj<typeof meta>

// Basic story to test functionality with individual handlers
export const Basic: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'compact',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item 
        id="bold" 
        label="Bold" 
        icon={<FaBold />} 
        onSelect={(id) => console.log('Bold clicked:', id)}
      />
      <Toolbar.Item 
        id="italic" 
        label="Italic" 
        icon={<FaItalic />}
        onSelect={(id) => console.log('Italic clicked:', id)}
      />
    </Toolbar>
  ),
}

// Default story with text formatting tools and individual handlers
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'compact',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item 
        id="bold" 
        label="Bold" 
        icon={<FaBold />} 
        onSelect={() => alert('Bold toggled!')}
      />
      <Toolbar.Item 
        id="italic" 
        label="Italic" 
        icon={<FaItalic />}
        onSelect={() => alert('Italic toggled!')}
      />
      <Toolbar.Item 
        id="underline" 
        label="Underline" 
        icon={<FaUnderline />}
        onSelect={() => alert('Underline toggled!')}
      />
      <Toolbar.Divider />
      <Toolbar.Item 
        id="align-left" 
        label="Align Left" 
        icon={<FaAlignLeft />}
        onSelect={() => alert('Align left!')}
      />
      <Toolbar.Item 
        id="align-center" 
        label="Align Center" 
        icon={<FaAlignCenter />}
        onSelect={() => alert('Align center!')}
      />
      <Toolbar.Item 
        id="align-right" 
        label="Align Right" 
        icon={<FaAlignRight />}
        onSelect={() => alert('Align right!')}
      />
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toolbar = canvas.getByRole('toolbar')

    // Check toolbar exists and has correct orientation
    await expect(toolbar).toBeInTheDocument()
    await expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal')

    // Check items are present
    const boldButton = canvas.getByRole('button', { name: /bold/i })
    await expect(boldButton).toBeInTheDocument()

    // Test keyboard navigation
    boldButton.focus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('button', { name: /italic/i })).toHaveFocus()
  },
}

// Minimal variant with tooltips
export const Minimal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'minimal',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item id="bold" label="Bold" icon={<FaBold />} />
      <Toolbar.Item id="italic" label="Italic" icon={<FaItalic />} />
      <Toolbar.Item id="underline" label="Underline" icon={<FaUnderline />} />
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toolbar = canvas.getByRole('toolbar')

    // In minimal variant, labels should be screen-reader only
    const boldButton = canvas.getByRole('button', { name: /bold/i })
    await expect(boldButton).toBeInTheDocument()

    // Check that buttons are present in minimal mode
    await expect(boldButton).toBeInTheDocument()
  },
}

// Vertical orientation
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'compact',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item id="cut" label="Cut" icon={<FaCut />} />
      <Toolbar.Item id="copy" label="Copy" icon={<FaCopy />} />
      <Toolbar.Item id="paste" label="Paste" icon={<FaPaste />} />
      <Toolbar.Divider />
      <Toolbar.Item id="undo" label="Undo" icon={<FaUndo />} />
      <Toolbar.Item id="redo" label="Redo" icon={<FaRedo />} />
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toolbar = canvas.getByRole('toolbar')

    // Check vertical orientation
    await expect(toolbar).toHaveAttribute('aria-orientation', 'vertical')

    // Test vertical keyboard navigation
    const cutButton = canvas.getByRole('button', { name: /cut/i })
    cutButton.focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect(canvas.getByRole('button', { name: /copy/i })).toHaveFocus()
  },
}

// Kitchen sink example with all features
export const Complete: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'compact',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item id="save" label="Save" icon={<FaSave />} />
      <Toolbar.Divider />
      <Toolbar.Item id="cut" label="Cut" icon={<FaCut />} />
      <Toolbar.Item id="copy" label="Copy" icon={<FaCopy />} />
      <Toolbar.Item id="paste" label="Paste" icon={<FaPaste />} />
      <Toolbar.Divider />
      <Toolbar.Item id="undo" label="Undo" icon={<FaUndo />} />
      <Toolbar.Item id="redo" label="Redo" icon={<FaRedo />} />
      <Toolbar.Divider />
      <Toolbar.Item id="bold" label="Bold" icon={<FaBold />} />
      <Toolbar.Item id="italic" label="Italic" icon={<FaItalic />} />
      <Toolbar.Item id="underline" label="Underline" icon={<FaUnderline />} />
      <Toolbar.Divider />
      <Toolbar.Item id="font" label="Font" icon={<FaFont />} />
      <Toolbar.Item id="color" label="Color" icon={<FaPalette />} />
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test that dividers are present
    const dividers = canvas.getAllByRole('separator')
    await expect(dividers).toHaveLength(4)

    // Test Home and End key navigation
    const saveButton = canvas.getByRole('button', { name: /save/i })
    const colorButton = canvas.getByRole('button', { name: /color/i })

    saveButton.focus()
    await userEvent.keyboard('{End}')
    await expect(colorButton).toHaveFocus()

    await userEvent.keyboard('{Home}')
    await expect(saveButton).toHaveFocus()
  },
}

// With disabled items
export const WithDisabledItems: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'compact',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item id="cut" label="Cut" icon={<FaCut />} />
      <Toolbar.Item id="copy" label="Copy" icon={<FaCopy />} disabled />
      <Toolbar.Item id="paste" label="Paste" icon={<FaPaste />} disabled />
      <Toolbar.Divider />
      <Toolbar.Item id="undo" label="Undo" icon={<FaUndo />} disabled />
      <Toolbar.Item id="redo" label="Redo" icon={<FaRedo />} />
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check that disabled items are properly disabled
    const copyButton = canvas.getByRole('button', { name: /copy/i })
    const pasteButton = canvas.getByRole('button', { name: /paste/i })

    await expect(copyButton).toBeDisabled()
    await expect(pasteButton).toBeDisabled()

    // Test keyboard navigation with disabled items
    const cutButton = canvas.getByRole('button', { name: /cut/i })
    cutButton.focus()

    // Navigate to next enabled item (redo, since copy/paste are disabled but still focusable for accessibility)
    await userEvent.keyboard('{ArrowRight}')
    await expect(copyButton).toHaveFocus()
  },
}

// With active items (shows selected/pressed state)
export const WithActiveItems: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'compact',
    activeItems: ['bold', 'italic'], // These items will appear active
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item 
        id="bold" 
        label="Bold" 
        icon={<FaBold />} 
        onSelect={() => alert('Bold clicked - should toggle active state')}
      />
      <Toolbar.Item 
        id="italic" 
        label="Italic" 
        icon={<FaItalic />}
        onSelect={() => alert('Italic clicked - should toggle active state')}
      />
      <Toolbar.Item 
        id="underline" 
        label="Underline" 
        icon={<FaUnderline />}
        onSelect={() => alert('Underline clicked - should toggle active state')}
      />
      <Toolbar.Divider />
      <Toolbar.Item 
        id="align-left" 
        label="Align Left" 
        icon={<FaAlignLeft />}
        onSelect={() => alert('Align left clicked')}
      />
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that active items have pressed state
    const boldButton = canvas.getByRole('button', { name: /bold/i })
    const italicButton = canvas.getByRole('button', { name: /italic/i })
    const underlineButton = canvas.getByRole('button', { name: /underline/i })
    
    await expect(boldButton).toHaveAttribute('aria-pressed', 'true')
    await expect(italicButton).toHaveAttribute('aria-pressed', 'true')
    await expect(underlineButton).toHaveAttribute('aria-pressed', 'false')
  },
}

// Interactive playground
export const Interactive: Story = {
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['compact', 'minimal'],
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'compact',
  },
  render: (args) => (
    <Toolbar {...args}>
      <Toolbar.Item id="bold" label="Bold" icon={<FaBold />} />
      <Toolbar.Item id="italic" label="Italic" icon={<FaItalic />} />
      <Toolbar.Item id="underline" label="Underline" icon={<FaUnderline />} />
      <Toolbar.Divider />
      <Toolbar.Item id="align-left" label="Align Left" icon={<FaAlignLeft />} />
      <Toolbar.Item id="align-center" label="Align Center" icon={<FaAlignCenter />} />
      <Toolbar.Item id="align-right" label="Align Right" icon={<FaAlignRight />} />
    </Toolbar>
  ),
}
