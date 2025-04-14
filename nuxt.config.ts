// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    public: {
      bankAuthToken: process.env.BANK_AUTH_TOKEN || '',
    },
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: '2025-04-11',
})