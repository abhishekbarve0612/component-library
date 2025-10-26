# @abhishekbarve/components

A modern React component library built with TypeScript, Tailwind CSS, and GSAP animations.

## Live Demo:

Explore the component showcase at [components.barve.dev](https://components.barve.dev/).

## Installation

```bash
npm install @abhishekbarve/components
# or
yarn add @abhishekbarve/components
# or
pnpm add @abhishekbarve/components
```

## Peer Dependencies

Make sure to install the required peer dependencies:

```bash
npm install react react-dom tailwindcss
```

For components with animations, you'll also need GSAP (optional):

```bash
npm install gsap @gsap/react
```

For icons (optional):

```bash
npm install react-icons
```

## Usage

### Basic Example

```tsx
import { Button, Input, Modal } from '@abhishekbarve/components'
import '@abhishekbarve/components/styles'

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Click me
      </Button>

      <Input.Group>
        <Input.Label>Email</Input.Label>
        <Input.Field type="email" placeholder="Enter your email" />
      </Input.Group>
    </div>
  )
}
```

### Theme Provider

Wrap your app with the theme provider for dark/light mode support:

```tsx
import { ThemeProvider } from '@abhishekbarve/components'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  )
}
```

## Available Components

### Form Components

- **Button** - Customizable button with multiple variants
- **Input** - Complete input system with labels, errors, descriptions
- **TextArea** - Multi-line text input with character count
- **Select** - Dropdown selection component
- **Checkbox** - Checkbox input with custom styling
- **RichTextArea** - Rich text editor component

### UI Components

- **Breadcrumb** - Navigation breadcrumb with customizable dividers
- **Card** - Flexible card container with compound components
- **Modal** - Accessible modal dialogs
- **Tooltip** - Interactive tooltips with positioning
- **Navbar** - Navigation bar components
- **Sidebar** - Collapsible sidebar navigation
- **Toolbar** - Tool/action bar component
- **Loader** - Various loading animations
- **Toggle** - Toggle switch component

### Auth Components

- **SignIn** - Complete sign-in form
- **SignUp** - User registration form
- **ForgotPassword** - Password recovery form
- **ResetPassword** - Password reset form

### Theme & Utilities

- **ThemeProvider** - Theme context and management
- **ThemeToggle** - Dark/light mode toggle
- Various utility functions and design tokens

## Styling

This library uses Tailwind CSS for styling. Make sure to include the component styles:

```tsx
import '@abhishekbarve/components/styles'
```

If you're using Tailwind CSS in your project, the components will automatically inherit your theme configuration.

## License

MIT
