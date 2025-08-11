import type { Meta, StoryObj } from '@storybook/react-vite'
import { FiHeart, FiShare2, FiBookmark, FiMoreHorizontal, FiStar, FiMapPin } from 'react-icons/fi'
import Card from './index'
import Button from '../button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible card component with compound architecture for building various card layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style variant of the card',
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'ghost'],
    },
    size: {
      description: 'Size of the card text',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    padding: {
      description: 'Internal padding of card sections',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: {
      description: 'Whether card shows hover effects',
      control: 'boolean',
    },
    onClick: {
      description: 'Click handler for the card',
      action: 'clicked',
    },
    href: {
      description: 'URL to navigate to when card is clicked',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>
          This is a basic card with header, content, and footer sections.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-600 dark:text-gray-300">
          Card content goes here. You can add any content you want inside the card body.
        </p>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary" size="sm">
          Action
        </Button>
        <Button variant="ghost" size="sm" className="ml-2">
          Cancel
        </Button>
      </Card.Footer>
    </Card>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        alt="Beautiful landscape"
        aspectRatio="video"
      />
      <Card.Header>
        <Card.Title>Beautiful Landscape</Card.Title>
        <Card.Description>A stunning view of mountains and nature.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Perfect for hiking and outdoor adventures. This location offers breathtaking views and
          peaceful surroundings.
        </p>
      </Card.Content>
      <Card.Footer divider>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <FiHeart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <FiShare2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <FiBookmark className="h-4 w-4" />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <Card className="w-72" hoverable>
      <Card.Image
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        alt="Headphones"
        aspectRatio="square"
      />
      <Card.Header>
        <div className="flex items-start justify-between">
          <div>
            <Card.Title>Premium Headphones</Card.Title>
            <div className="mt-1 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">(128 reviews)</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <FiMoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <Card.Description lines={2}>
          High-quality wireless headphones with active noise cancellation and premium sound quality.
        </Card.Description>
        <div className="mt-3">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">$299</span>
          <span className="ml-2 text-sm text-gray-500 line-through">$399</span>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button variant="primary" size="sm" className="w-full">
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  ),
}

export const UserProfileCard: Story = {
  render: () => (
    <Card className="w-80" variant="elevated">
      <Card.Content>
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="John Doe"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <Card.Title as="h4">John Doe</Card.Title>
            <Card.Description>Senior Frontend Developer</Card.Description>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <FiMapPin className="mr-1 h-3 w-3" />
              San Francisco, CA
            </div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer divider>
        <div className="flex w-full space-x-2">
          <Button variant="primary" size="sm" className="flex-1">
            Follow
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Message
          </Button>
        </div>
      </Card.Footer>
    </Card>
  ),
}

export const VariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="default" className="w-64">
        <Card.Header>
          <Card.Title>Default</Card.Title>
          <Card.Description>Standard card with border</Card.Description>
        </Card.Header>
      </Card>

      <Card variant="elevated" className="w-64">
        <Card.Header>
          <Card.Title>Elevated</Card.Title>
          <Card.Description>Card with shadow</Card.Description>
        </Card.Header>
      </Card>

      <Card variant="outlined" className="w-64">
        <Card.Header>
          <Card.Title>Outlined</Card.Title>
          <Card.Description>Card with thick border</Card.Description>
        </Card.Header>
      </Card>

      <Card variant="ghost" className="w-64">
        <Card.Header>
          <Card.Title>Ghost</Card.Title>
          <Card.Description>Subtle background card</Card.Description>
        </Card.Header>
      </Card>
    </div>
  ),
}

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Card size="sm" className="w-80">
        <Card.Header>
          <Card.Title>Small Card</Card.Title>
          <Card.Description>Compact size with smaller text</Card.Description>
        </Card.Header>
      </Card>

      <Card size="md" className="w-80">
        <Card.Header>
          <Card.Title>Medium Card</Card.Title>
          <Card.Description>Default medium size</Card.Description>
        </Card.Header>
      </Card>

      <Card size="lg" className="w-80">
        <Card.Header>
          <Card.Title>Large Card</Card.Title>
          <Card.Description>Large size with bigger text</Card.Description>
        </Card.Header>
      </Card>
    </div>
  ),
}

export const ClickableCard: Story = {
  render: () => (
    <Card className="w-80" hoverable onClick={() => alert('Card clicked!')}>
      <Card.Header>
        <Card.Title>Clickable Card</Card.Title>
        <Card.Description>This entire card is clickable and shows hover effects.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click anywhere on this card to trigger the action.
        </p>
      </Card.Content>
    </Card>
  ),
}

export const LinkCard: Story = {
  render: () => (
    <Card className="w-80" hoverable href="https://example.com">
      <Card.Header>
        <Card.Title>Link Card</Card.Title>
        <Card.Description>This card works as a navigation link.</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click to navigate to the linked page.
        </p>
      </Card.Content>
    </Card>
  ),
}

export const NoPaddingCard: Story = {
  render: () => (
    <Card className="w-80" padding="none">
      <Card.Image
        src="https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=400&h=200&fit=crop"
        alt="Modern architecture"
      />
      <div className="p-4">
        <Card.Title>Custom Layout</Card.Title>
        <Card.Description className="mt-2">
          Card with no default padding for custom layouts.
        </Card.Description>
      </div>
    </Card>
  ),
}
