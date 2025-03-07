import Lara from "@primevue/themes/lara";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  primevue: {
    options: {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: "light",
        },
      },
      ripple: true,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL ?? "https://shop-api.codeyad-project.ir"
    }
  }
});
