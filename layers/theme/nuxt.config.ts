import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [resolve(__dirname, 'assets/css/main.css')],
  postcss: {
    plugins: {
      tailwindcss: resolve(__dirname, 'tailwind.config.ts'),
      autoprefixer: {},
    },
  },
})