import type { Meta, StoryObj } from '@storybook/react-vite'

import Header from './Header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'accent'],
    },
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: undefined,
  },
  render: (args) => (
    <Header {...args}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Brand</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </nav>
    </Header>
  ),
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: undefined,
  },
  render: (args) => (
    <Header {...args}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Minimal Brand</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#" className="text-muted-foreground hover:text-foreground">
          Home
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground">
          About
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground">
          Contact
        </a>
      </nav>
    </Header>
  ),
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: undefined,
  },
  render: (args) => (
    <Header {...args}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Accent Brand</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#" className="opacity-90 hover:underline hover:opacity-100">
          Home
        </a>
        <a href="#" className="opacity-90 hover:underline hover:opacity-100">
          About
        </a>
        <a href="#" className="opacity-90 hover:underline hover:opacity-100">
          Contact
        </a>
      </nav>
    </Header>
  ),
}

export const WithLogo: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <Header {...args}>
      <div className="flex items-center space-x-4">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded">
          <span className="text-primary-foreground text-sm font-bold">L</span>
        </div>
        <h1 className="text-xl font-bold">Logo Brand</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#" className="hover:underline">
          Products
        </a>
        <a href="#" className="hover:underline">
          Solutions
        </a>
        <a href="#" className="hover:underline">
          Pricing
        </a>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">
          Sign In
        </button>
      </nav>
    </Header>
  ),
}

export const WithSearch: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <Header {...args}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Search Brand</h1>
      </div>
      <div className="mx-8 flex max-w-md flex-1 items-center">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search..."
            className="border-border focus:ring-primary w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="text-muted-foreground h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <nav className="flex items-center space-x-4">
        <button className="hover:bg-muted rounded-md p-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5-5-5h5zm0-14h5l-5-5-5 5h5z"
            />
          </svg>
        </button>
        <button className="hover:bg-muted rounded-md p-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </nav>
    </Header>
  ),
}

export const MobileResponsive: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <Header {...args}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Responsive</h1>
      </div>
      <nav className="hidden items-center space-x-6 md:flex">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Services
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </nav>
      <button className="hover:bg-muted rounded-md p-2 md:hidden">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </Header>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows desktop navigation on larger screens and a hamburger menu on mobile devices.',
      },
    },
  },
}

export const WithCustomStyling: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <Header {...args} className="py-6">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <span className="text-lg font-bold text-white">C</span>
        </div>
        <div>
          <h1 className="text-xl font-bold">Custom Brand</h1>
          <p className="text-muted-foreground text-xs">Tagline here</p>
        </div>
      </div>
      <nav className="flex items-center space-x-8">
        <a href="#" className="group relative">
          <span className="hover:text-primary transition-colors">Home</span>
          <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="group relative">
          <span className="hover:text-primary transition-colors">About</span>
          <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"></span>
        </a>
        <a href="#" className="group relative">
          <span className="hover:text-primary transition-colors">Contact</span>
          <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"></span>
        </a>
      </nav>
    </Header>
  ),
}
