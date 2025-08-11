import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, userEvent, expect } from '@storybook/test'

import SignIn from '../sign-in'
import { ThemeProvider } from '@/components/theme'
import { userMockAction } from './utils'

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
    onSuccess: userMockAction('Login successful'),
    children: undefined,
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
    onSuccess: userMockAction('Login successful'),
    children: undefined,
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
    onSuccess: userMockAction('Login successful'),
    children: undefined,
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
    onSuccess: userMockAction('Login successful'),
    children: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const submitButton = canvas.getByRole('button', { name: /sign in/i })
    await userEvent.click(submitButton)
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
    onSuccess: userMockAction('Login successful'),
    children: undefined,
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
