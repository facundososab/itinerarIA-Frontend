/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174
  },
  plugins: [react()],
  test:{
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  }
})

console.log("the test has already started")
