import type { Meta, StoryObj } from '@storybook/react-vite'

import Index from './index'

const meta = {
  component: Index,
} satisfies Meta<typeof Index>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'value',
    onValueChange: () => {},
    children: (
      <>
        <Index.Trigger>
          <Index.Value placeholder="Select an option" />
          <Index.Content>
            <Index.Item value="1">Option 1</Index.Item>
            <Index.Item value="2">Option 2</Index.Item>
          </Index.Content>
        </Index.Trigger>
      </>
    )
  },
}
