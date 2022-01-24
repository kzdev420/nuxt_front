<template lang="pug">
  div
    b-container.cont(fluid v-if="isMounted")
      b-row.justify-content-center.full-height(align-v="stretch")
        b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
          div
            login-title(:text="'Login to your Jun Group Account'" :type="'title'" :margin="[0,0,50]")
            google-button(:signin="true" @click='submitGoogle()')
            b-row.login-row(style="width: 450px; height: 57px;")
              b-col.no-padding-sides.or-bar
                v-divider
              b-col.or-divider(align-self="center") or
              b-col.no-padding-sides.or-bar
                v-divider
            b-form(@submit.prevent="submitButton()")
              text-button(:margin='[0,0,20]' v-model="email" :type="'email'" :filter="emailFilter" :placeholder='"Email"')
              text-button(:margin='[20,0,20]' :type="'password'" v-model='password' :placeholder='"Password"')
              form-button(:text='"LOG IN"' :inactive="!formComplete")
            div.login-description
              p.text-center
                nuxt-link(to="/auth/passwordreset") &nbsp;Forgot Password
            div.privacy-policy
              p.text-center This site is protected by reCAPTCHA and the
                br
                a(href="https://policies.google.com/privacy?hl=en" target="_blank") Google Privacy Policy
                span &nbsp;and&nbsp;
                a(href="https://policies.google.com/terms?hl=en" target="_blank") Terms of Service
                span &nbsp;apply.

    v-overlay(:value="!isMounted || loading" v-if="true")
      v-progress-circular(indeterminate size="64" color='#DE001C')

</template>

<script>
import AuthHelper from "~/components/authHelper"
import GoogleButton from "~/components/googleButton"

export default {
  components: {
    GoogleButton,
  },
  mixins: [AuthHelper],
  data() {
    return {
      email: "",
      password: "",
      isMounted: false,
    }
  },
  computed: {
    formComplete() {
      return !!this.emailFilter(this.email) && this.password
    },
  },
  created() {
    /** continue loading page if couldnt auto-authenticate */
    this.isMounted = true
  },
  methods: {
    submitButton() {
      if (this.formComplete) this.login()
      else {
        this.$toast.clear()
        this.$toast.error(
          "Please fill out the email or password field correctly"
        )
      }
    },
    async submitGoogle() {
      /** wait for gAuth to load before checking */
      while (!this.$gAuth.isInit) {
        await this.timeout(250)
      }
      await this.googleSignup()
    },
  },
}
</script>

<style lang="sass">
.cont
  height: calc(100vh - 90px)
  min-height: 500px

.container
  max-height: 100%
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.full-height
  height: 100%

.or-bar
  padding: 12px
  width: 200px !important


.blur-content
  animation: blur .5s ease 0s 1
  -webkit-animation: blur .5s ease 0s 1
  -moz-animation: blur .5s ease 0s 1

@keyframes blur
  0%,
  50%
    -webkit-filter: blur(2px)
    -moz-filter: blur(2px)
    -ms-filter: blur(2px)
  50%
    -webkit-filter: blur(4px)
    -moz-filter: blur(4px)
    -ms-filter: blur(4px)
</style>
