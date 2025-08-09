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

export const AnimationShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all GSAP animations: dropdown scale, chevron rotation, focus pulse, hover slide, and selection feedback.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('')
    
    return (
      <div className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-md">
          <h3 className="font-medium mb-3">Animation Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Dropdown scale in/out</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Chevron smooth rotation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Focus pulse feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Hover slide animation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>Selection scale feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span>Keyboard highlight</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Animated Colors Select</h4>
            <Select value={value} onValueChange={setValue}>
              <Select.Trigger>
                <Select.Value placeholder="Choose a color..." />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="red">🔴 Red</Select.Item>
                <Select.Item value="blue">🔵 Blue</Select.Item>
                <Select.Item value="green">🟢 Green</Select.Item>
                <Select.Item value="yellow">🟡 Yellow</Select.Item>
                <Select.Item value="purple">🟣 Purple</Select.Item>
                <Select.Item value="orange">🟠 Orange</Select.Item>
              </Select.Content>
            </Select>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Animated Numbers Select</h4>
            <Select value={value} onValueChange={setValue}>
              <Select.Trigger>
                <Select.Value placeholder="Pick a number..." />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="1">1️⃣ One</Select.Item>
                <Select.Item value="2">2️⃣ Two</Select.Item>
                <Select.Item value="3">3️⃣ Three</Select.Item>
                <Select.Item value="4">4️⃣ Four</Select.Item>
                <Select.Item value="5">5️⃣ Five</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </div>
        
        {value && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium text-green-800">
                Selected: <span className="font-bold">{value}</span>
              </span>
            </div>
          </div>
        )}
        
        <div className="p-4 bg-amber-50 rounded-md border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Try:</strong> Click to open, hover over items to see slide animation, use keyboard navigation, and watch the selection feedback!
          </p>
        </div>
      </div>
    )
  },
}
