import type { Meta, StoryObj } from '@storybook/react-vite'

const mockAction = (label: string) => (message: any) => {
  console.log(`${label}:`, message)
}
import { within, userEvent, expect } from '@storybook/test'

import ForgotPassword from '../forgot-password'
import { ThemeProvider } from '@/components/theme'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword.Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A forgot password form that allows users to request password reset instructions via email.',
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
      description: 'Callback function called when reset request is successful',
    },
  },
} satisfies Meta<typeof ForgotPassword.Form>

export default meta

type Story = StoryObj<typeof meta>

// Default compound component usage
export const Default: Story = {
  render: (args) => (
    <ForgotPassword.Form onSuccess={args.onSuccess}>
      <ForgotPassword.Input type="email" />
      <ForgotPassword.Error />
      <ForgotPassword.Success />
      <ForgotPassword.Button>Send Reset Instructions</ForgotPassword.Button>
    </ForgotPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Reset request successful'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check form elements
    const emailField = canvas.getByLabelText(/email/i)
    const submitButton = canvas.getByRole('button', { name: /send reset instructions/i })

    await expect(emailField).toBeInTheDocument()
    await expect(submitButton).toBeInTheDocument()

    // Check accessibility
    await expect(emailField).toHaveAttribute('type', 'email')
    await expect(emailField).toHaveAttribute('required')
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: (args) => (
    <ForgotPassword.Form onSuccess={args.onSuccess} className="max-w-sm">
      <ForgotPassword.Input type="email" placeholder="Enter your work email" className="mb-2" />
      <ForgotPassword.Button variant="secondary" className="w-full">
        Reset My Password
      </ForgotPassword.Button>
    </ForgotPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Reset request successful'),
  },
}

// With render props for dynamic state handling
export const WithRenderProps: Story = {
  render: (args) => (
    <ForgotPassword.Form onSuccess={args.onSuccess}>
      {({ isPending, error, success, message }) => (
        <>
          <ForgotPassword.Input type="email" error={error} />

          {error && <ForgotPassword.Error>{error}</ForgotPassword.Error>}
          {success && message && <ForgotPassword.Success>{message}</ForgotPassword.Success>}

          <ForgotPassword.Button loading={isPending}>
            {isPending ? 'Sending...' : 'Send Reset Instructions'}
          </ForgotPassword.Button>
        </>
      )}
    </ForgotPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Reset request successful'),
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
    <ForgotPassword.Form onSuccess={args.onSuccess}>
      <ForgotPassword.Input type="email" />
      <ForgotPassword.Error />
      <ForgotPassword.Button>Send Reset Instructions</ForgotPassword.Button>
    </ForgotPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Reset request successful'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const submitButton = canvas.getByRole('button', { name: /send reset instructions/i })
    await userEvent.click(submitButton)
  },
}

// Accessibility story
export const Accessibility: Story = {
  render: (args) => (
    <ForgotPassword.Form onSuccess={args.onSuccess}>
      <ForgotPassword.Input type="email" />
      <ForgotPassword.Button>Send Reset Instructions</ForgotPassword.Button>
    </ForgotPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Reset request successful'),
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
    const submitButton = canvas.getByRole('button', { name: /send reset instructions/i })
    await expect(submitButton).toHaveFocus()
  },
}
