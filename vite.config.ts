/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  const isLibMode = mode === 'lib'

  return {
    plugins: [react(), tailwindcss()],

    ...(isLibMode && {
      build: {
        lib: {
          entry: resolve(dirname, 'src/index.ts'),
          name: 'ComponentLib',
          formats: ['es'],
          fileName: 'index',
        },
        rollupOptions: {
          external: (id) => {
            // Externalize React and all its submodules
            if (id === 'react' || id.startsWith('react/')) return true;
            if (id === 'react-dom' || id.startsWith('react-dom/')) return true;
            
            // Externalize other peer dependencies
            if (id === '@gsap/react' || id === 'gsap') return true;
            if (id.startsWith('react-icons')) return true;
            
            return false;
          },
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
      },
    }),

    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
        '@components': path.resolve(dirname, './src/components'),
        '@containers': path.resolve(dirname, './src/containers'),
        '@assets': path.resolve(dirname, './src/assets'),
        '@routes': path.resolve(dirname, './src/routes'),
        '@style': path.resolve(dirname, './src/index.css'),
      },
    },
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  }
})
