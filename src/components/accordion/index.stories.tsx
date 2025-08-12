import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FiInfo, FiSettings, FiUser, FiHelpCircle } from 'react-icons/fi'
import Accordion from './index'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible accordion component built with native HTML details/summary elements and compound architecture for collapsible content sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      description: 'Allow multiple items to be open at the same time',
      control: 'boolean',
    },
    collapsible: {
      description: 'Allow all items to be closed at the same time',
      control: 'boolean',
    },
    defaultValue: {
      description: 'Default opened item(s)',
      control: 'text',
    },
    onValueChange: {
      description: 'Callback fired when accordion state changes',
      action: 'value-changed',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion className="w-96" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>What is this component?</Accordion.Trigger>
        <Accordion.Content>
          <p className="text-gray-600 dark:text-gray-300">
            This is an accordion component that allows you to create collapsible content sections.
            It's built using native HTML details and summary elements for better accessibility.
          </p>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-2">
        <Accordion.Trigger>How does it work?</Accordion.Trigger>
        <Accordion.Content>
          <p className="text-gray-600 dark:text-gray-300">
            The accordion uses compound component architecture, making it flexible and easy to use.
            Each item contains a trigger (clickable header) and content (collapsible section).
          </p>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-2">
              Yes! It's built with accessibility in mind:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Uses native HTML details/summary elements</li>
              <li>Proper ARIA attributes and keyboard navigation</li>
              <li>Screen reader friendly</li>
              <li>Focus management</li>
            </ul>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion className="w-96" multiple defaultValue={['item-1', 'item-3']}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiUser className="mr-2 h-4 w-4" />
            Account Settings
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage your account preferences and personal information.
            </p>
            <div className="pt-2 space-y-1">
              <div className="text-xs text-gray-500">• Profile information</div>
              <div className="text-xs text-gray-500">• Password and security</div>
              <div className="text-xs text-gray-500">• Email preferences</div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiSettings className="mr-2 h-4 w-4" />
            Application Settings
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Configure application behavior and preferences.
            </p>
            <div className="pt-2 space-y-1">
              <div className="text-xs text-gray-500">• Theme and appearance</div>
              <div className="text-xs text-gray-500">• Language settings</div>
              <div className="text-xs text-gray-500">• Notifications</div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-3">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiInfo className="mr-2 h-4 w-4" />
            Privacy & Data
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Control how your data is collected and used.
            </p>
            <div className="pt-2 space-y-1">
              <div className="text-xs text-gray-500">• Data collection preferences</div>
              <div className="text-xs text-gray-500">• Cookie settings</div>
              <div className="text-xs text-gray-500">• Third-party integrations</div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const FAQ: Story = {
  render: () => (
    <Accordion className="w-[500px]" collapsible>
      <Accordion.Item value="shipping">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiHelpCircle className="mr-2 h-4 w-4 text-blue-500" />
            How long does shipping take?
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-3">
              Shipping times vary depending on your location and selected shipping method:
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Standard Shipping:</span>
                <span>5-7 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Express Shipping:</span>
                <span>2-3 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Overnight Shipping:</span>
                <span>1 business day</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              * Business days exclude weekends and holidays
            </p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="returns">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiHelpCircle className="mr-2 h-4 w-4 text-blue-500" />
            What is your return policy?
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-3">
              We offer a 30-day return policy for all items in original condition.
            </p>
            <div className="text-sm space-y-2">
              <p><strong>Eligible items:</strong> Unused items in original packaging</p>
              <p><strong>Return window:</strong> 30 days from delivery date</p>
              <p><strong>Refund processing:</strong> 5-10 business days after we receive your return</p>
            </div>
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-700 dark:text-blue-300">
              💡 Tip: Keep your receipt and original packaging for easy returns
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="warranty">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiHelpCircle className="mr-2 h-4 w-4 text-blue-500" />
            Do you offer warranties?
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-3">
              Yes, we provide comprehensive warranty coverage:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-green-400 pl-3">
                <div className="font-medium text-green-700 dark:text-green-400">1 Year Standard Warranty</div>
                <div className="text-sm">Covers manufacturing defects and normal wear</div>
              </div>
              <div className="border-l-4 border-blue-400 pl-3">
                <div className="font-medium text-blue-700 dark:text-blue-400">Extended Warranty Available</div>
                <div className="text-sm">Up to 3 years of additional coverage</div>
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="support">
        <Accordion.Trigger>
          <div className="flex items-center">
            <FiHelpCircle className="mr-2 h-4 w-4 text-blue-500" />
            How can I contact support?
          </div>
        </Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-3">We're here to help! Reach out through any of these channels:</p>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>📧 Email Support</span>
                <span className="text-blue-600 dark:text-blue-400">support@example.com</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>💬 Live Chat</span>
                <span className="text-green-600 dark:text-green-400">Available 24/7</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>📞 Phone Support</span>
                <span className="text-blue-600 dark:text-blue-400">1-800-HELP</span>
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const SingleExpansion: Story = {
  render: () => (
    <Accordion className="w-96" collapsible={false}>
      <Accordion.Item value="step-1">
        <Accordion.Trigger>Step 1: Create Account</Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-2">Get started by creating your account:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Enter your email address</li>
              <li>Create a secure password</li>
              <li>Verify your email</li>
              <li>Complete your profile</li>
            </ol>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="step-2">
        <Accordion.Trigger>Step 2: Setup Preferences</Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-2">Customize your experience:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Choose your theme</li>
              <li>Set notification preferences</li>
              <li>Configure privacy settings</li>
              <li>Add profile picture</li>
            </ol>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="step-3">
        <Accordion.Trigger>Step 3: Start Using</Accordion.Trigger>
        <Accordion.Content>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="mb-2">You're all set! Here's what you can do:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Explore the dashboard</li>
              <li>Import your data</li>
              <li>Invite team members</li>
              <li>Start your first project</li>
            </ol>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Accordion className="w-96">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Available Section</Accordion.Trigger>
        <Accordion.Content>
          <p className="text-gray-600 dark:text-gray-300">
            This section is available and can be expanded normally.
          </p>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger disabled>Disabled Section</Accordion.Trigger>
        <Accordion.Content>
          <p className="text-gray-600 dark:text-gray-300">
            This content cannot be accessed because the section is disabled.
          </p>
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Another Available Section</Accordion.Trigger>
        <Accordion.Content>
          <p className="text-gray-600 dark:text-gray-300">
            This section is also available and fully functional.
          </p>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1')
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Current value: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{value}</code>
        </div>
        
        <Accordion 
          className="w-96" 
          value={value} 
          onValueChange={(newValue) => setValue(newValue as string)}
        >
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Controlled Item 1</Accordion.Trigger>
            <Accordion.Content>
              <p className="text-gray-600 dark:text-gray-300">
                This accordion is controlled by external state. The current value is managed outside the component.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Controlled Item 2</Accordion.Trigger>
            <Accordion.Content>
              <p className="text-gray-600 dark:text-gray-300">
                You can see the current value displayed above changes as you interact with different items.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          
          <Accordion.Item value="item-3">
            <Accordion.Trigger>Controlled Item 3</Accordion.Trigger>
            <Accordion.Content>
              <p className="text-gray-600 dark:text-gray-300">
                This allows for complex state management and integration with forms or other components.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setValue('item-1')}
            className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded"
          >
            Open Item 1
          </button>
          <button 
            onClick={() => setValue('item-2')}
            className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded"
          >
            Open Item 2
          </button>
          <button 
            onClick={() => setValue('')}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded"
          >
            Close All
          </button>
        </div>
      </div>
    )
  },
}