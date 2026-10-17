import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base: './' ensures all asset paths are relative — works on GitHub Pages
// whether deployed to a root domain or a subdirectory (e.g. /repo-name/)
export default defineConfig({
  plugins: [react()],
  base: './',
})
