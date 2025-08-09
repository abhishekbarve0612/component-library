import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useRef, useState } from 'react'

import Tooltip from './index'
import Button from '../button'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'A flexible tooltip component with positioning, animations, and interactive features. Supports targeting elements by ID or ref without requiring wrapper components.',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement relative to trigger',
      defaultValue: 'top',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'How the tooltip is triggered',
      defaultValue: 'hover',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow pointing to trigger element',
      defaultValue: false,
    },
    interactive: {
      control: 'boolean',
      description: 'Allow interaction with tooltip content',
      defaultValue: false,
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing',
      defaultValue: 150,
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger element in pixels',
      defaultValue: 8,
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Close tooltip when clicking outside',
      defaultValue: true,
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in top-right corner',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

// Interactive story with controls
export const Interactive: Story = {
  render: (args) => {
    return (
      <div className="p-8 flex justify-center">
        <Button id="interactive-tooltip">Interactive Tooltip</Button>
        <Tooltip 
          id="interactive-tooltip"
          placement={args.placement}
          trigger={args.trigger}
          showArrow={args.showArrow}
          interactive={args.interactive}
          delay={args.delay}
          offset={args.offset}
          closeOnOutsideClick={args.closeOnOutsideClick}
          showCloseButton={args.showCloseButton}
        >
          <Tooltip.Content>
            <Tooltip.Header>Interactive Demo</Tooltip.Header>
            <Tooltip.Body>
              Use the controls to test different tooltip configurations.
            </Tooltip.Body>
          </Tooltip.Content>
        </Tooltip>
      </div>
    )
  },
}

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip triggered by hover with simple content.',
      },
    },
  },
  render: () => (
    <div className="p-8 flex justify-center">
      <Button id="default-tooltip">Hover me</Button>
      <Tooltip id="default-tooltip">
        <Tooltip.Content>
          This is a simple tooltip!
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const WithArrow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with arrow pointer showing connection to trigger element.',
      },
    },
  },
  render: () => (
    <div className="p-8 grid grid-cols-2 gap-8 place-items-center">
      <div>
        <Button id="arrow-top">Top Arrow</Button>
        <Tooltip id="arrow-top" placement="top" showArrow>
          <Tooltip.Content variant="dark">
            Tooltip with top arrow
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="arrow-bottom">Bottom Arrow</Button>
        <Tooltip id="arrow-bottom" placement="bottom" showArrow>
          <Tooltip.Content variant="info">
            Tooltip with bottom arrow
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  ),
}

export const DifferentVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants and sizes for various use cases.',
      },
    },
  },
  render: () => (
    <div className="p-8 grid grid-cols-3 gap-6 place-items-center">
      <div>
        <Button id="variant-default">Default</Button>
        <Tooltip id="variant-default" showArrow>
          <Tooltip.Content variant="default" size="sm">
            Default style
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="variant-dark">Dark</Button>
        <Tooltip id="variant-dark" showArrow>
          <Tooltip.Content variant="dark" size="md">
            Dark theme tooltip
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="variant-success">Success</Button>
        <Tooltip id="variant-success" showArrow>
          <Tooltip.Content variant="success" size="lg">
            Success message tooltip
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="variant-warning">Warning</Button>
        <Tooltip id="variant-warning" showArrow>
          <Tooltip.Content variant="warning">
            Warning notification
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="variant-error">Error</Button>
        <Tooltip id="variant-error" showArrow>
          <Tooltip.Content variant="error">
            Error message
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="variant-info">Info</Button>
        <Tooltip id="variant-info" showArrow>
          <Tooltip.Content variant="info">
            Information tooltip
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  ),
}

export const StructuredContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with structured content using Header and Body components.',
      },
    },
  },
  render: () => (
    <div className="p-8 flex justify-center">
      <Button id="structured-tooltip">Structured Content</Button>
      <Tooltip id="structured-tooltip" placement="top" showArrow>
        <Tooltip.Content variant="default" size="lg">
          <Tooltip.Header>User Profile</Tooltip.Header>
          <Tooltip.Body>
            View and edit your personal information, preferences, and account settings.
          </Tooltip.Body>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const InteractiveTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive tooltip with clickable content and close button.',
      },
    },
  },
  render: () => (
    <div className="p-8 flex justify-center">
      <Button id="interactive-demo">Interactive Demo</Button>
      <Tooltip 
        id="interactive-demo" 
        placement="top" 
        showArrow 
        interactive 
        trigger="click"
        showCloseButton
      >
        <Tooltip.Content variant="default" size="lg">
          <Tooltip.Header>Interactive Tooltip</Tooltip.Header>
          <Tooltip.Body>
            This tooltip stays open when you hover over it. You can interact with its content.
            <br />
            <Button size="sm" className="mt-2">
              Click me!
            </Button>
          </Tooltip.Body>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const CloseFeatures: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with different close options: close button, outside click, and both.',
      },
    },
  },
  render: () => (
    <div className="p-8 space-y-8">
      <div className="p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium mb-2">Close Features Demo:</h3>
        <p className="text-sm mb-2">Test the different close behaviors:</p>
        <ul className="text-sm space-y-1">
          <li>• <strong>Close button:</strong> X button in top-right corner</li>
          <li>• <strong>Outside click:</strong> Click anywhere outside tooltip</li>
          <li>• <strong>Combined:</strong> Both methods available</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
        <div>
          <Button id="close-button-only">Close Button Only</Button>
          <Tooltip 
            id="close-button-only" 
            trigger="click" 
            showArrow
            showCloseButton
            closeOnOutsideClick={false}
          >
            <Tooltip.Content variant="info" size="md">
              <Tooltip.Header>Close Button</Tooltip.Header>
              <Tooltip.Body>
                Only the X button will close this tooltip. Clicking outside won't work.
              </Tooltip.Body>
            </Tooltip.Content>
          </Tooltip>
        </div>
        
        <div>
          <Button id="outside-click-only">Outside Click Only</Button>
          <Tooltip 
            id="outside-click-only" 
            trigger="click" 
            showArrow
            closeOnOutsideClick
            showCloseButton={false}
          >
            <Tooltip.Content variant="warning" size="md">
              <Tooltip.Header>Outside Click</Tooltip.Header>
              <Tooltip.Body>
                Click anywhere outside this tooltip to close it. No close button available.
              </Tooltip.Body>
            </Tooltip.Content>
          </Tooltip>
        </div>
        
        <div>
          <Button id="both-close-methods">Both Methods</Button>
          <Tooltip 
            id="both-close-methods" 
            trigger="click" 
            showArrow
            showCloseButton
            closeOnOutsideClick
            interactive
          >
            <Tooltip.Content variant="success" size="md">
              <Tooltip.Header>Multiple Close Options</Tooltip.Header>
              <Tooltip.Body>
                Use either the X button or click outside to close.
                <br />
                <Button size="sm" className="mt-2">
                  Interact with me!
                </Button>
              </Tooltip.Body>
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

export const TriggerModes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different trigger modes: hover, click, and focus.',
      },
    },
  },
  render: () => (
    <div className="p-8 grid grid-cols-3 gap-8 place-items-center">
      <div>
        <Button id="hover-trigger">Hover Trigger</Button>
        <Tooltip id="hover-trigger" trigger="hover" showArrow>
          <Tooltip.Content>
            Triggered by hover
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="click-trigger">Click Trigger</Button>
        <Tooltip id="click-trigger" trigger="click" showArrow>
          <Tooltip.Content>
            Triggered by click
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div>
        <Button id="focus-trigger">Focus Trigger</Button>
        <Tooltip id="focus-trigger" trigger="focus" showArrow>
          <Tooltip.Content>
            Triggered by focus (tab to this button)
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  ),
}

