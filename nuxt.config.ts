// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    ['./layers/auth', { install: true }],
    ['./layers/theme', { install: true }],
    // ['./layers/request', { install: true }]
  ]
})
