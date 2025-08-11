import type { Meta, StoryObj } from '@storybook/react-vite'

const mockAction = (label: string) => (user: any) => {
  console.log(`${label}:`, user)
}
import { within, userEvent, expect } from '@storybook/test'

import SignIn from '../sign-in'
import { ThemeProvider } from '@/components/theme'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn.Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modern sign-in form using React 19 form actions with built-in loading states, error handling, and accessibility features.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onSuccess: {
      action: 'onSuccess',
      description: 'Callback function called when login is successful',
    },
  },
} satisfies Meta<typeof SignIn.Form>

export default meta

type Story = StoryObj<typeof meta>

// Default compound component usage
export const Default: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      <SignIn.Input type="email" />
      <SignIn.Input type="password" />
      <SignIn.Error />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check form elements
    const emailField = canvas.getByLabelText(/email/i)
    const passwordField = canvas.getByLabelText(/password/i)
    const submitButton = canvas.getByRole('button', { name: /sign in/i })

    await expect(emailField).toBeInTheDocument()
    await expect(passwordField).toBeInTheDocument()
    await expect(submitButton).toBeInTheDocument()

    // Check accessibility
    await expect(emailField).toHaveAttribute('type', 'email')
    await expect(passwordField).toHaveAttribute('type', 'password')
    await expect(emailField).toHaveAttribute('required')
    await expect(passwordField).toHaveAttribute('required')
  },
}

// Different input types
export const WithUsername: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      <SignIn.Input type="username" />
      <SignIn.Input type="password" />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use type="username" for username-based authentication.',
      },
    },
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess} className="max-w-sm">
      <SignIn.Input type="email" placeholder="Your work email" className="mb-2" />
      <SignIn.Input type="password" placeholder="Your secure password" className="mb-4" />
      <SignIn.Button variant="secondary" className="w-full">
        Access Dashboard
      </SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
}

// With render props for dynamic error handling
export const WithRenderProps: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      {({ isPending, error }) => (
        <>
          <SignIn.Input type="email" error={error?.includes('email') ? error : undefined} />
          <SignIn.Input type="password" error={error?.includes('password') ? error : undefined} />

          {error && !error.includes('email') && !error.includes('password') && (
            <SignIn.Error>{error}</SignIn.Error>
          )}

          <SignIn.Button loading={isPending}>
            {isPending ? 'Authenticating...' : 'Sign In'}
          </SignIn.Button>
        </>
      )}
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use render props to access form state for advanced customization.',
      },
    },
  },
}

// Story with validation errors
export const ValidationErrors: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      <SignIn.Input type="email" />
      <SignIn.Input type="password" />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const submitButton = canvas.getByRole('button', { name: /sign in/i })
    await userEvent.click(submitButton)
  },
}

export const WithCustomEndpoint: Story = {
  render: (args) => (
    <SignIn.Form endpoint="/api/custom-auth" onSuccess={args.onSuccess}>
      <SignIn.Input type="email" />
      <SignIn.Input type="password" />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Custom endpoint login successful'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the endpoint prop to specify a custom authentication endpoint.',
      },
    },
  },
}

export const Interactive: Story = {
  render: (args) => (
    <div className="space-y-4">
      <div className="border-border rounded-lg border p-4">
        <h3 className="text-foreground mb-2 font-semibold">Test Credentials</h3>
        <div className="text-muted-foreground space-y-1 text-sm">
          <p>• Valid: test@example.com / password123</p>
          <p>• Invalid email: notanemail</p>
          <p>• Short password: 123</p>
        </div>
      </div>
      <SignIn.Form onSuccess={args.onSuccess}>
        <SignIn.Input type="email" />
        <SignIn.Input type="password" />
        <SignIn.Button>Sign In</SignIn.Button>
      </SignIn.Form>
    </div>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive form for testing. Try entering different email/password combinations.',
      },
    },
  },
}

export const DarkTheme: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      <SignIn.Input type="email" />
      <SignIn.Input type="password" />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <div className="bg-background min-h-screen p-8">
          <div className="mx-auto w-full max-w-md">
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'The form automatically adapts to dark theme using the design system.',
      },
    },
  },
}

// Loading state story
export const LoadingState: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      <SignIn.Input type="email" />
      <SignIn.Input type="password" />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailField = canvas.getByLabelText(/email/i)
    const passwordField = canvas.getByLabelText(/password/i)

    await userEvent.type(emailField, 'test@example.com')
    await userEvent.type(passwordField, 'password123')

    const submitButton = canvas.getByRole('button', { name: /sign in/i })
    await userEvent.click(submitButton)

    await expect(canvas.getByText(/signing in/i)).toBeInTheDocument()
  },
}

// Accessibility story
export const Accessibility: Story = {
  render: (args) => (
    <SignIn.Form onSuccess={args.onSuccess}>
      <SignIn.Input type="email" />
      <SignIn.Input type="password" />
      <SignIn.Button>Sign In</SignIn.Button>
    </SignIn.Form>
  ),
  args: {
    onSuccess: mockAction('Login successful'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates the accessibility features of the form, including proper labeling, ARIA attributes, and keyboard navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const emailField = canvas.getByLabelText(/email/i)
    emailField.focus()

    await userEvent.tab()
    const passwordField = canvas.getByLabelText(/password/i)
    await expect(passwordField).toHaveFocus()

    await userEvent.tab()
    const submitButton = canvas.getByRole('button', { name: /sign in/i })
    await expect(submitButton).toHaveFocus()
  },
}
