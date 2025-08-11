import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Loader from './index'

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'bars', 'pulse', 'ripple'],
      description: 'The visual style of the loader',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the loader',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent'],
      description: 'Color theme of the loader',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show the loader',
    },
    text: {
      control: 'text',
      description: 'Optional text to display below the loader',
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to show as full-screen overlay',
    },
  },
  args: {
    loading: true,
    variant: 'spinner',
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithText: Story = {
  args: {
    text: 'Loading...',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Loader variant="spinner" />
        <span className="text-sm text-muted-foreground">Spinner</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="dots" />
        <span className="text-sm text-muted-foreground">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="bars" />
        <span className="text-sm text-muted-foreground">Bars</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="pulse" />
        <span className="text-sm text-muted-foreground">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="ripple" />
        <span className="text-sm text-muted-foreground">Ripple</span>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Loader size="xs" />
        <span className="text-sm text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="sm" />
        <span className="text-sm text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="md" />
        <span className="text-sm text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="lg" />
        <span className="text-sm text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="xl" />
        <span className="text-sm text-muted-foreground">XL</span>
      </div>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Loader color="primary" />
        <span className="text-sm text-muted-foreground">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader color="secondary" />
        <span className="text-sm text-muted-foreground">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader color="muted" />
        <span className="text-sm text-muted-foreground">Muted</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader color="accent" />
        <span className="text-sm text-muted-foreground">Accent</span>
      </div>
    </div>
  ),
}

export const WithChildren: Story = {
  args: {
    loading: false,
  },
  render: (args) => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={args.loading}
            onChange={(e) => {
              // This would be handled by parent state in real usage
              console.log('Loading:', e.target.checked)
            }}
          />
          Show Loading
        </label>
      </div>
      <Loader {...args}>
        <div className="p-8 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Content</h3>
          <p className="text-muted-foreground">
            This content is shown when loading is false, and hidden when loading is true.
          </p>
        </div>
      </Loader>
    </div>
  ),
}

export const OverlayExample: Story = {
  args: {
    overlay: true,
    text: 'Loading application...',
  },
  render: (args) => (
    <div className="relative">
      <div className="p-8 bg-card rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Page Content</h3>
        <p className="text-muted-foreground mb-4">
          This is the main page content that gets overlaid when loading.
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Button
        </button>
      </div>
      <Loader {...args}>
        <div className="p-8 bg-card rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Page Content</h3>
          <p className="text-muted-foreground mb-4">
            This is the main page content that gets overlaid when loading.
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Button
          </button>
        </div>
      </Loader>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false)
    const [variant, setVariant] = React.useState('spinner')
    
    return (
      <div className="space-y-6 p-6">
        <div className="flex gap-4">
          <button
            onClick={() => setLoading(!loading)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            {loading ? 'Stop Loading' : 'Start Loading'}
          </button>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="spinner">Spinner</option>
            <option value="dots">Dots</option>
            <option value="bars">Bars</option>
            <option value="pulse">Pulse</option>
            <option value="ripple">Ripple</option>
          </select>
        </div>
        
        <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-lg">
          <Loader loading={loading} variant={variant as any} text="Loading content..." />
        </div>
      </div>
    )
  },
}