export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [{ code: 'en', file: 'en.json' }],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },
  runtimeConfig: {
    newsApiKey: '',
    newsApiBaseUrl: '',
    authEmail: '',
    authPassword: '',
    authName: '',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/_variables.scss" as *; @use "~/assets/styles/_mixins.scss" as *;`,
        },
      },
    },
  },
})
