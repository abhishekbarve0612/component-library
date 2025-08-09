import type { Meta, StoryObj } from '@storybook/react-vite'

import Index from './index'
import { FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

const meta = {
  component: Index,
} satisfies Meta<typeof Index>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Index.Label>Label</Index.Label>
        <Index.Group>
          <Index.Field type="text" name="name" />
        </Index.Group>
      </>
    ),
  },
}
export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <Index.Label>Search</Index.Label>
        <Index.Group>
          <Index.Icon>
            <FaSearch className="inline-block" />
          </Index.Icon>
          <Index.Field type="text" name="name" />
        </Index.Group>
      </>
    ),
  },
}
export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        <Index.Label>Search</Index.Label>
        <Index.Group>
          <Index.Icon position="right">
            <FaSearch className="inline-block" />
          </Index.Icon>
          <Index.Field type="text" name="name" />
        </Index.Group>
      </>
    ),
  },
}
export const WithLeftAndRightIcons: Story = {
  args: {
    children: (
      <>
        <Index.Label>Search</Index.Label>
        <Index.Group>
          <Index.Icon position="left">
            <FaSearch className="inline-block" />
          </Index.Icon>
          <Index.Field type="text" name="name" />
          <Index.Icon>
            <IoMdClose className="inline-block" />
          </Index.Icon>
        </Index.Group>
      </>
    ),
  },
}

export const EmailInput: Story = {
  args: {
    id: 'email',
    children: (
      <>
        <Index.Label>Email</Index.Label>
        <Index.Group>
          <Index.Field type="email" name="email" required />
        </Index.Group>
      </>
    ),
  },
}