export const WithRef: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using targetRef instead of id for targeting elements.',
      },
    },
  },
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    
    return (
      <div className="p-8 flex justify-center">
        <Button ref={buttonRef}>Ref Target</Button>
        <Tooltip targetRef={buttonRef} placement="top" showArrow>
          <Tooltip.Content variant="dark">
            Tooltip using targetRef instead of id
          </Tooltip.Content>
        </Tooltip>
      </div>
    )
  },
}

export const SmartPositioning: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip automatically adjusts position when near viewport edges.',
      },
    },
  },
  render: () => (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium mb-2">Smart Positioning Demo:</h3>
          <p className="text-sm mb-4">
            Try hovering these buttons. The tooltip will flip to stay in viewport.
          </p>
        </div>
        
        {/* Edge cases */}
        <div className="flex justify-between items-start">
          <Button id="top-left">Top Left</Button>
          <Button id="top-right">Top Right</Button>
        </div>
        
        <div className="flex justify-center">
          <Button id="center">Center</Button>
        </div>
        
        <div className="flex justify-between items-end">
          <Button id="bottom-left">Bottom Left</Button>
          <Button id="bottom-right">Bottom Right</Button>
        </div>
      </div>
      
      {/* Tooltips */}
      <Tooltip id="top-left" placement="top" showArrow>
        <Tooltip.Content>
          This tooltip will flip to bottom if needed
        </Tooltip.Content>
      </Tooltip>
      
      <Tooltip id="top-right" placement="top" showArrow>
        <Tooltip.Content>
          Smart positioning prevents overflow
        </Tooltip.Content>
      </Tooltip>
      
      <Tooltip id="center" placement="top" showArrow>
        <Tooltip.Content>
          Perfectly centered tooltip
        </Tooltip.Content>
      </Tooltip>
      
      <Tooltip id="bottom-left" placement="bottom" showArrow>
        <Tooltip.Content>
          Will flip to top if no space below
        </Tooltip.Content>
      </Tooltip>
      
      <Tooltip id="bottom-right" placement="bottom" showArrow>
        <Tooltip.Content>
          Responsive positioning system
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
}

export const AnimationShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Showcase of GSAP animations with different placements and effects.',
      },
    },
  },
  render: () => {
    const [animationDemo, setAnimationDemo] = useState(false)
    
    return (
      <div className="p-8 space-y-6">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-md">
          <h3 className="font-medium mb-3">Animation Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>GSAP fade in/out</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Scale animations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>Directional entrance</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Smooth positioning</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
          <div>
            <Button id="anim-top">Top</Button>
            <Tooltip id="anim-top" placement="top" showArrow>
              <Tooltip.Content variant="dark">
                Animates from below
              </Tooltip.Content>
            </Tooltip>
          </div>
          
          <div>
            <Button id="anim-bottom">Bottom</Button>
            <Tooltip id="anim-bottom" placement="bottom" showArrow>
              <Tooltip.Content variant="info">
                Animates from above
              </Tooltip.Content>
            </Tooltip>
          </div>
          
          <div>
            <Button id="anim-left">Left</Button>
            <Tooltip id="anim-left" placement="left" showArrow>
              <Tooltip.Content variant="success">
                Animates from right
              </Tooltip.Content>
            </Tooltip>
          </div>
          
          <div>
            <Button id="anim-right">Right</Button>
            <Tooltip id="anim-right" placement="right" showArrow>
              <Tooltip.Content variant="warning">
                Animates from left
              </Tooltip.Content>
            </Tooltip>
          </div>
        </div>
        
        {animationDemo && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-medium text-green-800">
                Animations showcase active!
              </span>
            </div>
          </div>
        )}
      </div>
    )
  },
}