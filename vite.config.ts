import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/to-do-git/',
  plugins: [react()],
  build: {
    outDir: 'docs',
  },
})
