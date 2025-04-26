import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'path'
import { cpSync, existsSync, mkdirSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Use absolute paths for assets to prevent 404 errors in nested routes
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
    }),
    // Custom plugin to copy 404.html and other critical files to build output
    {
      name: 'copy-github-pages-files',
      closeBundle() {
        // Copy 404.html file to build output
        try {
          cpSync('./public/404.html', './static/404.html', { force: true });
          console.log('Successfully copied 404.html to build output');
          
          // Copy CNAME file if it exists
          if (existsSync('./public/CNAME')) {
            cpSync('./public/CNAME', './static/CNAME', { force: true });
            console.log('Successfully copied CNAME to build output');
          }
          
          // Copy _redirects file if it exists
          if (existsSync('./public/_redirects')) {
            cpSync('./public/_redirects', './static/_redirects', { force: true });
            console.log('Successfully copied _redirects to build output');
          }
        } catch (error) {
          console.error('Error copying files:', error);
        }
      }
    }
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
