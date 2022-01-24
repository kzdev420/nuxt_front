export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",
  // server: {
  //   port: 80, // default: 3000
  //   host: "localhost", // default: localhost
  // },

  /** manually adding routes */
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        // {
        //   name: "password-reset",
        //   path: "/auth/:token",
        //   component: resolve(__dirname, "pages/auth/_password.vue"),
        // },
        // {
        //   name: "index",
        //   path: "/",
        //   component: resolve(__dirname, "pages/auth/index.vue"),
        // },
        // {
        //   name: "register",
        //   path: "/auth",
        //   component: resolve(__dirname, "pages/auth/index.vue"),
        // },
        {
          name: "404",
          path: "*",
          component: resolve(__dirname, "layouts/error.vue"),
        }
      )
    },
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "smb-front-end",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /** env variable config */
  env: {
    /** base url for smb-back-end server */
    BASE_API_URL: process.env.BASE_API_URL || "http://localhost:5000/api",
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    RECAPTCHA_SITE_KEY:
      process.env.RECAPTCHA_SITE_KEY ||
      "6LcsYNEZAAAAAJz9C-52F_e3Owy6nW-B32e1676F",
    GOOGLE_CLIENT_ID:
      process.env.GOOGLE_CLIENT_ID ||
      "1015692930696-qn96jpruuoqrlf3rmuaks0huugc64dkr.apps.googleusercontent.com",
    // base_api_port: process.env.BASE_API_PORT || '5000'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/sass/jungroup.sass"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  /** BE SURE TO ALWAYS PASS SSR PARAMETER TO ENSURE STATIC SITE WILL WORK AS EXPECTED */
  plugins: [
    { src: "~/plugins/vue-google-oauth2.js", ssr: false },
    { src: "~/plugins/vue-recaptcha-v3.js", ssr: false },
    { src: "~/plugins/api-client.js", ssr: false },
    { src: "~/plugins/route-helper.js", ssr: false },
    { src: "~/plugins/global.js", ssr: false },
    { src: "~/plugins/constants.js", ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    "@nuxtjs/vuetify",
    [
      "@nuxtjs/router",
      {
        keepDefaultRouter: true,
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    [
      "vue-toastification/nuxt",
      {
        timeout: 2000,
        transitionDuration: {
          enter: 750,
          leave: 750,
        },
        draggable: false,
        position: "top-center",
        maxToasts: 1,
        closeButton: false,
      },
    ],
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {
    devtools: true, // leaving vue dev-tools available for staging
  },

  ssr: false,

  telemetry: false,

  // https://nuxtjs.org/api/configuration-loading/
  loading: {
    color: "blue",
    height: "5px",
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },

  vuetify: {
    theme: {
      secondary: "#DE001C",
      primary: "#64B5C5",
      dark: "#282828",
      light: "#A3A2A2",
      accent: "#255C8E",
      background: "#e5e5e5",
    },
  },
}
