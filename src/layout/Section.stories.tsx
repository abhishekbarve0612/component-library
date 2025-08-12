import type { Meta, StoryObj } from '@storybook/react-vite'

import Section from './Section'

const meta = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Section>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <Section>
      <h2 className="mb-4 text-2xl font-bold">Default Section</h2>
      <p className="text-muted-foreground mb-4">
        This is a default section with standard spacing. The Section component provides consistent
        vertical spacing between different content areas.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-border rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Item 1</h3>
          <p className="text-muted-foreground text-sm">Description for item 1</p>
        </div>
        <div className="border-border rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Item 2</h3>
          <p className="text-muted-foreground text-sm">Description for item 2</p>
        </div>
      </div>
    </Section>
  ),
}

export const MultipleSection: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <div>
      <Section>
        <h2 className="mb-4 text-2xl font-bold">First Section</h2>
        <p className="text-muted-foreground">
          This is the first section. Notice how sections are automatically spaced apart from each
          other using the built-in spacing utilities.
        </p>
        <div className="bg-muted mt-4 rounded-lg p-4">
          <p className="text-sm">Some highlighted content in the first section.</p>
        </div>
      </Section>

      <Section>
        <h2 className="mb-4 text-2xl font-bold">Second Section</h2>
        <p className="text-muted-foreground">
          This is the second section. The consistent spacing between sections helps create a clean
          and organized layout.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center space-x-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>List item 1</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>List item 2</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>List item 3</span>
          </li>
        </ul>
      </Section>

      <Section>
        <h2 className="mb-4 text-2xl font-bold">Third Section</h2>
        <p className="text-muted-foreground">
          This is the third section, demonstrating how multiple sections work together to create a
          well-structured page layout.
        </p>
        <div className="mt-4 flex space-x-4">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">
            Primary Action
          </button>
          <button className="border-border hover:bg-muted rounded-md border px-4 py-2">
            Secondary Action
          </button>
        </div>
      </Section>
    </div>
  ),
}

export const WithCustomStyling: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <Section className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
      <div className="text-center">
        <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
          Custom Styled Section
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          You can easily customize the Section component by adding your own classes. This example
          shows a gradient background with custom padding and styling.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
            Get Started
          </button>
          <button className="rounded-lg border border-blue-200 px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50">
            Learn More
          </button>
        </div>
      </div>
    </Section>
  ),
}

export const FeatureGrid: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <Section>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Our Features</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Discover what makes our platform special with these key features designed to help you
          succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Lightning Fast</h3>
          <p className="text-muted-foreground">
            Experience blazing fast performance with our optimized infrastructure and cutting-edge
            technology.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Reliable</h3>
          <p className="text-muted-foreground">
            Count on our 99.9% uptime guarantee and robust security measures to keep your data safe
            and accessible.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">User-Friendly</h3>
          <p className="text-muted-foreground">
            Intuitive design and seamless user experience make it easy for anyone to get started and
            be productive.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Scalable</h3>
          <p className="text-muted-foreground">
            Grow your business with confidence knowing our platform scales effortlessly with your
            needs.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">24/7 Support</h3>
          <p className="text-muted-foreground">
            Get help whenever you need it with our round-the-clock customer support and
            comprehensive documentation.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <svg
              className="text-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Secure</h3>
          <p className="text-muted-foreground">
            Enterprise-grade security with end-to-end encryption and compliance with industry
            standards.
          </p>
        </div>
      </div>
    </Section>
  ),
}

export const TestimonialSection: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <Section className="bg-muted/30">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">What Our Customers Say</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Don't just take our word for it. Here's what real customers have to say about their
          experience with our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-background border-border rounded-lg border p-6">
          <div className="mb-4 flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="text-muted-foreground mb-4">
            "This platform has completely transformed how we handle our business operations. The
            intuitive interface and powerful features make everything so much easier."
          </p>
          <div className="flex items-center space-x-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-primary-foreground text-sm font-semibold">JD</span>
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-muted-foreground text-sm">CEO, TechCorp</p>
            </div>
          </div>
        </div>

        <div className="bg-background border-border rounded-lg border p-6">
          <div className="mb-4 flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="text-muted-foreground mb-4">
            "The customer support is exceptional. Every question gets answered quickly and the team
            really cares about helping you succeed."
          </p>
          <div className="flex items-center space-x-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-primary-foreground text-sm font-semibold">SM</span>
            </div>
            <div>
              <p className="font-semibold">Sarah Miller</p>
              <p className="text-muted-foreground text-sm">Founder, StartupCo</p>
            </div>
          </div>
        </div>

        <div className="bg-background border-border rounded-lg border p-6">
          <div className="mb-4 flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <p className="text-muted-foreground mb-4">
            "We've seen a 300% increase in productivity since switching to this platform. It's
            reliable, fast, and exactly what we needed."
          </p>
          <div className="flex items-center space-x-3">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-primary-foreground text-sm font-semibold">MJ</span>
            </div>
            <div>
              <p className="font-semibold">Mike Johnson</p>
              <p className="text-muted-foreground text-sm">CTO, InnovateInc</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  ),
}

export const CallToActionSection: Story = {
  args: {
    children: undefined,
  },
  render: () => (
    <Section className="bg-primary text-primary-foreground rounded-2xl py-16 text-center">
      <div className="mx-auto max-w-3xl space-y-8">
        <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
        <p className="text-xl opacity-90">
          Join thousands of satisfied customers who have already transformed their business with our
          platform.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-lg px-8 py-4 font-semibold transition-colors">
            Start Free Trial
          </button>
          <button className="border-primary-foreground hover:bg-primary-foreground/10 rounded-lg border px-8 py-4 font-semibold transition-colors">
            Schedule Demo
          </button>
        </div>
        <div className="flex items-center justify-center space-x-6 text-sm opacity-75">
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </Section>
  ),
}
