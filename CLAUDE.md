## Purpose

This file provides guidance and references for developers working with this codebase, especially when using Claude code generation. It includes links to key documentation and best practices for UI development, component structure, and animation.

---

## Reference Documentation

- **Storybook**: [Storybook Docs](https://storybook.js.org/docs)  
  For interactive component development, documentation, and testing.
- **Tailwind CSS**: [Tailwind Docs](http://tailwindcss.com/docs/)  
  For utility-first CSS classes and responsive design.
- **React**: [React Docs](https://react.dev/reference/react)  
  For component APIs, hooks, and best practices.
- **Web APIs (MDN)**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web)  
  For HTML, CSS, and JavaScript reference.

---

## UI & Animation Guidelines

- **Animation Speed**:
  - Keep UI animations fast (0.2s–0.3s preferred, max 1s unless illustrative).
  - Use `ease-out` for most UI transitions.
- **Easing**:
  - Prefer custom cubic-bezier easings for complex transitions (see project rules).
  - Use built-in `ease` or `linear` only for simple hover transitions.
- **Performance**:
  - Animate `opacity` and `transform` for best performance.
  - Use `will-change` only for `transform`, `opacity`, `clipPath`, or `filter`.
- **Accessibility**:
  - Respect `prefers-reduced-motion` for users who prefer less animation.
- **Hover Transitions**:
  - Use `@media (hover: hover) and (pointer: fine)` to disable hover effects on touch devices.

---

## Component Structure

- Use clear, composable components (see `Input.Label`, `Input.Group`, etc.).
- Prefer passing `className` for style overrides.
- Use context for shared state (e.g., `useInputContext`).

---

## How to Use This File

- Reference the above documentation when implementing or reviewing code.
- Follow the UI and animation guidelines for a consistent, accessible user experience.
- When in doubt, consult the linked docs or ask for clarification in code review.

---
