import type { Meta, StoryObj } from '@storybook/react-vite'
import { FiHome, FiChevronRight, FiFolder, FiFile } from 'react-icons/fi'
import Breadcrumb from './index'
import type { LinkProps } from '@components/link'
import type { ComponentType } from 'react'

const mockAction = (action: string) => {
  return (...args: unknown[]) => {
    console.log(action, args)
  }
}

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A breadcrumb component with flexible dividers and optional navigation. Pass a LinkComponent prop to use with routing libraries like Next.js or React Router.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    divider: {
      description: 'Custom divider between breadcrumb items',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    LinkComponent: {
      description: 'Custom Link component for routing (e.g., Next.js Link, React Router Link)',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock Link component for demonstration
const MockLink = ({ href, children, onClick, className }: LinkProps) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault()
      onClick?.(e)
      mockAction('mock-link-click')(href)
    }}
    className={className}
  >
    {children}
  </a>
)

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item onClick={mockAction('home-click')}>Home</Breadcrumb.Item>
      <Breadcrumb.Item onClick={mockAction('products-click')}>Products</Breadcrumb.Item>
      <Breadcrumb.Item onClick={mockAction('laptops-click')}>Laptops</Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage>MacBook Pro</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const WithCustomDivider: Story = {
  render: () => (
    <Breadcrumb divider=">">
      <Breadcrumb.Item onClick={mockAction('home-click')}>Home</Breadcrumb.Item>
      <Breadcrumb.Item onClick={mockAction('docs-click')}>Documentation</Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage>Getting Started</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb divider={<FiChevronRight />}>
      <Breadcrumb.Item onClick={mockAction('home-click')}>
        <div className="flex items-center gap-1">
          <FiHome size={16} />
          Home
        </div>
      </Breadcrumb.Item>
      <Breadcrumb.Item onClick={mockAction('projects-click')}>
        <div className="flex items-center gap-1">
          <FiFolder size={16} />
          Projects
        </div>
      </Breadcrumb.Item>
      <Breadcrumb.Item onClick={mockAction('website-click')}>
        <div className="flex items-center gap-1">
          <FiFolder size={16} />
          Website
        </div>
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage>
        <div className="flex items-center gap-1">
          <FiFile size={16} />
          index.html
        </div>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const WithHrefLinks: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/" onClick={mockAction('home-click')}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/products" onClick={mockAction('products-click')}>
        Products
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/products/electronics" onClick={mockAction('electronics-click')}>
        Electronics
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage>Smartphones</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const WithCustomLinkComponent: Story = {
  render: () => (
    <Breadcrumb LinkComponent={MockLink as unknown as ComponentType<Partial<LinkProps>>}>
      <Breadcrumb.Item href="/" onClick={mockAction('home-click')}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/products" onClick={mockAction('products-click')}>
        Products
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/products/electronics" onClick={mockAction('electronics-click')}>
        Electronics
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage>Smartphones</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item onClick={mockAction('home-click')}>Home</Breadcrumb.Item>
      <Breadcrumb.Item disabled>Private Section</Breadcrumb.Item>
      <Breadcrumb.Item onClick={mockAction('settings-click')}>Settings</Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage>Profile</Breadcrumb.Item>
    </Breadcrumb>
  ),
}

export const LongBreadcrumb: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Breadcrumb>
        <Breadcrumb.Item onClick={mockAction('home-click')}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={mockAction('company-click')}>Company Portal</Breadcrumb.Item>
        <Breadcrumb.Item onClick={mockAction('departments-click')}>Departments</Breadcrumb.Item>
        <Breadcrumb.Item onClick={mockAction('engineering-click')}>Engineering</Breadcrumb.Item>
        <Breadcrumb.Item onClick={mockAction('frontend-click')}>Frontend Team</Breadcrumb.Item>
        <Breadcrumb.Item onClick={mockAction('projects-click')}>Projects</Breadcrumb.Item>
        <Breadcrumb.Item isCurrentPage>Component Library</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <Breadcrumb className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800" divider="•">
      <Breadcrumb.Item
        onClick={mockAction('dashboard-click')}
        className="text-blue-600 dark:text-blue-400"
      >
        Dashboard
      </Breadcrumb.Item>
      <Breadcrumb.Item
        onClick={mockAction('analytics-click')}
        className="text-green-600 dark:text-green-400"
      >
        Analytics
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrentPage className="font-bold text-purple-600 dark:text-purple-400">
        Reports
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
}
