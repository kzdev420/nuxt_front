<template lang="pug">
  div.app
    client-only
      header-component
      Nuxt.content(v-if="isMounted")
        //- currently disabling SSR
      footer-component(v-if="$nuxt.$route.name === 'account'")
</template>

<script>
import regexp from "~/plugins/route-utils"
import HeaderComponent from "~/components/header"
import FooterComponent from "~/components/footer"
export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  created() {
    this.$store
      .dispatch("auth/initialize")
      .then((resp) => {
        console.log(resp)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        if (process.env.NODE_ENV !== "development")
          this.$recaptchaLoaded().then(() => this.checkAuthentication())
        else this.checkAuthentication()
      })
  },
  methods: {
    checkAuthentication() {
      if (
        !regexp.some((r) => r.exec(this.$route.path)) &&
        !this.$store.getters["auth/authenticated"]
      ) {
        this.$router.push("/auth")
        return
      }
      this.isMounted = true
    },
  },
}
/** use the below to intercept all requests, when we hit something unauthorized, logout */
// created: function () {
//   axios.interceptors.response.use(undefined, function (err) {
//     return new Promise(function (resolve, reject) {
//       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
//       // if you ever get an unauthorized, logout the user
//         this.$store.dispatch(AUTH_LOGOUT)
//       // you can also redirect to /login if needed !
//       }
//       throw err;
//     });
//   });
// }
</script>

<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  /* box-sizing: border-box; */
}
.app {
  min-height: 100vh;
  position: relative;
  min-width: 100wh;
}
.content {
  min-height: 100%;
  position: relative;
}
/* *,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */

.loading-modal {
  position: absolute;
  top: 50%;
  margin: auto;
}
</style>
