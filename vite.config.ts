import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GH_PAGES=1 builds with the repo sub-path so assets resolve on <user>.github.io/<repo>/
export default defineConfig({
  base: process.env.GH_PAGES ? '/eshyft-landing-redesign/' : '/',
  plugins: [react(), tailwindcss()],
})
