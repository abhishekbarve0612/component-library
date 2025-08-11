import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within, userEvent } from '@storybook/test'
import { useState } from 'react'
import { HiHome, HiUser, HiCog, HiLogout, HiSearch, HiMenu, HiBell } from 'react-icons/hi'

import Sidebar from './index'
import Button from '../button'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A slide-out sidebar component with smooth GSAP animations, focus management, and accessibility features. Perfect for navigation menus and contextual content.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls sidebar visibility',
      defaultValue: false,
    },
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Side of the screen where sidebar appears',
      defaultValue: 'left',
    },
    overlayClassName: {
      control: 'text',
      description: 'Additional CSS classes for the overlay',
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

// Mock Link component for examples
function MockLink({ href, children, className, ...props }: any) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        console.log(`Navigate to: ${href}`)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

// Wrapper component for interactive stories
function SidebarWrapper({ side = 'left', children }: { side?: 'left' | 'right'; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sidebar Demo - {side === 'left' ? 'Left' : 'Right'} Side
        </h1>
        <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
          <HiMenu className="h-4 w-4" />
          Open Sidebar
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
        <p className="text-slate-600 dark:text-slate-400">
          Click the "Open Sidebar" button to see the sidebar slide in from the {side} side. 
          The sidebar includes focus trapping, keyboard navigation, and smooth GSAP animations.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
          <li>• Press <kbd className="rounded bg-slate-100 px-1 dark:bg-slate-700">Escape</kbd> to close</li>
          <li>• Use <kbd className="rounded bg-slate-100 px-1 dark:bg-slate-700">Tab</kbd> to navigate</li>
          <li>• Click overlay to close</li>
          <li>• Focus is trapped within the sidebar</li>
        </ul>
      </div>

      <Sidebar open={isOpen} onClose={() => setIsOpen(false)} side={side}>
        {children}
      </Sidebar>
    </div>
  )
}

// Basic sidebar story
export const Basic: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar.Header>Navigation</Sidebar.Header>
      <Sidebar.Body>
        <Sidebar.Item active>
          <HiHome className="mr-3 h-4 w-4" />
          Home
        </Sidebar.Item>
        <Sidebar.Item>
          <HiUser className="mr-3 h-4 w-4" />
          Profile
        </Sidebar.Item>
        <Sidebar.Item>
          <HiCog className="mr-3 h-4 w-4" />
          Settings
        </Sidebar.Item>
        <Sidebar.Item disabled>
          <HiBell className="mr-3 h-4 w-4" />
          Notifications (Soon)
        </Sidebar.Item>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Sidebar.Item>
          <HiLogout className="mr-3 h-4 w-4" />
          Sign Out
        </Sidebar.Item>
      </Sidebar.Footer>
    </SidebarWrapper>
  ),
}

// Right side sidebar
export const RightSide: Story = {
  render: () => (
    <SidebarWrapper side="right">
      <Sidebar.Header>Quick Actions</Sidebar.Header>
      <Sidebar.Body>
        <Sidebar.Item>
          <HiSearch className="mr-3 h-4 w-4" />
          Search
        </Sidebar.Item>
        <Sidebar.Item active>
          <HiBell className="mr-3 h-4 w-4" />
          Notifications
        </Sidebar.Item>
        <Sidebar.Item>
          <HiUser className="mr-3 h-4 w-4" />
          User Profile
        </Sidebar.Item>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Button variant="outline" size="sm" className="w-full">
          Close Panel
        </Button>
      </Sidebar.Footer>
    </SidebarWrapper>
  ),
}

