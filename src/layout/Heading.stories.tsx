import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from '@storybook/test'

import Heading from './Heading'

const meta = {
  title: 'Layout/Heading',
  component: Heading.H1,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading.H1>

export default meta

type Story = StoryObj<typeof meta>

export const AllHeadingLevels: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading.H1>H1 - Main Page Title</Heading.H1>
        <p className="text-muted-foreground mt-2">
          Use for the main page title or hero section heading. Largest and most prominent.
        </p>
      </div>
      
      <div>
        <Heading.H2>H2 - Section Heading</Heading.H2>
        <p className="text-muted-foreground mt-2">
          Use for major section headings within a page. Second level hierarchy.
        </p>
      </div>
      
      <div>
        <Heading.H3>H3 - Subsection Heading</Heading.H3>
        <p className="text-muted-foreground mt-2">
          Use for subsections within a major section. Third level hierarchy.
        </p>
      </div>
      
      <div>
        <Heading.H4>H4 - Minor Heading</Heading.H4>
        <p className="text-muted-foreground mt-2">
          Use for smaller sections or card titles. Fourth level hierarchy.
        </p>
      </div>
      
      <div>
        <Heading.H5>H5 - Small Heading</Heading.H5>
        <p className="text-muted-foreground mt-2">
          Use for minor headings or component titles. Fifth level hierarchy.
        </p>
      </div>
      
      <div>
        <Heading.H6>H6 - Smallest Heading</Heading.H6>
        <p className="text-muted-foreground mt-2">
          Use for the smallest headings or labels. Sixth level hierarchy.
        </p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check that all heading levels are present with proper semantic markup
    const h1 = canvas.getByRole('heading', { level: 1 })
    const h2 = canvas.getByRole('heading', { level: 2 })
    const h3 = canvas.getByRole('heading', { level: 3 })
    const h4 = canvas.getByRole('heading', { level: 4 })
    const h5 = canvas.getByRole('heading', { level: 5 })
    const h6 = canvas.getByRole('heading', { level: 6 })
    
    await expect(h1).toBeInTheDocument()
    await expect(h2).toBeInTheDocument()
    await expect(h3).toBeInTheDocument()
    await expect(h4).toBeInTheDocument()
    await expect(h5).toBeInTheDocument()
    await expect(h6).toBeInTheDocument()
  },
}

export const H1Stories: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading.H1>Default H1 Heading</Heading.H1>
        <p className="text-muted-foreground mt-4">
          This is the default H1 heading style with responsive sizing and optimal tracking.
        </p>
      </div>
      
      <div>
        <Heading.H1 className="text-center">Centered H1 Heading</Heading.H1>
        <p className="text-muted-foreground mt-4 text-center">
          You can easily center headings by adding utility classes.
        </p>
      </div>
      
      <div>
        <Heading.H1 className="text-primary">Colored H1 Heading</Heading.H1>
        <p className="text-muted-foreground mt-4">
          Apply color classes to change the heading color.
        </p>
      </div>
      
      <div>
        <Heading.H1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Gradient H1 Heading
        </Heading.H1>
        <p className="text-muted-foreground mt-4">
          Create beautiful gradient text effects with utility classes.
        </p>
      </div>
    </div>
  ),
}

export const H2Stories: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading.H2>Default H2 Section Heading</Heading.H2>
        <p className="text-muted-foreground mt-4">
          Perfect for section headings within your page content.
        </p>
        <div className="mt-6 p-4 border border-border rounded-lg">
          <p>Section content goes here...</p>
        </div>
      </div>
      
      <div>
        <Heading.H2 className="border-b border-border pb-2">
          H2 with Bottom Border
        </Heading.H2>
        <p className="text-muted-foreground mt-4">
          Add visual separation with a bottom border.
        </p>
      </div>
      
      <div>
        <Heading.H2 className="flex items-center space-x-3">
          <span className="h-8 w-1 bg-primary rounded-full"></span>
          <span>H2 with Accent Line</span>
        </Heading.H2>
        <p className="text-muted-foreground mt-4">
          Add visual interest with accent elements.
        </p>
      </div>
    </div>
  ),
}

