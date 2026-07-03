import { defineConfig } from 'vite'

export default defineConfig({
  base: '/our-vault/',
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})