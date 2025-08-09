import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import Select from './index'

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'A customizable select dropdown component with keyboard navigation and accessibility features.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when selection changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const SELECT_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
]

// Interactive story with controls
export const Interactive: Story = {
  argTypes: {
    children: {
      control: 'object',
      description: 'Available options',
      defaultValue: SELECT_OPTIONS,
    },
  },
  render: (args) => {
    const [value, setValue] = useState('')
    
    return (
      <Select 
        value={value} 
        onValueChange={setValue} 
        disabled={args.disabled}
        className={args.className}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          {SELECT_OPTIONS.map((option: { value: string; label: string }) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic select with a few options.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Select value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Select a fruit..." />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

export const WithPreselectedValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with a pre-selected value.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('banana')
    
    return (
      <Select value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Select a fruit..." />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">🍎 Apple</Select.Item>
          <Select.Item value="banana">🍌 Banana</Select.Item>
          <Select.Item value="orange">🍊 Orange</Select.Item>
          <Select.Item value="grape">🍇 Grape</Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

export const ManyOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with many options showing scrollable dropdown.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    const countries = [
      'United States', 'Canada', 'Mexico', 'United Kingdom', 'France', 
      'Germany', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 
      'Denmark', 'Finland', 'Japan', 'South Korea', 'China', 'India', 
      'Australia', 'New Zealand', 'Brazil', 'Argentina', 'Chile'
    ]
    
    return (
      <Select value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Choose your country..." />
        </Select.Trigger>
        <Select.Content>
          {countries.map((country) => (
            <Select.Item key={country} value={country.toLowerCase().replace(' ', '-')}>
              {country}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    )
  },
}

export const DisabledState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select in disabled state.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('apple')
    
    return (
      <Select value={value} onValueChange={setValue} disabled>
        <Select.Trigger>
          <Select.Value placeholder="Select a fruit..." />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with some disabled items.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Select value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Choose a plan..." />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="free">Free Plan</Select.Item>
          <Select.Item value="pro">Pro Plan - $10/month</Select.Item>
          <Select.Item value="enterprise" disabled>
            Enterprise Plan - Contact Sales
          </Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with custom styling.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <Select value={value} onValueChange={setValue} className="max-w-xs">
        <Select.Trigger className="border-2 border-blue-300 focus-within:border-blue-500 rounded-lg">
          <Select.Value placeholder="Custom styled select..." />
        </Select.Trigger>
        <Select.Content className="border-2 border-blue-300 rounded-lg">
          <Select.Item value="option1" className="hover:bg-blue-50">
            Custom Option 1
          </Select.Item>
          <Select.Item value="option2" className="hover:bg-blue-50">
            Custom Option 2
          </Select.Item>
          <Select.Item value="option3" className="hover:bg-blue-50">
            Custom Option 3
          </Select.Item>
        </Select.Content>
      </Select>
    )
  },
}

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demo of keyboard navigation. Try these keys: Tab (focus), Arrow keys (navigate), Enter/Space (select), Escape (close), Home/End (jump to first/last).',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium mb-2">Keyboard Navigation Instructions:</h3>
          <ul className="text-sm space-y-1">
            <li><kbd className="px-1 py-0.5 bg-white rounded">Tab</kbd> - Focus the select</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded">↑↓</kbd> - Navigate options</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded">Enter</kbd> or <kbd className="px-1 py-0.5 bg-white rounded">Space</kbd> - Open/Select</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded">Escape</kbd> - Close dropdown</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded">Home</kbd>/<kbd className="px-1 py-0.5 bg-white rounded">End</kbd> - First/Last option</li>
          </ul>
        </div>
        
        <Select value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value placeholder="Try keyboard navigation..." />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="keyboard-1">First Option</Select.Item>
            <Select.Item value="keyboard-2">Second Option</Select.Item>
            <Select.Item value="keyboard-3">Third Option</Select.Item>
            <Select.Item value="keyboard-4">Fourth Option</Select.Item>
            <Select.Item value="keyboard-5">Fifth Option</Select.Item>
            <Select.Item value="keyboard-6" disabled>Disabled Option</Select.Item>
            <Select.Item value="keyboard-7">Last Option</Select.Item>
          </Select.Content>
        </Select>
        
        {value && (
          <div className="p-3 bg-green-50 rounded-md">
            <span className="text-sm">Selected: <strong>{value}</strong></span>
          </div>
        )}
      </div>
    )
  },
}
