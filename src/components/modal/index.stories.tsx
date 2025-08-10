import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect, within, userEvent } from '@storybook/test'

import Modal from './index'
import ModalProvider from './ModalProvider'
import { useModalManager } from './context'
import Button from '../button'
import { FaExclamationTriangle, FaCheck, FaInfo } from 'react-icons/fa'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible modal component with accessibility, animations, focus management, and multiple size variants. Supports stacking, focus trapping, and keyboard navigation.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size variant',
      defaultValue: 'md',
    },
    centered: {
      control: 'boolean',
      description: 'Center modal vertically',
      defaultValue: true,
    },
    scrollable: {
      control: 'boolean',
      description: 'Allow content to scroll',
      defaultValue: true,
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Close modal when clicking backdrop',
      defaultValue: true,
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape',
      defaultValue: true,
    },
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

// Simple story wrapper - just a trigger button and modal
function StoryModalWrapper({
  children,
  modalId,
  buttonText = 'Open Modal',
  ...modalProps
}: {
  children: React.ReactNode
  modalId: string
  buttonText?: string
  [key: string]: any
}) {
  const { openModal } = useModalManager()

  return (
    <>
      <Button onClick={() => openModal(modalId)}>{buttonText}</Button>

      <Modal id={modalId} {...modalProps}>
        {children}
      </Modal>
    </>
  )
}

// Basic modal
export const Basic: Story = {
  args: {
    size: 'md',
    centered: true,
    scrollable: true,
  },
  render: (args) => (
    <StoryModalWrapper modalId="basic-modal" {...args}>
      <Modal.Header withCloseButton>Basic Modal</Modal.Header>
      <Modal.Body>
        <p className="text-slate-600 dark:text-slate-400">
          This is a basic modal with a header, body, and footer. It demonstrates the core
          functionality including accessibility, animations, and focus management.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </Modal.Footer>
    </StoryModalWrapper>
  ),
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <StoryModalWrapper modalId="small-modal" size="sm" buttonText="Small Modal">
        <Modal.Header withCloseButton>Small Modal</Modal.Header>
        <Modal.Body>
          <p>Small modal content (max-w-md)</p>
        </Modal.Body>
      </StoryModalWrapper>

      <StoryModalWrapper modalId="medium-modal" size="md" buttonText="Medium Modal">
        <Modal.Header withCloseButton>Medium Modal</Modal.Header>
        <Modal.Body>
          <p>Medium modal content (max-w-lg)</p>
        </Modal.Body>
      </StoryModalWrapper>

      <StoryModalWrapper modalId="large-modal" size="lg" buttonText="Large Modal">
        <Modal.Header withCloseButton>Large Modal</Modal.Header>
        <Modal.Body>
          <p>Large modal content with more space (max-w-2xl)</p>
          <div className="mt-4 h-32 rounded bg-slate-100 p-4 dark:bg-slate-800">
            <p>This modal has more content to demonstrate the larger size.</p>
          </div>
        </Modal.Body>
      </StoryModalWrapper>
    </div>
  ),
}

// Confirmation modal
export const ConfirmationModal: Story = {
  render: () => (
    <StoryModalWrapper modalId="confirm-modal">
      <Modal.Header className="pb-4">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="h-6 w-6 text-amber-500" />
          <span>Confirm Delete</span>
        </div>
      </Modal.Header>
      <Modal.Body className="py-6">
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Modal.CloseButton variant="button">Cancel</Modal.CloseButton>
        <Button variant="destructive">Delete</Button>
      </Modal.Footer>
    </StoryModalWrapper>
  ),
}

// Long content modal (scrollable)
export const ScrollableContent: Story = {
  args: {
    size: 'lg',
    scrollable: true,
  },
  render: (args) => (
    <StoryModalWrapper modalId="scrollable-modal" {...args} buttonText="Open Scrollable Modal">
      <Modal.Header withCloseButton>Long Content Modal</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
              <h4 className="font-medium">Section {i + 1}</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                This is a long content section to demonstrate scrollable behavior. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.CloseButton variant="button">Close</Modal.CloseButton>
      </Modal.Footer>
    </StoryModalWrapper>
  ),
}

// Form modal
export const FormModal: Story = {
  render: () => (
    <StoryModalWrapper modalId="form-modal">
      <Modal.Header withCloseButton>Create Account</Modal.Header>
      <Modal.Body>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-500 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-500 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-slate-500 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800"
              placeholder="Enter your password"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Modal.CloseButton variant="button">Cancel</Modal.CloseButton>
        <Button>Create Account</Button>
      </Modal.Footer>
    </StoryModalWrapper>
  ),
}

// Interactive playground
export const Interactive: Story = {
  args: {
    size: 'md',
    centered: true,
    scrollable: true,
    closeOnOutsideClick: true,
    closeOnEscape: true,
  },
  render: (args) => (
    <StoryModalWrapper modalId="interactive-modal" {...args}>
      <Modal.Header withCloseButton>Interactive Modal</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start gap-3">
              <FaInfo className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Modal Features</h4>
                <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Accessible with proper ARIA attributes</li>
                  <li>• Focus trap keeps keyboard navigation within modal</li>
                  <li>• Smooth animations with GSAP</li>
                  <li>• Multiple size variants</li>
                  <li>• Dark mode support</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Test keyboard navigation:</p>
            <div className="flex gap-2">
              <Button size="sm">Button 1</Button>
              <Button size="sm" variant="outline">
                Button 2
              </Button>
              <input
                type="text"
                placeholder="Text input"
                className="rounded border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.CloseButton variant="button">Cancel</Modal.CloseButton>
        <Button>Save Changes</Button>
      </Modal.Footer>
    </StoryModalWrapper>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open modal
    const openButton = canvas.getByText('Open Modal')
    await userEvent.click(openButton)

    // Check if modal opened
    const modal = canvas.getByRole('dialog')
    await expect(modal).toBeInTheDocument()

    // Check accessibility attributes
    await expect(modal).toHaveAttribute('aria-modal', 'true')
    await expect(modal).toHaveAttribute('role', 'dialog')
  },
}
