<template lang="pug">
  div
    b-container.cont(fluid v-if="isMounted")
      b-row.justify-content-center.full-height(align-v="stretch")
        b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
          div.login-row
            b-form(@submit.prevent="submitButton()")
              login-title(:text="'Reset your password'" :type="'title'" :margin="[0,0,50]")
              text-button(:margin='[0,0,20]' v-model="email" :type="'email'" :filter="emailFilter" :placeholder='"Email"')
              form-button(:text='"SUBMIT"' :inactive="!formComplete")
              div.reset-description
                p.text-center
                  span If you no longer use the email address associated with 
                  br 
                  span your Jun Group account, you may contact
                  a(href="#") &nbsp;Customer Service
                  br
                  span for help restoring access to your account.
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
  data() {
    return {
      email: "",
      isMounted: false,
    }
  },
  computed: {
    formComplete() {
      return !!this.emailFilter(this.email)
    },
  },
  created() {
    /** continue loading page if couldnt auto-authenticate */
    this.isMounted = true
  },
  methods: {
    timeout(ms) {
      return () => new Promise((resolve) => setTimeout(resolve, ms))
    },
    async submitButton() {
      if (this.formComplete) await this.resetPassword()
      else {
        this.$toast.clear()
        this.$toast.error("Please fill out your email")
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
