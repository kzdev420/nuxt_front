<template lang="pug">
  div
    b-container.cont(fluid v-if='isMounted')
      b-row.justify-content-center.full-height(align-v="stretch")
        b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
          div.login-row
            login-title(:text="'Reset your password'" :type="'title'" :margin="[0,0,50]")
            b-form(@submit.prevent="submitButton()")
              text-button(:margin='[20,0,20]'
                          :type="'password'"
                          v-model='password'
                          :placeholder='"New Password"' 
                          )
                          //- :dropdown="passwordDropdown"
              text-button(:margin='[20,0,20]'
                          :type="'password'"
                          v-model='passwordConfirmation'
                          :placeholder='"Confirm New Password"'
                          )
                          //- :dropdown="passwordDropdown"
              form-button(:text='"SUBMIT AND LOGIN"' :inactive="!formErrors.match")

            div.reset-description
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

import FormButton from "~/components/formButton"
import TextButton from "~/components/textButton"
import LoginTitle from "~/components/loginTitle"

export default {
  components: {
    FormButton,
    TextButton,
    LoginTitle,
  },
  mixins: [AuthHelper],
  props: {
    passwordtoken: { type: String, default: null },
    email: { type: String, default: null },
  },
  data() {
    return {
      password: "",
      passwordConfirmation: "",
      isMounted: false,
    }
  },
  computed: {
    formErrors() {
      return {
        match: this.password === this.passwordConfirmation,
        valid:
          !!this.passwordFilter(this.password) &&
          !!this.passwordFilter(this.passwordConfirmation),
      }
    },
    formComplete() {
      return this.formErrors.match && this.formErrors.valid
    },
  },
  created() {
    /** dont have enough information for password reset, redirect to register page */
    if (!this.passwordtoken || !this.email) {
      this.toRegisterPage()
      return
    }
    this.isMounted = true
  },
  methods: {
    timeout(ms) {
      return () => new Promise((resolve) => setTimeout(resolve, ms))
    },
    async submitButton() {
      if (this.formComplete) this.updatePassword()
      else if (!this.formErrors.valid) {
        this.$toast.clear()
        this.$toast.error("invalid passwords entered")
      }
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
</style>
