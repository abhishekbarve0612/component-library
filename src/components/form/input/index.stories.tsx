import type { Meta, StoryObj } from "@storybook/react-vite";

import Index from "./index";
import { FaSearch } from "react-icons/fa";

const meta = {
  component: Index,
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // render: (args) => <Index {...args} />,
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
};
export const WithIcon: Story = {
  // render: (args) => <Index {...args} />,
  args: {
    children: (
      <>
        <Index.Label>Label</Index.Label>
        <Index.Group>
          <Index.Icon>
            <FaSearch className="inline-block" />
          </Index.Icon>
          <Index.Field type="text" name="name" />
        </Index.Group>
      </>
    ),
  },
};
