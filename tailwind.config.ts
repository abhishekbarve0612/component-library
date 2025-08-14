/**
 * Tailwind Config
 *
 * This file configures the Tailwind CSS framework for the component library.
 * It includes the color tokens from the design system and extends the Tailwind theme.
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string | number>>) => void }) {
      const scrollbarUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
        },
        '.scrollbar-track-transparent': {
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
        },
        '.scrollbar-thumb-transparent': {
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
          },
        },
        '.scrollbar-thumb-gray-300': {
          '&::-webkit-scrollbar-thumb': {
            background: '#d1d5db',
            borderRadius: '9999px',
          },
        },
        '.hover\\:scrollbar-thumb-gray-400:hover': {
          '&::-webkit-scrollbar-thumb': {
            background: '#9ca3af',
          },
        },
        '.dark .dark\\:scrollbar-thumb-gray-600': {
          '&::-webkit-scrollbar-thumb': {
            background: '#4b5563',
            borderRadius: '9999px',
          },
        },
        '.dark .dark\\:hover\\:scrollbar-thumb-gray-500:hover': {
          '&::-webkit-scrollbar-thumb': {
            background: '#6b7280',
          },
        },
      }
      addUtilities(scrollbarUtilities)
    },
  ],
} satisfies Config

export default config
