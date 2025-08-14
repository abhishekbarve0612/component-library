import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from '@storybook/test'
import { useState } from 'react'

import RangeInput from './index'

const meta = {
  title: 'Components/Form/RangeInput',
  component: RangeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    showValue: {
      control: { type: 'boolean' },
    },
    showLabels: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof RangeInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    showValue: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const rangeInput = canvas.getByRole('slider')
    await expect(rangeInput).toBeInTheDocument()
    await expect(rangeInput).toHaveAttribute('min', '0')
    await expect(rangeInput).toHaveAttribute('max', '100')
    await expect(rangeInput).toHaveAttribute('step', '1')
  },
}

export const WithLabels: Story = {
  args: {
    label: 'Temperature',
    min: -10,
    max: 40,
    step: 5,
    defaultValue: 20,
    showValue: true,
    showLabels: true,
    description: 'Set the temperature range',
  },
}

export const CustomStep: Story = {
  args: {
    label: 'Price Range',
    min: 0,
    max: 1000,
    step: 50,
    defaultValue: 250,
    showValue: true,
    showLabels: true,
  },
}

export const DecimalStep: Story = {
  args: {
    label: 'Opacity',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.5,
    showValue: true,
    description: 'Adjust opacity level',
  },
}

export const NoValueDisplay: Story = {
  args: {
    label: 'Progress',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 30,
    showValue: false,
    showLabels: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Invalid Range',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 75,
    showValue: true,
    error: 'Value must be between 20 and 80',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Range',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 60,
    showValue: true,
    disabled: true,
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(25)

    return (
      <div className="w-80 space-y-4">
        <RangeInput
          label="Controlled Range"
          min={0}
          max={100}
          step={5}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          showValue={true}
          showLabels={true}
          description={`Current value: ${value}`}
        />
        <button
          onClick={() => setValue(50)}
          className="bg-primary text-primary-foreground rounded-md px-4 py-2"
        >
          Reset to 50
        </button>
      </div>
    )
  },
}

export const MultipleRanges: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <RangeInput label="Volume" min={0} max={100} defaultValue={70} showValue={true} />
      <RangeInput
        label="Brightness"
        min={10}
        max={100}
        step={10}
        defaultValue={50}
        showValue={true}
        showLabels={true}
      />
      <RangeInput
        label="Zoom"
        min={0.5}
        max={3}
        step={0.25}
        defaultValue={1}
        showValue={true}
        description="Zoom level multiplier"
      />
    </div>
  ),
}

export const CustomStyling: Story = {
  args: {
    label: 'Custom Styled Range',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    showValue: true,
    className: 'bg-accent/50 p-4 rounded-lg',
    trackClassName: 'h-3',
  },
}
