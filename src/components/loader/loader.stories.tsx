import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import Loader from './index'
import type { LoaderProps } from './types'

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
        <span className="text-muted-foreground text-sm">Spinner</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="dots" />
        <span className="text-muted-foreground text-sm">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="bars" />
        <span className="text-muted-foreground text-sm">Bars</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="pulse" />
        <span className="text-muted-foreground text-sm">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader variant="ripple" />
        <span className="text-muted-foreground text-sm">Ripple</span>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Loader size="xs" />
        <span className="text-muted-foreground text-sm">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="sm" />
        <span className="text-muted-foreground text-sm">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="md" />
        <span className="text-muted-foreground text-sm">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="lg" />
        <span className="text-muted-foreground text-sm">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size="xl" />
        <span className="text-muted-foreground text-sm">XL</span>
      </div>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <Loader color="primary" />
        <span className="text-muted-foreground text-sm">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader color="secondary" />
        <span className="text-muted-foreground text-sm">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader color="muted" />
        <span className="text-muted-foreground text-sm">Muted</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader color="accent" />
        <span className="text-muted-foreground text-sm">Accent</span>
      </div>
    </div>
  ),
}

export const WithChildren: Story = {
  args: {
    loading: false,
  },
  render: (args: LoaderProps) => (
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
        <div className="rounded-lg border p-8">
          <h3 className="mb-4 text-lg font-semibold">Content</h3>
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
      <div className="bg-card rounded-lg p-8">
        <h3 className="mb-4 text-lg font-semibold">Page Content</h3>
        <p className="text-muted-foreground mb-4">
          This is the main page content that gets overlaid when loading.
        </p>
        <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">Button</button>
      </div>
      <Loader {...args}>
        <div className="bg-card rounded-lg p-8">
          <h3 className="mb-4 text-lg font-semibold">Page Content</h3>
          <p className="text-muted-foreground mb-4">
            This is the main page content that gets overlaid when loading.
          </p>
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
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
            className="bg-primary text-primary-foreground rounded-md px-4 py-2"
          >
            {loading ? 'Stop Loading' : 'Start Loading'}
          </button>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="rounded-md border px-3 py-2"
          >
            <option value="spinner">Spinner</option>
            <option value="dots">Dots</option>
            <option value="bars">Bars</option>
            <option value="pulse">Pulse</option>
            <option value="ripple">Ripple</option>
          </select>
        </div>

        <div className="border-border flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
          <Loader
            loading={loading}
            variant={variant as LoaderProps['variant']}
            text="Loading content..."
          />
        </div>
      </div>
    )
  },
}
