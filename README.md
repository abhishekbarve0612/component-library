# @abhishek/components

A modern React component library built with TypeScript, Tailwind CSS, and GSAP animations.

## Installation

```bash
npm install @abhishek/components
# or
yarn add @abhishek/components
# or
pnpm add @abhishek/components
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
import { Button, Input, Modal } from '@abhishek/components';
import '@abhishek/components/styles';

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
  );
}
```

### Theme Provider

Wrap your app with the theme provider for dark/light mode support:

```tsx
import { ThemeProvider } from '@abhishek/components';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
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
import '@abhishek/components/styles';
```

If you're using Tailwind CSS in your project, the components will automatically inherit your theme configuration.

## Development

### Building the Library

```bash
pnpm run build:lib
```

### Publishing

```bash
# Test what will be published (dry run)
pnpm run publish:dry-run

# Publish to npm
pnpm run publish:npm

# Version bumping
pnpm run version:patch   # 1.0.0 -> 1.0.1
pnpm run version:minor   # 1.0.0 -> 1.1.0
pnpm run version:major   # 1.0.0 -> 2.0.0
```

### Development Mode

```bash
pnpm run dev
```

### Storybook

```bash
pnpm run storybook
```

## TypeScript

The library is fully typed with TypeScript. All component props, types, and utilities are exported for your use:

```tsx
import type { ButtonVariant, InputProps } from '@abhishek/components';
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting
4. Submit a pull request

## License

MIT