import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, within } from "@storybook/test";

import Index from "./index";

const meta = {
  title: "Components/Button",
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    disabled: false,
    onClick: () => {},
    className: "",
    type: "button",
    variant: "primary",
    size: "md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button")).toHaveClass("button-primary");
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button")).toBeDisabled();
  },
};
