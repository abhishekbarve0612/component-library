import type { Meta, StoryObj } from '@storybook/react-vite'

import Footer from './Footer'

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'accent'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-4">
          <p className="text-muted-foreground">© 2024 Company Name. All rights reserved.</p>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>
    </Footer>
  ),
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="text-center">
        <p className="text-muted-foreground">© 2024 Brand</p>
      </div>
    </Footer>
  ),
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 font-semibold">Company</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <a href="#" className="hover:text-foreground">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Products</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <a href="#" className="hover:text-foreground">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                API
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Support</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <a href="#" className="hover:text-foreground">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Status
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Connect</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <a href="#" className="hover:text-foreground">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
        <p>© 2024 Company Name. All rights reserved.</p>
      </div>
    </Footer>
  ),
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="text-center">
        <p className="text-muted-foreground">Made with ❤️ by the team</p>
      </div>
    </Footer>
  ),
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div>
          <h3 className="text-lg font-bold">Brand Name</h3>
          <p className="opacity-90">Building the future, today.</p>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="opacity-90 hover:opacity-100">
            About
          </a>
          <a href="#" className="opacity-90 hover:opacity-100">
            Contact
          </a>
          <a href="#" className="opacity-90 hover:opacity-100">
            Support
          </a>
        </nav>
      </div>
    </Footer>
  ),
}

export const WithSocialLinks: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
        <div>
          <h3 className="text-lg font-bold">Brand</h3>
          <p className="text-muted-foreground">Connect with us online</p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="hover:bg-muted rounded-md p-2 transition-colors"
            aria-label="Twitter"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:bg-muted rounded-md p-2 transition-colors"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:bg-muted rounded-md p-2 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="border-border text-muted-foreground mt-6 border-t pt-6 text-center">
        <p>© 2024 Brand Name. All rights reserved.</p>
      </div>
    </Footer>
  ),
}

export const Newsletter: Story = {
  args: {
    size: 'lg',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xl font-bold">Stay Updated</h3>
          <p className="text-muted-foreground">
            Get the latest news and updates delivered to your inbox.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="border-border focus:ring-primary flex-1 rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
          />
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
      <div className="border-border text-muted-foreground mt-8 border-t pt-6 text-center">
        <p>© 2024 Company. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </Footer>
  ),
}

export const MultiColumn: Story = {
  args: {
    size: 'lg',
    children: undefined,
  },
  render: (args) => (
    <Footer {...args}>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
        <div className="col-span-2">
          <div className="mb-4 flex items-center space-x-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded">
              <span className="text-primary-foreground text-sm font-bold">B</span>
            </div>
            <h3 className="text-lg font-bold">Brand</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Building amazing products that help businesses grow and succeed in the digital world.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Product</h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-foreground">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Reviews
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Updates
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Company</h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-foreground">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Press
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Resources</h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-foreground">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Guides
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                API
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Legal</h4>
          <ul className="text-muted-foreground space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Licenses
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-border mt-12 flex flex-col items-center justify-between space-y-4 border-t pt-8 md:flex-row md:space-y-0">
        <p className="text-muted-foreground text-sm">© 2024 Brand Name. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <select className="text-muted-foreground border-border rounded border bg-transparent px-2 py-1 text-sm">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
        </div>
      </div>
    </Footer>
  ),
}
