import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'path'
import { cpSync, existsSync, mkdirSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    // Add Node.js polyfills for browser environment
    nodePolyfills({
      // Include specific polyfills needed for gray-matter
      include: ['buffer', 'process'],
      // Whether to polyfill specific globals
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    })
  ],
  assetsInclude: ['**/*.md'],  // Ensure markdown files are treated as assets
  build: {
    outDir: './static',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    // This ensures that the dev server properly handles client-side routing
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