// Navigation sidebar with links
export const NavigationSidebar: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar.Header>
        <div className="flex items-center">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-blue-600">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          Admin Panel
        </div>
      </Sidebar.Header>
      <Sidebar.Body>
        <Sidebar.Item active aria-label="Go to dashboard">
          <MockLink href="/dashboard" className="flex w-full items-center">
            <HiHome className="mr-3 h-4 w-4" />
            Dashboard
          </MockLink>
        </Sidebar.Item>
        <Sidebar.Item aria-label="Manage users">
          <MockLink href="/users" className="flex w-full items-center">
            <HiUser className="mr-3 h-4 w-4" />
            Users
          </MockLink>
        </Sidebar.Item>
        <Sidebar.Item aria-label="View analytics">
          <MockLink href="/analytics" className="flex w-full items-center">
            <HiSearch className="mr-3 h-4 w-4" />
            Analytics
          </MockLink>
        </Sidebar.Item>
        <Sidebar.Item aria-label="Application settings">
          <MockLink href="/settings" className="flex w-full items-center">
            <HiCog className="mr-3 h-4 w-4" />
            Settings
          </MockLink>
        </Sidebar.Item>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Sidebar.Item aria-label="Sign out of application">
          <MockLink href="/logout" className="flex w-full items-center text-red-600 dark:text-red-400">
            <HiLogout className="mr-3 h-4 w-4" />
            Sign Out
          </MockLink>
        </Sidebar.Item>
      </Sidebar.Footer>
    </SidebarWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Find and click the open sidebar button
    const openButton = canvas.getByText('Open Sidebar')
    await userEvent.click(openButton)
    
    // Wait for sidebar to appear
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if sidebar is accessible
    const sidebar = canvas.getByRole('dialog')
    await expect(sidebar).toBeInTheDocument()
    await expect(sidebar).toHaveAttribute('aria-modal', 'true')
    
    // Test keyboard navigation
    await userEvent.keyboard('{Tab}')
    
    // Test escape key
    await userEvent.keyboard('{Escape}')
  },
}

// Contextual sidebar with custom content
export const ContextualSidebar: Story = {
  render: () => (
    <SidebarWrapper side="right">
      <Sidebar.Header>File Details</Sidebar.Header>
      <Sidebar.Body>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
              Document.pdf
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Last modified: 2 hours ago
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Size: 2.4 MB
            </p>
          </div>
          
          <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
            <h5 className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
              Quick Actions
            </h5>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <HiSearch className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <HiUser className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <HiCog className="mr-2 h-4 w-4" />
                Properties
              </Button>
            </div>
          </div>
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Button variant="destructive" size="sm" className="w-full">
          Delete File
        </Button>
      </Sidebar.Footer>
    </SidebarWrapper>
  ),
}

// Minimal sidebar without header/footer
export const MinimalSidebar: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar.Body>
        <div className="p-2">
          <h3 className="mb-4 px-2 text-sm font-medium text-slate-900 dark:text-slate-100">
            Quick Menu
          </h3>
          <Sidebar.Item active>
            <HiHome className="mr-3 h-4 w-4" />
            Home
          </Sidebar.Item>
          <Sidebar.Item>
            <HiUser className="mr-3 h-4 w-4" />
            Profile
          </Sidebar.Item>
          <Sidebar.Item>
            <HiCog className="mr-3 h-4 w-4" />
            Settings
          </Sidebar.Item>
        </div>
      </Sidebar.Body>
    </SidebarWrapper>
  ),
}

// Interactive playground
export const Interactive: Story = {
  render: () => (
    <SidebarWrapper>
      <Sidebar.Header>Interactive Demo</Sidebar.Header>
      <Sidebar.Body>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
              Navigation Items
            </h4>
            <Sidebar.Item active>
              <HiHome className="mr-3 h-4 w-4" />
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item>
              <HiUser className="mr-3 h-4 w-4" />
              Users
            </Sidebar.Item>
            <Sidebar.Item disabled>
              <HiBell className="mr-3 h-4 w-4" />
              Coming Soon
            </Sidebar.Item>
          </div>
          
          <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-slate-100">
              Custom Content
            </h4>
            <div className="space-y-2">
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:focus:border-slate-400"
              />
              <Button size="sm" className="w-full">
                Search
              </Button>
            </div>
          </div>
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Cancel
          </Button>
          <Button size="sm" className="flex-1">
            Save
          </Button>
        </div>
      </Sidebar.Footer>
    </SidebarWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test that the demo content is visible
    const title = canvas.getByText('Interactive Demo')
    await expect(title).toBeInTheDocument()
    
    // Test button functionality
    const openButton = canvas.getByText('Open Sidebar')
    await expect(openButton).toBeInTheDocument()
  },
}