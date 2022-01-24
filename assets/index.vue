<template lang="pug">
  div
    b-container.cont(fluid v-if="isMounted")
      b-row.justify-content-center.full-height(align-v="stretch")
        b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
          div
            login-title(:text="title" :type="'title'" :margin="[0,0,50]")
            google-button(:signin="googleSignin" @click='submitGoogle()')
            b-row.login-row(style="width: 450px; height: 57px;")
              b-col.no-padding-sides
                v-divider
              b-col(align-self="center") or
              b-col.no-padding-sides
                v-divider
            text-button(:margin='[0,0,20]' v-model="email" :type="'email'" :filter="emailFilter" :placeholder='"Email Address"')
            text-button(:margin='[20,0,20]' :type="'password'" v-model='password' :filter="passwordFilter" :placeholder='"Password"')
            form-button(:text='"SUBMIT"' :inactive="formComplete" @click="submitButton()")

    v-overlay(:value="!isMounted || loading" v-if="true")
      v-progress-circular(indeterminate size="64" color='#DE001C')

</template>

<script>
import { mapGetters } from "vuex"
import DotLoader from "vue-spinner/src/DotLoader"
import GoogleButton from "~/components/googleButton"

export default {
  components: {
    DotLoader,
    GoogleButton,
  },
  data() {
    return {
      email: "",
      password: "",

      emailFilter: (s) =>
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.exec(
          s
        ),

      errors: [],
      state: null,
      formData: {},
      isMounted: false,
      isSignIn: null,
      isInit: null,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      loading: "auth/loading",
    }),
    submit() {
      return false
    },
    googleSignin() {
      return true
    },
    formComplete() {
      return false
    },
    title() {
      return "Create your Jun Group Account"
    },
  },
  created() {
    if (this.authenticated) {
      /** don't show the login page if already authenticated */
      this.$router.push("/signup")
      return
    }
    /** continue loading page if couldnt auto-authenticate */
    this.isMounted = true

    let that = this
    let checkGauthLoad = setInterval(function () {
      that.isInit = that.$gAuth.isInit
      that.isSignIn = that.$gAuth.isAuthorized
      console.log(that.isInit, that.isSignin)
      if (that.isInit) clearInterval(checkGauthLoad)
    }, 1000)
  },
  methods: {
    submitButton() {
      console.log("tests")
    },
    submitGoogle() {
      console.log("testsss")
    },
    login() {
      this.$store
        .dispatch("auth/login", { email: this.email, password: this.password })
        .then(() => {
          this.$toast.clear()
          this.$toast.success("Login successful!")
          this.$router.push("/dashboard")
        })
        .catch((err) => {
          this.$toast.clear()
          this.$toast.error("Email/Password is incorrect")
        })
    },
    register() {
      this.$store
        .dispatch("auth/register", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$toast.clear()
          this.$toast.success("Registration successful!")
          this.$router.push("/dashboard")
        })
        .catch((err) => {
          console.log(err)
          this.$toast.clear()
          this.$toast.error(`Error during creation ---> ${err}`)
        })
    },
    resetPassword() {
      this.$store
        .dispatch("auth/resetPassword", { email: this.email })
        .then(() => {
          this.$toast.clear()
          this.$toast.info(
            "If an account with the given email exists you will receieve a link to reset your password"
          )
        })
        .catch((err) => {
          console.log(err)
          this.$toast.clear()
          this.$toast.error(`Error during password reset ---> ${err}`)
        })
        .finally(() => {
          this.state = null
        })
    },
    updatePassword() {
      this.$store
        .dispatch("auth/updatePassword", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password,
        })
        .then(() => {
          this.$toast.clear()
          this.$toast.success("Password has successfully been reset!")
          this.$router.push("/dashboard")
        })
        .catch((err) => {
          console.log(err)
          this.$toast.clear()
          this.$toast.error(`Error during password reset ---> ${err}`)
        })
    },
    updateUser() {
      this.$store
        .dispatch("auth/updateUser", this.formData)
        .then((res) => {
          this.$toast.clear()
          this.$toast.success("Profile has been successfully updated!")
          this.$router.push("/dashboard")
        })
        .catch((err) => {
          console.log(err)
          this.$toast.clear()
          this.$toast.error(`Error during account update ---> ${err}`)
        })
    },
    async recaptcha() {
      if (process.env.NODE_ENV === "development") return
      // Execute reCAPTCHA with action "login".
      const recaptcha_token = await this.$recaptcha("login")
      console.log(`recieved recaptcha token ---> ${recaptcha_token}`)
    },
    async googleSignup() {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          console.log("error signing up with google")
          return
        }
        const userProfile = googleUser.getBasicProfile()
        const authCode = await this.$gAuth.getAuthCode()
        /** register with google */
        this.$store
          .dispatch("auth/registerGoogle", {
            authCode: authCode,
            profile: userProfile,
          })
          .then((resp) => {
            this.$toast.success(
              `Successfully created new account with email ${authCode}`
            )
          })
          .catch((err) => {
            this.$toast.error(`Error during google account registration ${err}`)
          })

        // await this.$store.dispatch('registerGoogle', authCode)
        this.isSignIn = this.$gAuth.isAuthorized
        console.log("logged in")
      } catch (error) {
        //on fail do something
        console.error(error)
        return null
      }
    },

    // googleSignin(googleUser) {
    //   console.log(googleUser)
    //   const profile = googleUser.getBasicProfile()
    //   console.log(profile)
    // },

    // googleFailure(err) {
    //   console.log("error with google sign in", err)
    // }
  },
}
</script>

<style lang="sass">
.cont
  // height: 91vh
  height: calc(100vh - 90px)
  min-height: 500px

.container
  // margin: 0 auto
  max-height: 100%
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  // position: absolute

.full-height
  height: 100%


// .title
//   font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
//   display: block
//   font-weight: 300
//   font-size: 100px
//   color: #35495e
//   letter-spacing: 1px

// .subtitle
//   font-weight: 300
//   font-size: 42px
//   color: #526488
//   word-spacing: 5px
//   padding-bottom: 15px

// .links
//   padding-top: 15px

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
