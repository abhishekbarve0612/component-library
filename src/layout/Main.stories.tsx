import type { Meta, StoryObj } from '@storybook/react-vite'

import Main from './Main'

const meta = {
  title: 'Layout/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Main>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <header className="bg-background border-border border-b py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">Site Header</h1>
        </div>
      </header>
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Welcome to Main Content</h1>
          <p className="text-muted-foreground">
            This is the main content area of the page. The Main component provides consistent
            spacing and container width for your primary content.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border-border rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Card 1</h3>
              <p className="text-muted-foreground text-sm">Some content here</p>
            </div>
            <div className="border-border rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Card 2</h3>
              <p className="text-muted-foreground text-sm">Some content here</p>
            </div>
            <div className="border-border rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Card 3</h3>
              <p className="text-muted-foreground text-sm">Some content here</p>
            </div>
          </div>
        </div>
      </Main>
      <footer className="bg-muted border-border border-t py-6">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-center text-sm">Site Footer</p>
        </div>
      </footer>
    </div>
  ),
  args: {
    children: undefined,
  },
}

export const WithCustomStyling: Story = {
  render: () => (
    <Main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Custom Styled Main
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            This example shows how you can customize the Main component with additional classes
            while maintaining its core container behavior.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-colors">
            Get Started
          </button>
          <button className="border-border hover:bg-muted rounded-lg border px-6 py-3 font-medium transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </Main>
  ),
  args: {
    children: undefined,
  },
}

export const BlogPost: Story = {
  render: () => (
    <Main>
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Understanding Layout Components</h1>
          <div className="text-muted-foreground flex items-center justify-center space-x-4 text-sm">
            <span>Published on March 15, 2024</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>
            Layout components are essential building blocks for creating consistent and
            well-structured web applications. The Main component serves as a semantic wrapper for
            your primary content.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>Semantic HTML5 main element</li>
            <li>Consistent container width and padding</li>
            <li>Responsive design out of the box</li>
            <li>Easy customization with className prop</li>
          </ul>

          <h2>Usage Examples</h2>
          <p>
            The Main component is designed to be flexible and work well with other layout components
            like Header, Footer, and Section.
          </p>

          <blockquote>
            "Good layout components should be invisible to users but essential to developers."
          </blockquote>

          <p>
            By using semantic HTML elements, we improve accessibility and SEO while maintaining
            clean, maintainable code.
          </p>
        </div>

        <footer className="border-border border-t pt-8">
          <div className="flex items-center space-x-4">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
              <span className="text-primary-foreground font-semibold">JD</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground text-sm">Frontend Developer</p>
            </div>
          </div>
        </footer>
      </article>
    </Main>
  ),
  args: {
    children: undefined,
  },
}

export const Dashboard: Story = {
  render: () => (
    <Main>
      <div className="space-y-8">
        <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card border-border rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-muted-foreground text-sm font-medium">Total Users</h3>
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-muted-foreground text-xs">+12% from last month</p>
            </div>
          </div>

          <div className="bg-card border-border rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-muted-foreground text-sm font-medium">Revenue</h3>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-muted-foreground text-xs">+8% from last month</p>
            </div>
          </div>

          <div className="bg-card border-border rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-muted-foreground text-sm font-medium">Orders</h3>
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-muted-foreground text-xs">+23% from last month</p>
            </div>
          </div>

          <div className="bg-card border-border rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-muted-foreground text-sm font-medium">Active Users</h3>
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">573</div>
              <p className="text-muted-foreground text-xs">+3% from last hour</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border-border flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <span className="text-xs font-medium">{i}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Activity {i}</p>
                    <p className="text-muted-foreground text-sm">Description of activity</p>
                  </div>
                  <span className="text-muted-foreground text-xs">2h ago</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="border-border hover:bg-muted rounded-lg border p-6 text-left transition-colors">
                <div className="space-y-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded">
                    <span className="text-primary text-xs">+</span>
                  </div>
                  <h3 className="font-medium">Create Project</h3>
                  <p className="text-muted-foreground text-sm">Start a new project</p>
                </div>
              </button>
              <button className="border-border hover:bg-muted rounded-lg border p-6 text-left transition-colors">
                <div className="space-y-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded">
                    <span className="text-primary text-xs">⚙</span>
                  </div>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-muted-foreground text-sm">Manage preferences</p>
                </div>
              </button>
              <button className="border-border hover:bg-muted rounded-lg border p-6 text-left transition-colors">
                <div className="space-y-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded">
                    <span className="text-primary text-xs">📊</span>
                  </div>
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-muted-foreground text-sm">View reports</p>
                </div>
              </button>
              <button className="border-border hover:bg-muted rounded-lg border p-6 text-left transition-colors">
                <div className="space-y-2">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded">
                    <span className="text-primary text-xs">👥</span>
                  </div>
                  <h3 className="font-medium">Team</h3>
                  <p className="text-muted-foreground text-sm">Manage team members</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  ),
  args: {
    children: undefined,
  },
}

export const MinimalContent: Story = {
  render: () => (
    <Main>
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Simple Content</h1>
          <p className="text-muted-foreground">
            Sometimes less is more. The Main component works well with minimal content too.
          </p>
        </div>
      </div>
    </Main>
  ),
  args: {
    children: undefined,
  },
}
