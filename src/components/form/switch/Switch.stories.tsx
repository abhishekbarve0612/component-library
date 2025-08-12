import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Switch from './index'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    size: 'md',
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    size: 'md',
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'lg',
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center gap-4">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm text-slate-600">Status: {checked ? 'On' : 'Off'}</span>
      </div>
    )
  },
  args: {
    disabled: false,
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} size="sm" />
        <span className="text-xs text-slate-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} size="md" />
        <span className="text-xs text-slate-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch {...args} size="lg" />
        <span className="text-xs text-slate-500">Large</span>
      </div>
    </div>
  ),
  args: {
    checked: false,
    disabled: false,
  },
}

export const Interactive: Story = {
  render: () => {
    const [switches, setSwitches] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      soundEffects: false,
    })

    const updateSwitch = (key: keyof typeof switches) => (checked: boolean) => {
      setSwitches((prev) => ({ ...prev, [key]: checked }))
    }

    return (
      <div className="space-y-4 rounded-lg border bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="notifications" className="text-sm font-medium text-slate-700">
              Push Notifications
            </label>
            <Switch
              id="notifications"
              checked={switches.notifications}
              onCheckedChange={updateSwitch('notifications')}
              size="md"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="darkMode" className="text-sm font-medium text-slate-700">
              Dark Mode
            </label>
            <Switch
              id="darkMode"
              checked={switches.darkMode}
              onCheckedChange={updateSwitch('darkMode')}
              size="md"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="autoSave" className="text-sm font-medium text-slate-700">
              Auto Save
            </label>
            <Switch
              id="autoSave"
              checked={switches.autoSave}
              onCheckedChange={updateSwitch('autoSave')}
              size="md"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="soundEffects" className="text-sm font-medium text-slate-700">
              Sound Effects
            </label>
            <Switch
              id="soundEffects"
              checked={switches.soundEffects}
              onCheckedChange={updateSwitch('soundEffects')}
              size="md"
            />
          </div>
        </div>
      </div>
    )
  },
  args: {},
}
