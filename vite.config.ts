import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://marcveens.github.io/a-maze-ing/',
  plugins: [react()]
})
