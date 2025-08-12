import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within, userEvent } from '@storybook/test'
import { useState } from 'react'

import Tabs from './index'

const meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    defaultValue: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'account',
    size: 'md',
    orientation: 'horizontal',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-slate-600">
            Manage your account details and preferences.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full rounded border px-3 py-2" 
              defaultValue="john@example.com"
            />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="password">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-slate-600">
            Change your password here. Make sure it's secure.
          </p>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Current Password</label>
            <input type="password" className="w-full rounded border px-3 py-2" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">New Password</label>
            <input type="password" className="w-full rounded border px-3 py-2" />
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="notifications">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-slate-600">
            Configure how you receive notifications.
          </p>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm">Email notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Push notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm">SMS notifications</span>
            </label>
          </div>
        </div>
      </Tabs.Content>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that the first tab is active by default
    const accountTab = canvas.getByRole('tab', { name: /account/i })
    await expect(accountTab).toHaveAttribute('aria-selected', 'true')
    
    // Check that account content is visible
    const accountContent = canvas.getByRole('tabpanel', { name: /account/i })
    await expect(accountContent).toBeVisible()
    
    // Click on password tab
    const passwordTab = canvas.getByRole('tab', { name: /password/i })
    await userEvent.click(passwordTab)
    
    // Check that password tab is now active
    await expect(passwordTab).toHaveAttribute('aria-selected', 'true')
    await expect(accountTab).toHaveAttribute('aria-selected', 'false')
  },
}

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
  render: Default.render,
}

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
  render: Default.render,
}

export const VerticalOrientation: Story = {
  args: {
    ...Default.args,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex space-x-8">
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
          <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        </Tabs.List>
        <div className="flex-1">
          <Tabs.Content value="account">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-sm text-slate-600">
                Manage your account details and preferences.
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="password">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Password</h3>
              <p className="text-sm text-slate-600">
                Change your password here. Make sure it's secure.
              </p>
            </div>
          </Tabs.Content>
          <Tabs.Content value="notifications">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-sm text-slate-600">
                Configure how you receive notifications.
              </p>
            </div>
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  ),
}

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1')
    
    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-600 mb-2">External controls:</p>
          <div className="space-x-2">
            <button
              onClick={() => setActiveTab('tab1')}
              className="px-3 py-1 text-xs border rounded"
            >
              Go to Tab 1
            </button>
            <button
              onClick={() => setActiveTab('tab2')}
              className="px-3 py-1 text-xs border rounded"
            >
              Go to Tab 2
            </button>
            <button
              onClick={() => setActiveTab('tab3')}
              className="px-3 py-1 text-xs border rounded"
            >
              Go to Tab 3
            </button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <p>This is the content for Tab 1. The active tab is controlled externally.</p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <p>This is the content for Tab 2. Notice the smooth transitions.</p>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <p>This is the content for Tab 3. State is preserved when switching tabs.</p>
          </Tabs.Content>
        </Tabs>
      </div>
    )
  },
}

export const WithLoadingStates: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('fast')
    
    const handleSlowTabClick = () => {
      setActiveTab('slow')
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }
    
    return (
      <Tabs value={activeTab} onValueChange={(value) => {
        if (value === 'slow') {
          handleSlowTabClick()
        } else {
          setActiveTab(value)
          setLoading(false)
        }
      }}>
        <Tabs.List>
          <Tabs.Trigger value="fast">Fast Tab</Tabs.Trigger>
          <Tabs.Trigger value="slow">Slow Tab</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="fast">
          <p>This content loads instantly!</p>
        </Tabs.Content>
        <Tabs.Content value="slow" loading={loading}>
          <p>This content took 2 seconds to load. Notice the loading spinner.</p>
        </Tabs.Content>
      </Tabs>
    )
  },
}

export const PreserveContentState: Story = {
  render: () => (
    <Tabs defaultValue="form">
      <Tabs.List>
        <Tabs.Trigger value="form">Form</Tabs.Trigger>
        <Tabs.Trigger value="other">Other Tab</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="form" forceMount>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Type something in the input, then switch tabs. Your input will be preserved!
          </p>
          <input
            type="text"
            placeholder="Type something here..."
            className="w-full rounded border px-3 py-2"
          />
          <textarea
            placeholder="And here too..."
            className="w-full rounded border px-3 py-2"
            rows={3}
          />
        </div>
      </Tabs.Content>
      <Tabs.Content value="other">
        <p>Switch back to the form tab - your input should still be there!</p>
      </Tabs.Content>
    </Tabs>
  ),
}

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Try keyboard navigation: Focus a tab and use arrow keys, Home, and End to navigate.
      </p>
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
          <Tabs.Trigger value="tab4" disabled>
            Disabled Tab
          </Tabs.Trigger>
          <Tabs.Trigger value="tab5">Tab 5</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <p>Use → or ↓ to move to the next tab</p>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <p>Use ← or ↑ to move to the previous tab</p>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <p>Notice how disabled tabs are skipped during navigation</p>
        </Tabs.Content>
        <Tabs.Content value="tab5">
          <p>Use Home to go to first tab, End to go to last enabled tab</p>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div 
      className="p-6 rounded-lg"
      style={{
        '--tabs-list-bg': 'rgb(239 246 255)',
        '--tabs-trigger-text': 'rgb(59 130 246)',
        '--tabs-trigger-hover-text': 'rgb(37 99 235)',
        '--tabs-trigger-active-bg': 'rgb(59 130 246)',
        '--tabs-trigger-active-text': 'white',
      } as React.CSSProperties}
    >
      <Tabs defaultValue="custom1">
        <Tabs.List>
          <Tabs.Trigger value="custom1">Custom Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="custom2">Custom Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="custom3">Custom Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="custom1">
          <div className="p-4 bg-blue-50 rounded">
            <p>This shows custom CSS variable theming in action!</p>
          </div>
        </Tabs.Content>
        <Tabs.Content value="custom2">
          <div className="p-4 bg-blue-50 rounded">
            <p>The tabs use CSS custom properties for easy theming.</p>
          </div>
        </Tabs.Content>
        <Tabs.Content value="custom3">
          <div className="p-4 bg-blue-50 rounded">
            <p>You can override colors, backgrounds, and more!</p>
          </div>
        </Tabs.Content>
      </Tabs>
    </div>
  ),
}