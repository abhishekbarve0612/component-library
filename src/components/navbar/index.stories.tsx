import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within, userEvent } from '@storybook/test'

import Navbar from './index'
import { HiHome, HiUser, HiCog, HiLogout, HiSearch } from 'react-icons/hi'
import Button from '../button'

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A clean, spacious horizontal navigation component with mobile responsiveness. Uses composition pattern for maximum flexibility.',
      },
    },
  },
  argTypes: {
    breakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Mobile breakpoint for collapsible navbar',
      defaultValue: 'md',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable mobile hamburger menu',
      defaultValue: false,
    },
    fixed: {
      control: 'boolean',
      description: 'Fixed positioning',
      defaultValue: false,
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

// Mock Link component for examples
function MockLink({
  href,
  children,
  className,
  ...props
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
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

// Basic navbar
export const Basic: Story = {
  args: {
    collapsible: false,
    bordered: true,
  },
  render: (args) => (
    <Navbar {...args}>
      <Navbar.Brand>
        <span className="text-blue-600">MyApp</span>
      </Navbar.Brand>

      <Navbar.Group align="left">
        <Navbar.Item active>
          <MockLink href="/">Home</MockLink>
        </Navbar.Item>
        <Navbar.Item>
          <MockLink href="/about">About</MockLink>
        </Navbar.Item>
        <Navbar.Item>
          <MockLink href="/services">Services</MockLink>
        </Navbar.Item>
      </Navbar.Group>

      <Navbar.Group align="right">
        <Navbar.Item>
          <MockLink href="/contact">Contact</MockLink>
        </Navbar.Item>
        <Navbar.Item>
          <Button size="sm">Sign In</Button>
        </Navbar.Item>
      </Navbar.Group>
    </Navbar>
  ),
}

// Mobile responsive navbar
export const Responsive: Story = {
  args: {
    collapsible: true,
    breakpoint: 'md',
  },
  render: (args) => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar {...args}>
        <Navbar.Brand>
          <HiHome className="mr-2 h-6 w-6 text-blue-600" />
          <span className="font-bold text-blue-600">Dashboard</span>
        </Navbar.Brand>

        <Navbar.Group align="left">
          <Navbar.Item active>
            <MockLink href="/dashboard">
              <HiHome className="mr-2 h-4 w-4" />
              Dashboard
            </MockLink>
          </Navbar.Item>
          <Navbar.Item>
            <MockLink href="/users">
              <HiUser className="mr-2 h-4 w-4" />
              Users
            </MockLink>
          </Navbar.Item>
          <Navbar.Item>
            <MockLink href="/settings">
              <HiCog className="mr-2 h-4 w-4" />
              Settings
            </MockLink>
          </Navbar.Item>
        </Navbar.Group>

        <Navbar.Group align="right">
          <Navbar.Item>
            <Button variant="outline" size="sm">
              <HiSearch className="mr-2 h-4 w-4" />
              Search
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button variant="ghost" size="sm">
              <HiLogout className="h-4 w-4" />
            </Button>
          </Navbar.Item>
        </Navbar.Group>
      </Navbar>

      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Main Content</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Resize the window to see the mobile hamburger menu in action. On smaller screens, the
          navigation will collapse into a hamburger menu.
        </p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const navbar = canvas.getByRole('navigation')

    // Check accessibility attributes
    await expect(navbar).toHaveAttribute('aria-label', 'Main navigation')

    // Check if brand is visible
    const brand = canvas.getByText('Dashboard')
    await expect(brand).toBeInTheDocument()
  },
}

// Different alignment options
export const AlignmentOptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          Left Aligned (Default)
        </h3>
        <Navbar>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Group align="left">
            <Navbar.Item active>
              <MockLink href="/">Home</MockLink>
            </Navbar.Item>
            <Navbar.Item>
              <MockLink href="/about">About</MockLink>
            </Navbar.Item>
          </Navbar.Group>
        </Navbar>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          Center Aligned
        </h3>
        <Navbar>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Group align="center">
            <Navbar.Item active>
              <MockLink href="/">Home</MockLink>
            </Navbar.Item>
            <Navbar.Item>
              <MockLink href="/about">About</MockLink>
            </Navbar.Item>
            <Navbar.Item>
              <MockLink href="/services">Services</MockLink>
            </Navbar.Item>
          </Navbar.Group>
        </Navbar>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          Right Aligned
        </h3>
        <Navbar>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Group align="right">
            <Navbar.Item>
              <MockLink href="/login">Login</MockLink>
            </Navbar.Item>
            <Navbar.Item>
              <Button size="sm">Sign Up</Button>
            </Navbar.Item>
          </Navbar.Group>
        </Navbar>
      </div>
    </div>
  ),
}

