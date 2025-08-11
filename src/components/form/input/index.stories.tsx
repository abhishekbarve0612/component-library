import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import Input from './index'
import { FaSearch, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { IoMdClose, IoMdMail } from 'react-icons/io'

// Interface for Interactive story args
interface InteractiveStoryArgs {
  id?: string
  className?: string
  label: string
  placeholder: string
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'
  required: boolean
  disabled: boolean
  showLeftIcon: boolean
  showRightIcon: boolean
  leftIconType: 'search' | 'user' | 'mail' | 'lock'
  rightIconType: 'close' | 'eye' | 'eye-slash'
  showDescription: boolean
  description: string
  showError: boolean
  errorMessage: string
}

const meta = {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible compound input component with support for labels, icons, descriptions, and error states.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

// Interactive story with full controls
export const Interactive: StoryObj<InteractiveStoryArgs> = {
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
      defaultValue: 'Interactive Input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      defaultValue: 'Enter text...',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Input type',
      defaultValue: 'text',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      defaultValue: false,
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show left icon',
      defaultValue: false,
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Show right icon',
      defaultValue: false,
    },
    leftIconType: {
      control: 'select',
      options: ['search', 'user', 'mail', 'lock'],
      description: 'Left icon type',
      defaultValue: 'search',
      if: { arg: 'showLeftIcon', truthy: true },
    },
    rightIconType: {
      control: 'select',
      options: ['close', 'eye', 'eye-slash'],
      description: 'Right icon type',
      defaultValue: 'close',
      if: { arg: 'showRightIcon', truthy: true },
    },
    showDescription: {
      control: 'boolean',
      description: 'Show description text',
      defaultValue: false,
    },
    description: {
      control: 'text',
      description: 'Description text',
      defaultValue: 'This is a helpful description',
      if: { arg: 'showDescription', truthy: true },
    },
    showError: {
      control: 'boolean',
      description: 'Show error state',
      defaultValue: false,
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
      defaultValue: 'This field is invalid',
      if: { arg: 'showError', truthy: true },
    },
  },
  render: (args: InteractiveStoryArgs) => {
    const getLeftIcon = () => {
      switch (args.leftIconType) {
        case 'search':
          return <FaSearch />
        case 'user':
          return <FaUser />
        case 'mail':
          return <IoMdMail />
        case 'lock':
          return <FaLock />
        default:
          return <FaSearch />
      }
    }

    const getRightIcon = () => {
      switch (args.rightIconType) {
        case 'close':
          return <IoMdClose />
        case 'eye':
          return <FaEye />
        case 'eye-slash':
          return <FaEyeSlash />
        default:
          return <IoMdClose />
      }
    }

    return (
      <Input className={args.className} id={args.id}>
        <Input.Label>{args.label}</Input.Label>
        <Input.Group>
          {args.showLeftIcon && <Input.Icon>{getLeftIcon()}</Input.Icon>}
          <Input.Field
            type={args.type}
            name="interactive-input"
            placeholder={args.placeholder}
            required={args.required}
            disabled={args.disabled}
          />
          {args.showRightIcon && <Input.Icon>{getRightIcon()}</Input.Icon>}
        </Input.Group>
        {args.showDescription && <Input.Description>{args.description}</Input.Description>}
        {args.showError && <Input.Error>{args.errorMessage}</Input.Error>}
      </Input>
    )
  },
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic input with label and field only.',
      },
    },
  },
  args: {
    children: (
      <>
        <Input.Label>Full Name</Input.Label>
        <Input.Group>
          <Input.Field type="text" name="name" placeholder="Enter your full name" />
        </Input.Group>
      </>
    ),
  },
}

export const WithLeftIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Input with a search icon on the left. Icons before the field are automatically positioned left.',
      },
    },
  },
  args: {
    children: (
      <>
        <Input.Label>Search</Input.Label>
        <Input.Group>
          <Input.Icon>
            <FaSearch />
          </Input.Icon>
          <Input.Field type="search" name="search" placeholder="Search..." />
        </Input.Group>
      </>
    ),
  },
}

export const WithRightIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input with an icon explicitly positioned on the right using the position prop.',
      },
    },
  },
  args: {
    children: (
      <>
        <Input.Label>Search</Input.Label>
        <Input.Group>
          <Input.Field type="search" name="search" placeholder="Search..." />
          <Input.Icon>
            <IoMdClose />
          </Input.Icon>
        </Input.Group>
      </>
    ),
  },
}

export const WithBothIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Input with multiple icons on both sides. Great for search inputs with clear functionality.',
      },
    },
  },
  args: {
    children: (
      <>
        <Input.Label>Advanced Search</Input.Label>
        <Input.Group>
          <Input.Icon>
            <FaSearch />
          </Input.Icon>
          <Input.Field type="search" name="search" placeholder="Search with filters..." />
          <Input.Icon>
            <IoMdClose />
          </Input.Icon>
        </Input.Group>
      </>
    ),
  },
}

export const EmailWithValidation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Email input with validation, required field indicator, and description text.',
      },
    },
  },
  args: {
    id: 'email-input',
    children: (
      <>
        <Input.Label>Email Address</Input.Label>
        <Input.Group>
          <Input.Icon>
            <IoMdMail />
          </Input.Icon>
          <Input.Field type="email" name="email" required placeholder="you@example.com" />
        </Input.Group>
        <Input.Description>
          We'll use this email to send you updates about your account.
        </Input.Description>
      </>
    ),
  },
}

export const PasswordInput: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Password input with toggle visibility functionality.',
      },
    },
  },
  render: () => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <Input>
        <Input.Label>Password</Input.Label>
        <Input.Group>
          <Input.Icon>
            <FaLock />
          </Input.Icon>
          <Input.Field
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            placeholder="Enter your password"
          />
          <Input.Icon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Input.Icon>
        </Input.Group>
        <Input.Description>Must be at least 8 characters long.</Input.Description>
      </Input>
    )
  },
}

export const DisabledState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input in disabled state with reduced opacity.',
      },
    },
  },
  args: {
    children: (
      <>
        <Input.Label>Username</Input.Label>
        <Input.Group>
          <Input.Icon>
            <FaUser />
          </Input.Icon>
          <Input.Field
            type="text"
            name="username"
            value="john_doe"
            disabled
            placeholder="Username"
          />
        </Input.Group>
        <Input.Description>Username cannot be changed once set.</Input.Description>
      </>
    ),
  },
}

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input showing error state with validation message.',
      },
    },
  },
  args: {
    children: (
      <>
        <Input.Label>Email</Input.Label>
        <Input.Group>
          <Input.Icon>
            <IoMdMail />
          </Input.Icon>
          <Input.Field
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            defaultValue="invalid-email"
          />
        </Input.Group>
        <Input.Error>Please enter a valid email address.</Input.Error>
      </>
    ),
  },
}
