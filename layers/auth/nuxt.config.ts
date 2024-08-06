import { resolve } from 'path'

export default defineNuxtConfig({
    ssr: true,
    modules: [
        [
        '@pinia/nuxt',
            { autoImports: ['defineStore'] },
        ]
    ],
    alias: {
        pinia: resolve(__dirname, 'node_modules/pinia')
    },
    devtools: { enabled: true }
})