// Fixed navbar
export const Fixed: Story = {
  args: {
    fixed: true,
  },
  render: (args) => (
    <div className="min-h-[200vh]">
      <Navbar {...args}>
        <Navbar.Brand>Fixed Navbar</Navbar.Brand>
        <Navbar.Group>
          <Navbar.Item active>
            <MockLink href="/">Home</MockLink>
          </Navbar.Item>
          <Navbar.Item>
            <MockLink href="/about">About</MockLink>
          </Navbar.Item>
        </Navbar.Group>
      </Navbar>

      <div className="p-6 pt-16">
        <h1 className="mb-4 text-2xl font-bold">Fixed Navigation</h1>
        <p className="mb-4">Scroll down to see the navbar stay fixed at the top.</p>

        {Array.from({ length: 50 }, (_, i) => (
          <p key={i} className="mb-4 text-slate-600 dark:text-slate-400">
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  ),
}

// Composition with different components
export const CompositionExamples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          With Buttons
        </h3>
        <Navbar>
          <Navbar.Brand>App Name</Navbar.Brand>
          <Navbar.Group align="right">
            <Navbar.Item>
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Navbar.Item>
            <Navbar.Item>
              <Button size="sm">Sign Up</Button>
            </Navbar.Item>
          </Navbar.Group>
        </Navbar>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          With Search Input
        </h3>
        <Navbar>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Group align="center">
            <Navbar.Item>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-800"
                />
                <Button size="sm" className="ml-2">
                  <HiSearch className="h-4 w-4" />
                </Button>
              </div>
            </Navbar.Item>
          </Navbar.Group>
          <Navbar.Group align="right">
            <Navbar.Item>
              <Button variant="ghost" size="sm">
                Profile
              </Button>
            </Navbar.Item>
          </Navbar.Group>
        </Navbar>
      </div>
    </div>
  ),
}

// Interactive playground
export const Interactive: Story = {
  args: {
    collapsible: true,
    breakpoint: 'lg',
    fixed: false,
    bordered: true,
  },
  render: (args) => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar {...args}>
        <Navbar.Brand>
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            Interactive Demo
          </div>
        </Navbar.Brand>

        <Navbar.Group align="left">
          <Navbar.Item active>
            <MockLink href="/">Home</MockLink>
          </Navbar.Item>
          <Navbar.Item>
            <MockLink href="/features">Features</MockLink>
          </Navbar.Item>
          <Navbar.Item>
            <MockLink href="/pricing">Pricing</MockLink>
          </Navbar.Item>
          <Navbar.Item>
            <MockLink href="/docs">Documentation</MockLink>
          </Navbar.Item>
        </Navbar.Group>

        <Navbar.Group align="right">
          <Navbar.Item>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button size="sm">Get Started</Button>
          </Navbar.Item>
        </Navbar.Group>
      </Navbar>

      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Clean & Spacious Navbar
          </h1>
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold">Simple & Flexible Features:</h2>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                ✅ <strong>Composition pattern</strong> - wrap any component in Navbar.Item
              </li>
              <li>
                ✅ <strong>Responsive design</strong> with clean mobile hamburger menu
              </li>
              <li>
                ✅ <strong>Generous spacing</strong> for modern, breathable design
              </li>
              <li>
                ✅ <strong>Accessibility first</strong> with proper ARIA attributes
              </li>
              <li>
                ✅ <strong>Dark mode support</strong> throughout
              </li>
              <li>
                ✅ <strong>Smooth animations</strong> powered by GSAP
              </li>
              <li>
                ✅ <strong>Framework agnostic</strong> - works with any routing solution
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Only run interaction tests on desktop-sized screens
    if (window.innerWidth < 1024) return

    const canvas = within(canvasElement)
    const navbar = canvas.getByRole('navigation')

    // Test accessibility
    await expect(navbar).toHaveAttribute('role', 'navigation')
    await expect(navbar).toHaveAttribute('aria-label', 'Main navigation')

    // Test navigation items
    const homeLink = canvas.getByText('Home')
    await expect(homeLink).toBeInTheDocument()

    const featuresLink = canvas.getByText('Features')
    await userEvent.click(featuresLink)
  },
}