export const H3Stories: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Heading.H3>Subsection Title</Heading.H3>
        <p className="text-muted-foreground mt-2">
          Great for breaking down content into digestible sections.
        </p>
      </div>
      
      <div>
        <Heading.H3 className="text-muted-foreground">
          Muted H3 Heading
        </Heading.H3>
        <p className="text-muted-foreground mt-2">
          Sometimes a more subdued heading works better.
        </p>
      </div>
      
      <div>
        <Heading.H3 className="uppercase tracking-wider text-sm font-bold text-muted-foreground">
          Small Caps H3
        </Heading.H3>
        <p className="text-muted-foreground mt-2">
          Use for category labels or section identifiers.
        </p>
      </div>
    </div>
  ),
}

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-6 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground mb-4">
          Resize your browser window to see how headings adapt to different screen sizes:
        </p>
        
        <div className="space-y-6">
          <Heading.H1>Responsive H1 Title</Heading.H1>
          <Heading.H2>Responsive H2 Section</Heading.H2>
          <Heading.H3>Responsive H3 Subsection</Heading.H3>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground space-y-1">
          <p><strong>H1:</strong> text-3xl md:text-4xl lg:text-5xl</p>
          <p><strong>H2:</strong> text-2xl md:text-3xl lg:text-4xl</p>
          <p><strong>H3:</strong> text-xl md:text-2xl lg:text-3xl</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading components are responsive by default, scaling appropriately across different screen sizes.',
      },
    },
  },
}

export const ArticleHierarchy: Story = {
  render: () => (
    <article className="max-w-3xl space-y-6">
      <header className="space-y-4">
        <Heading.H1>The Complete Guide to Typography in Web Design</Heading.H1>
        <p className="text-lg text-muted-foreground">
          Learn how to create beautiful and readable typography hierarchies 
          for your web projects with these essential principles and techniques.
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Published on March 15, 2024</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <Heading.H2>Understanding Typography Hierarchy</Heading.H2>
          <p className="text-muted-foreground">
            Typography hierarchy is the visual arrangement of text that helps readers 
            navigate content effectively. It guides the eye and creates a clear 
            information structure.
          </p>
          
          <div className="space-y-4">
            <Heading.H3>The Fundamentals</Heading.H3>
            <p className="text-muted-foreground">
              Good typography hierarchy relies on several key principles including 
              size, weight, spacing, and color contrast.
            </p>
            
            <Heading.H4>Size and Scale</Heading.H4>
            <p className="text-muted-foreground">
              Use consistent scaling ratios to create harmonious size relationships 
              between different heading levels.
            </p>
            
            <Heading.H5>Weight and Emphasis</Heading.H5>
            <p className="text-muted-foreground">
              Font weight helps establish importance and visual hierarchy within 
              your content structure.
            </p>
            
            <Heading.H6>Color and Contrast</Heading.H6>
            <p className="text-muted-foreground">
              Strategic use of color and contrast can enhance readability and 
              guide user attention to important sections.
            </p>
          </div>
        </section>
        
        <section className="space-y-4">
          <Heading.H2>Best Practices</Heading.H2>
          <p className="text-muted-foreground">
            Following these guidelines will help you create effective typography 
            hierarchies that improve user experience and content accessibility.
          </p>
          
          <Heading.H3>Consistency is Key</Heading.H3>
          <p className="text-muted-foreground">
            Maintain consistent styling patterns throughout your design system 
            to create a cohesive user experience.
          </p>
        </section>
      </div>
    </article>
  ),
}

export const CardHeadings: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="p-6 border border-border rounded-lg">
        <Heading.H4 className="mb-3">Product Feature</Heading.H4>
        <p className="text-sm text-muted-foreground mb-4">
          This card demonstrates how H4 headings work well for card titles 
          and component headings.
        </p>
        <button className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">
          Learn More
        </button>
      </div>
      
      <div className="p-6 border border-border rounded-lg">
        <Heading.H5 className="mb-3">Smaller Card Title</Heading.H5>
        <p className="text-sm text-muted-foreground mb-4">
          H5 headings are perfect for smaller cards or when you need 
          more subtle hierarchy.
        </p>
        <button className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">
          View Details
        </button>
      </div>
      
      <div className="p-6 border border-border rounded-lg">
        <Heading.H6 className="mb-3">Compact Title</Heading.H6>
        <p className="text-sm text-muted-foreground mb-4">
          H6 headings work well for compact layouts and secondary 
          information hierarchies.
        </p>
        <button className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">
          Read More
        </button>
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading.H1 className="font-light tracking-tight">
          Light Weight H1
        </Heading.H1>
        <p className="text-muted-foreground mt-2">
          Override the default font weight for a more subtle appearance.
        </p>
      </div>
      
      <div>
        <Heading.H2 className="font-black uppercase tracking-widest">
          Bold Uppercase H2
        </Heading.H2>
        <p className="text-muted-foreground mt-2">
          Create impact with bold weights and letter spacing.
        </p>
      </div>
      
      <div>
        <Heading.H3 className="italic text-center border-l-4 border-primary pl-4">
          Styled H3 with Border
        </Heading.H3>
        <p className="text-muted-foreground mt-2">
          Combine multiple utility classes for unique styling.
        </p>
      </div>
      
      <div>
        <Heading.H4 className="relative inline-block">
          <span className="relative z-10">H4 with Background Highlight</span>
          <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-200 -z-10"></span>
        </Heading.H4>
        <p className="text-muted-foreground mt-2">
          Add creative elements to make headings stand out.
        </p>
      </div>
    </div>
  ),
}