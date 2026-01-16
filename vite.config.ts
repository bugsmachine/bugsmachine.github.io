import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: github.io/timebar
  base: '/timebar/',
  build: {
    // Output to dist/timebar/ so it matches the base URL path
    outDir: 'dist/timebar',
  },
})
