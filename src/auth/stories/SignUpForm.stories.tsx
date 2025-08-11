import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import SignUp from '../sign-up/index'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp.Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    endpoint: {
      control: 'text',
      description: 'API endpoint for sign-up',
    },
  },
} satisfies Meta<typeof SignUp.Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [formState, setFormState] = useState({ loading: false, error: null, success: false })
    
    const handleSuccess = (user: any) => {
      console.log('Sign up successful:', user)
      setFormState({ loading: false, error: null, success: true })
    }
    
    const handleSubmit = async () => {
      setFormState({ loading: true, error: null, success: false })
      // Simulate API call
      setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 2000)
    }

    return (
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-muted-foreground mt-2">Sign up to get started</p>
        </div>

        <SignUp.Form onSuccess={handleSuccess} className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <SignUp.Input field="firstName" />
            <SignUp.Input field="lastName" />
          </div>

          <SignUp.Input field="username" />
          <SignUp.Input field="email" />
          <SignUp.Input field="password" />
          <SignUp.Input field="confirmPassword" />

          {formState.error && <SignUp.Error error={formState.error} />}
          {formState.success && (
            <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-200 rounded-md">
              Account created successfully!
            </div>
          )}

          <SignUp.Button className="w-full" loading={formState.loading}>
            Create Account
          </SignUp.Button>

          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </SignUp.Form>
      </div>
    )
  },
}

export const WithCustomFields: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Join Our Platform</h2>
        <p className="text-muted-foreground mt-2">Create your developer account</p>
      </div>

      <SignUp.Form className="space-y-4">
        <SignUp.Input field="firstName" placeholder="Your first name" />
        <SignUp.Input field="lastName" placeholder="Your last name" />
        <SignUp.Input field="username" placeholder="Choose a unique username" />
        <SignUp.Input field="email" placeholder="developer@example.com" />
        <SignUp.Input field="password" placeholder="Strong password (min 6 chars)" />
        <SignUp.Input field="confirmPassword" placeholder="Confirm your password" />

        <SignUp.Button className="w-full">Create Developer Account</SignUp.Button>

        <div className="text-muted-foreground text-center text-xs">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </div>
      </SignUp.Form>
    </div>
  ),
}

export const MinimalForm: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <SignUp.Form className="space-y-4">
        <SignUp.Input field="email" />
        <SignUp.Input field="username" />
        <SignUp.Input field="password" />

        <SignUp.Button className="w-full" size="sm">
          Sign Up
        </SignUp.Button>
      </SignUp.Form>
    </div>
  ),
}

export const CompactLayout: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Quick Sign Up</h3>
      </div>

      <SignUp.Form className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <SignUp.Input field="firstName" />
          <SignUp.Input field="lastName" />
        </div>

        <SignUp.Input field="email" />
        <SignUp.Input field="username" />

        <div className="grid grid-cols-2 gap-2">
          <SignUp.Input field="password" />
          <SignUp.Input field="confirmPassword" />
        </div>

        <SignUp.Button className="w-full" size="sm">
          Sign Up
        </SignUp.Button>
      </SignUp.Form>
    </div>
  ),
}

export const WithCustomEndpoint: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Register</h2>
        <p className="text-muted-foreground mt-2">Using custom endpoint: /api/v2/users/register</p>
      </div>

      <SignUp.Form endpoint="/api/v2/users/register" className="space-y-4">
        <SignUp.Input field="firstName" />
        <SignUp.Input field="lastName" />
        <SignUp.Input field="email" />
        <SignUp.Input field="username" />
        <SignUp.Input field="password" />
        <SignUp.Input field="confirmPassword" />

        <SignUp.Button className="w-full">Sign Up</SignUp.Button>
      </SignUp.Form>
    </div>
  ),
}

export const AllFieldTypes: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Complete Registration</h2>
        <p className="text-muted-foreground mt-2">All available field types</p>
      </div>

      <SignUp.Form className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <SignUp.Input field="firstName" />
            <SignUp.Input field="lastName" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">Account Details</h3>
          <SignUp.Input field="username" />
          <SignUp.Input field="email" />
        </div>

        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">Security</h3>
          <SignUp.Input field="password" />
          <SignUp.Input field="confirmPassword" />
        </div>

        <SignUp.Button className="w-full">Complete Registration</SignUp.Button>
      </SignUp.Form>
    </div>
  ),
}
