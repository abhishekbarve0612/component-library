import type { Meta, StoryObj } from '@storybook/react-vite'
import { mockAction } from './utils'

import { within, userEvent, expect } from '@storybook/test'

import ResetPassword from '../reset-password'
import { ThemeProvider } from '@/components/theme'

const meta = {
  title: 'Auth/ResetPassword',
  component: ResetPassword.Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reset password form that allows users to set a new password using a reset token.',
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
      description: 'Callback function called when password reset is successful',
    },
    token: {
      control: 'text',
      description: 'Reset token from email link',
    },
  },
} satisfies Meta<typeof ResetPassword.Form>

export default meta

type Story = StoryObj<typeof meta>

// Default compound component usage
export const Default: Story = {
  render: (args) => (
    <ResetPassword.Form onSuccess={args.onSuccess} token={args.token}>
      <ResetPassword.Input type="password" />
      <ResetPassword.Input type="confirmPassword" />
      <ResetPassword.Error />
      <ResetPassword.Success />
      <ResetPassword.Button>Reset Password</ResetPassword.Button>
    </ResetPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Password reset successful'),
    token: 'sample-reset-token-123',
    children: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Check form elements
    const passwordField = canvas.getByLabelText(/new password/i)
    const confirmPasswordField = canvas.getByLabelText(/confirm new password/i)
    const submitButton = canvas.getByRole('button', { name: /reset password/i })

    await expect(passwordField).toBeInTheDocument()
    await expect(confirmPasswordField).toBeInTheDocument()
    await expect(submitButton).toBeInTheDocument()

    // Check accessibility
    await expect(passwordField).toHaveAttribute('type', 'password')
    await expect(confirmPasswordField).toHaveAttribute('type', 'password')
    await expect(passwordField).toHaveAttribute('required')
    await expect(confirmPasswordField).toHaveAttribute('required')
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: (args) => (
    <ResetPassword.Form onSuccess={args.onSuccess} token={args.token} className="max-w-sm">
      <ResetPassword.Input
        type="password"
        placeholder="Create a strong password"
        className="mb-2"
      />
      <ResetPassword.Input
        type="confirmPassword"
        placeholder="Confirm your password"
        className="mb-4"
      />
      <ResetPassword.Button variant="secondary" className="w-full">
        Update Password
      </ResetPassword.Button>
    </ResetPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Password reset successful'),
    token: 'sample-reset-token-123',
    children: undefined,
  },
}

// Story with validation errors
export const ValidationErrors: Story = {
  render: (args) => (
    <ResetPassword.Form onSuccess={args.onSuccess} token={args.token}>
      <ResetPassword.Input type="password" />
      <ResetPassword.Input type="confirmPassword" />
      <ResetPassword.Error />
      <ResetPassword.Button>Reset Password</ResetPassword.Button>
    </ResetPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Password reset successful'),
    token: 'sample-reset-token-123',
    children: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const submitButton = canvas.getByRole('button', { name: /reset password/i })
    await userEvent.click(submitButton)
  },
}

// Accessibility story
export const Accessibility: Story = {
  render: (args) => (
    <ResetPassword.Form onSuccess={args.onSuccess} token={args.token}>
      <ResetPassword.Input type="password" />
      <ResetPassword.Input type="confirmPassword" />
      <ResetPassword.Button>Reset Password</ResetPassword.Button>
    </ResetPassword.Form>
  ),
  args: {
    onSuccess: mockAction('Password reset successful'),
    token: 'sample-reset-token-123',
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

    const passwordField = canvas.getByLabelText(/new password/i)
    passwordField.focus()

    await userEvent.tab()
    const confirmPasswordField = canvas.getByLabelText(/confirm new password/i)
    await expect(confirmPasswordField).toHaveFocus()

    await userEvent.tab()
    const submitButton = canvas.getByRole('button', { name: /reset password/i })
    await expect(submitButton).toHaveFocus()
  },
}
