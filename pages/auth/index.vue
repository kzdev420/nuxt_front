<template lang="pug">
  div
    b-container.cont(fluid v-if="isMounted")
      b-row.justify-content-center.full-height(align-v="stretch")
        b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
          div
            login-title(:text="'Create your Jun Group Account'" :type="'title'" :margin="[0,0,50]")
            google-button(:signin="false" @click='submitGoogle()')
            b-row.login-row(style="width: 450px; height: 57px;")
              b-col.no-padding-sides.or-bar
                v-divider
              b-col.or-divider(align-self="center") or
              b-col.no-padding-sides.or-bar
                v-divider
            b-form(@submit.prevent="submitButton()")
              text-button(:margin='[0,0,20]' v-model="email" :type="'email'" :filter="emailFilter" :placeholder='"Email Address"')
              text-button(:margin='[20,0,20]' :type="'password'" v-model='password' :filter="passwordFilter" :placeholder='"Password"' :dropdown="passwordDropdown")
              b-form-radio.option-toc(v-model="toc" name="toc" :value="true") I have read and agree to the 
                a.link-toc(href="#") Terms and Conditions
              form-button(:text='"SUBMIT"' :inactive="formComplete")
              div.signup-description(style='text-align: center')
                p.text-center Jun Group 
                  a(href="https://jungroup.com/pp.html/" target="_blank") Privacy Policy
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
import GoogleButton from "~/components/googleButton"
import TextButton from "~/components/textButton"
import LoginTitle from "~/components/loginTitle"
import TocComponent from "~/components/tocComponent"

export default {
  components: {
    FormButton,
    GoogleButton,
    TextButton,
    LoginTitle,
    TocComponent,
  },
  mixins: [AuthHelper],
  data() {
    return {
      email: "",
      password: "",
      toc: false,
      oneTry: false,
      isMounted: false,
    }
  },
  computed: {
    submit() {
      return false
    },
    formComplete() {
      // console.log("toc", this.toc)
      return !this.oneTry && this.toc
        ? false
        : !(
            !!this.emailFilter(this.email) &&
            !!this.passwordFilter(this.password) &&
            this.toc
          )
    },
    passwordDropdown() {
      return {
        message:
          // "The password must be minimum 8 characters long and include upper and lower case letters, numbers, and at least one special character (~!@#$%^&*_-+=`|\\(){}[]:;" +
          "The password must be minimum 8 characters long and include at least one number and one special character (~!@#$%^&*_-+=`|\\(){}[]:;" +
          `"'<>,.?/).`,
        show: !this.oneTry ? false : !this.passwordFilter(this.password),
      }
    },
  },
  created() {
    /** continue loading page if couldnt auto-authenticate */
    this.isMounted = true
  },
  methods: {
    submitButton() {
      if (this.emailFilter(this.email) && this.passwordFilter(this.password)) {
        this.register()
      } else {
        this.oneTry = true
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

<style lang="sass" scoped>
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
