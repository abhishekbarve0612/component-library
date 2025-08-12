import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from '@storybook/test'

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
      <header className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">Site Header</h1>
        </div>
      </header>
      <Main>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Welcome to Main Content</h1>
          <p className="text-muted-foreground">
            This is the main content area of the page. The Main component provides 
            consistent spacing and container width for your primary content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Card 1</h3>
              <p className="text-sm text-muted-foreground">Some content here</p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Card 2</h3>
              <p className="text-sm text-muted-foreground">Some content here</p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Card 3</h3>
              <p className="text-sm text-muted-foreground">Some content here</p>
            </div>
          </div>
        </div>
      </Main>
      <footer className="bg-muted border-t border-border py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">Site Footer</p>
        </div>
      </footer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that the main has proper semantic markup
    const main = canvas.getByRole('main')
    await expect(main).toBeInTheDocument()
    
    // Check for main heading
    const heading = canvas.getByRole('heading', { name: /welcome to main content/i })
    await expect(heading).toBeInTheDocument()
  },
}

export const WithCustomStyling: Story = {
  render: () => (
    <Main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Custom Styled Main
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This example shows how you can customize the Main component with additional 
            classes while maintaining its core container behavior.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          <button className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </Main>
  ),
}

export const BlogPost: Story = {
  render: () => (
    <Main>
      <article className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Understanding Layout Components</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span>Published on March 15, 2024</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>
        
        <div className="prose prose-gray max-w-none">
          <p>
            Layout components are essential building blocks for creating consistent 
            and well-structured web applications. The Main component serves as a 
            semantic wrapper for your primary content.
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
            The Main component is designed to be flexible and work well with other 
            layout components like Header, Footer, and Section.
          </p>
          
          <blockquote>
            "Good layout components should be invisible to users but essential to developers."
          </blockquote>
          
          <p>
            By using semantic HTML elements, we improve accessibility and SEO while 
            maintaining clean, maintainable code.
          </p>
        </div>
        
        <footer className="pt-8 border-t border-border">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">JD</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Frontend Developer</p>
            </div>
          </div>
        </footer>
      </article>
    </Main>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <Main>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
            New Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Total Users</h3>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </div>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </div>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Orders</h3>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </div>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+3% from last hour</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{i}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Activity {i}</p>
                    <p className="text-sm text-muted-foreground">Description of activity</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-6 text-left border border-border rounded-lg hover:bg-muted transition-colors">
                <div className="space-y-2">
                  <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary text-xs">+</span>
                  </div>
                  <h3 className="font-medium">Create Project</h3>
                  <p className="text-sm text-muted-foreground">Start a new project</p>
                </div>
              </button>
              <button className="p-6 text-left border border-border rounded-lg hover:bg-muted transition-colors">
                <div className="space-y-2">
                  <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary text-xs">⚙</span>
                  </div>
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage preferences</p>
                </div>
              </button>
              <button className="p-6 text-left border border-border rounded-lg hover:bg-muted transition-colors">
                <div className="space-y-2">
                  <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary text-xs">📊</span>
                  </div>
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View reports</p>
                </div>
              </button>
              <button className="p-6 text-left border border-border rounded-lg hover:bg-muted transition-colors">
                <div className="space-y-2">
                  <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-primary text-xs">👥</span>
                  </div>
                  <h3 className="font-medium">Team</h3>
                  <p className="text-sm text-muted-foreground">Manage team members</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  ),
}

export const MinimalContent: Story = {
  render: () => (
    <Main>
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Simple Content</h1>
          <p className="text-muted-foreground">
            Sometimes less is more. The Main component works well with minimal content too.
          </p>
        </div>
      </div>
    </Main>
  ),
}