import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base must match the GitHub Pages repo subdirectory path
export default defineConfig({
  plugins: [react()],
  base: '/cyber-portfolio/',
})

