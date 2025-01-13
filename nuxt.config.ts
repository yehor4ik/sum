// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      bankAuthToken: process.env.NUXT_PUBLIC_BANK_AUTH_TOKEN ?? '',
    }
  }
})
