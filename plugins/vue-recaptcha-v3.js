import Vue from "vue"
import { VueReCaptcha } from "vue-recaptcha-v3"

if (process.env.NODE_ENV !== "development") {
  Vue.use(VueReCaptcha, {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    loaderOptions: {
      useRecaptchaNet: true,
    },
  })
}
