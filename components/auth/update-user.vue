<template lang="pug">
  div
    b-form(@submit='submit' @reset="reset")
      b-form-group(v-for='field in fields' :key='`${field.label}`' :label='`${field.label}:`' v-bind:description='field.description')
        b-form-input(v-model='field.value' :type='field.type' :required='field.required' :placeholder='field.previous')

    //-   b-form-group#input-group-2(label='Your Name:' label-for='input-2')
    //-     b-form-input#input-2(v-model='form.name' required='' placeholder='Enter name')
    //-   b-form-group#input-group-3(label='Food:' label-for='input-3')
    //-     b-form-select#input-3(v-model='form.food' :options='foods' required='')
    //- b-row.my-1(v-for='field in fields' :key='field.key')
    //-   label(:for='`${field.key}`')
    //-     | {{ field.value }}
    //-   b-form-input(:id='`type-${field.key}`' :type='field.key')
        

  //- form.form-horizontal.mt-2(@submit.prevent='updateProfile')
  //-   .form-group
  //-     label.sr-only Name
  //-     input.form-control(type='name' placeholder="fdsa" v-model='email')
  //-   .form-group
  //-     label.sr-only Email
  //-     input.form-control(type='email' placeholder='Password' v-model='email')
  //-   .form-group
  //-     label.sr-only Business Name
  //-     input.form-control(type='business name' placeholder='Password' v-model='password')
  //-   .form-group
  //-     label.sr-only Business Type
  //-     input.form-control(type='business type' placeholder='Password' v-model='password')
  //-   .form-group
  //-     label.sr-only Role
  //-     input.form-control(type='role' placeholder='Password' v-model='password')
  //-   .form-group
  //-     label.sr-only Password
  //-     input.form-control(type='password' placeholder='Password' v-model='password')
  //-   .form-group
  //-     button.btn.btn-lg.btn-block.btn-primary(type='submit') Log In
  //- form.form-horizontal.mt-2(@submit.prevent='register')
  //-   .form-group
  //-     button.btn.btn-lg.btn-block.btn-danger(type='submit') Register
  //- form.form-horizontal.mt-2(@submit.prevent='resetPassword')
  //-   .form-group
  //-     button.btn.btn-lg.btn-block.btn-danger(type='submit') Reset Password
</template>

<script>
import { VueReCaptcha } from "vue-recaptcha-v3"
import _ from "lodash"

export default {
  components: {
    VueReCaptcha,
  },
  props: {
    form: { type: Object, required: true },
  },
  data() {
    return {
      fields: {
        name: {
          description: null,
          label: "Name",
          required: true,
        },
        email: {
          description: "We'll never share your email with anyone else.",
          label: "Email Address",
          required: true,
        },
        business_name: {
          description: null,
          label: "Business Name",
          required: true,
        },
        business_type: {
          description: null,
          label: "Business Type",
          required: true,
        },
        role: {
          description: null,
          label: "Business Role",
          required: true,
        },
        password: {
          description: null,
          label: "Password",
          required: true,
        },
      },
    }
  },
  computed: {
    fields() {
      return _.entries(this.form).map((e) => ({ field: e[0], v: e[1] }))
    },
  },
  methods: {
    updateUser() {
      this.$store
        .dispatch("auth/updateUser", this.formData)
        .then(() => {
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
  },
}
</script>

//
<template lang="pug">
//   div
//     b-container.cont(fluid)
//       b-row.justify-content-center.full-height(align-v="stretch")
//         b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
//           div
//             login-title(:text="'Create your Jun Group Account'" :type="'title'" :margin="[0,0,50]")
//             google-button(:signin="true" @click='submitGoogle()')
//             b-row.login-row(style="width: 450px; height: 57px;")
//               b-col.no-padding-sides
//                 v-divider
//               b-col.or-divider(align-self="center") or
//               b-col.no-padding-sides
//                 v-divider
//             text-button(:margin='[0,0,20]' v-model="email" :type="'email'" :filter="emailFilter" :placeholder='"Email Address"')
//             text-button(:margin='[20,0,20]' :type="'password'" v-model='password' :filter="passwordFilter" :placeholder='"Password"' :dropdown="passwordDropdown")
//               //- alert-dropdown
//             form-button(:text='"SUBMIT"' :inactive="formComplete" @click="submitButton()")
//     v-overlay(:value="loading" v-if="true")
//       v-progress-circular(indeterminate size="64" color='primary')

// </template>

//
<script>
// import { mapGetters } from "vuex"
// import DotLoader from "vue-spinner/src/DotLoader"
// import FormButton from "~/components/formButton"
// import GoogleButton from "~/components/googleButton"
// import TextButton from "~/components/textButton"
// import LoginTitle from "~/components/loginTitle"

// export default {
//   components: {
//     DotLoader,
//     FormButton,
//     GoogleButton,
//     TextButton,
//     LoginTitle,
//   },
//   data() {
//     return {
//       email: "",
//       password: "",
//       oneTry: false,
//       emailFilter: (s) =>
//         /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.exec(
//           s.toLowerCase()
//         ),
//       passwordFilter: (p) =>
//         /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.exec(p),
//       errors: [],
//       state: null,
//       formData: {},
//       isMounted: false,
//       isSignIn: null,
//       isInit: null,
//     }
//   },
//   computed: {
//     ...mapGetters({
//       authenticated: "auth/authenticated",
//       loading: "auth/loading",
//     }),
//     submit() {
//       return false
//     },
//     formComplete() {
//       return !this.oneTry
//         ? false
//         : !(
//             !!this.emailFilter(this.email) &&
//             !!this.passwordFilter(this.password)
//           )
//     },
//     passwordDropdown() {
//       return {
//         message:
//           "The password must be minimum 8 characters long and include upper and lower case letters, numbers, and at least one special character (~!@#$%^&*_-+=`|\(){}[]:;" +
//           `"'<>,.?/).`,
//         show: !this.oneTry ? false : !this.passwordFilter(this.password),
//       }
//     },
//   },
//   created() {
//     if (this.authenticated) {
//       /** don't show the login page if already authenticated */
//       this.$router.push("/signup")
//       return
//     }

//     let that = this
//     let checkGauthLoad = setInterval(function () {
//       that.isInit = that.$gAuth.isInit
//       that.isSignIn = that.$gAuth.isAuthorized
//       console.log(that.isInit, that.isSignin)
//       if (that.isInit) clearInterval(checkGauthLoad)
//     }, 1000)
//   },
//   methods: {
//     submitButton() {
//       if (this.emailFilter(this.email) && this.passwordFilter(this.password)) {
//         this.login()
//       } else {
//         this.oneTry = true
//       }
//     },
//     async submitGoogle() {
//       /** wait for gAuth to load before checking */
//       while (!this.$gAuth.isInit) {
//         await this.timeout(250)
//       }
//       await this.googleSignup()
//     },
//     login() {
//       this.$store
//         .dispatch("auth/login", { email: this.email, password: this.password })
//         .then(() => {
//           this.$toast.clear()
//           this.$toast.success("Login successful!")
//           this.$router.push("/dashboard")
//         })
//         .catch((err) => {
//           this.$toast.clear()
//           this.$toast.error("Email/Password is incorrect")
//         })
//     },
//     register() {
//       this.$store
//         .dispatch("auth/register", {
//           email: this.email,
//           password: this.password,
//         })
//         .then(() => {
//           this.$toast.clear()
//           this.$toast.success("Registration successful!")
//           this.$router.push("/dashboard")
//         })
//         .catch((err) => {
//           console.log(err)
//           this.$toast.clear()
//           this.$toast.error(`Error during creation ---> ${err}`)
//         })
//     },
//     resetPassword() {
//       this.$store
//         .dispatch("auth/resetPassword", { email: this.email })
//         .then(() => {
//           this.$toast.clear()
//           this.$toast.info(
//             "If an account with the given email exists you will receieve a link to reset your password"
//           )
//         })
//         .catch((err) => {
//           console.log(err)
//           this.$toast.clear()
//           this.$toast.error(`Error during password reset ---> ${err}`)
//         })
//         .finally(() => {
//           this.state = null
//         })
//     },
//     updatePassword() {
//       this.$store
//         .dispatch("auth/updatePassword", {
//           email: this.email,
//           password: this.password,
//           password_confirmation: this.password,
//         })
//         .then(() => {
//           this.$toast.clear()
//           this.$toast.success("Password has successfully been reset!")
//           this.$router.push("/dashboard")
//         })
//         .catch((err) => {
//           console.log(err)
//           this.$toast.clear()
//           this.$toast.error(`Error during password reset ---> ${err}`)
//         })
//     },
//     updateUser() {
//       this.$store
//         .dispatch("auth/updateUser", this.formData)
//         .then((res) => {
//           this.$toast.clear()
//           this.$toast.success("Profile has been successfully updated!")
//           this.$router.push("/dashboard")
//         })
//         .catch((err) => {
//           console.log(err)
//           this.$toast.clear()
//           this.$toast.error(`Error during account update ---> ${err}`)
//         })
//     },
//     async recaptcha() {
//       if (process.env.NODE_ENV === "development") return
//       // Execute reCAPTCHA with action "login".
//       const recaptcha_token = await this.$recaptcha("login")
//       console.log(`recieved recaptcha token ---> ${recaptcha_token}`)
//     },
//     async googleSignup() {
//       try {
//         const googleUser = await this.$gAuth.signIn()
//         if (!googleUser) {
//           console.log("error signing up with google")
//           return
//         }
//         const userProfile = googleUser.getBasicProfile()
//         const authCode = await this.$gAuth.getAuthCode()
//         /** register with google */
//         this.$store
//           .dispatch("auth/registerGoogle", {
//             authCode: authCode,
//             profile: userProfile,
//           })
//           .then((resp) => {
//             this.$toast.success(
//               `Successfully created new account with email ${authCode}`
//             )
//           })
//           .catch((err) => {
//             this.$toast.error(`Error during google account registration ${err}`)
//           })

//         // await this.$store.dispatch('registerGoogle', authCode)
//         this.isSignIn = this.$gAuth.isAuthorized
//         console.log("logged in")
//       } catch (error) {
//         //on fail do something
//         console.error(error)
//         return null
//       }
//     },

//     // googleSignin(googleUser) {
//     //   console.log(googleUser)
//     //   const profile = googleUser.getBasicProfile()
//     //   console.log(profile)
//     // },

//     // googleFailure(err) {
//     //   console.log("error with google sign in", err)
//     // }
//   },
// }
//
</script>

//
<style lang="sass">
// .cont
//   // height: 91vh
//   height: calc(100vh - 90px)
//   min-height: 500px

// .container
//   // margin: 0 auto
//   max-height: 100%
//   display: flex
//   justify-content: center
//   align-items: center
//   text-align: center
//   // position: absolute

// .full-height
//   height: 100%


// // .title
// //   font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
// //   display: block
// //   font-weight: 300
// //   font-size: 100px
// //   color: #35495e
// //   letter-spacing: 1px

// // .subtitle
// //   font-weight: 300
// //   font-size: 42px
// //   color: #526488
// //   word-spacing: 5px
// //   padding-bottom: 15px

// // .links
// //   padding-top: 15px

// .blur-content
//   animation: blur .5s ease 0s 1
//   -webkit-animation: blur .5s ease 0s 1
//   -moz-animation: blur .5s ease 0s 1

// @keyframes blur
//   0%,
//   50%
//     -webkit-filter: blur(2px)
//     -moz-filter: blur(2px)
//     -ms-filter: blur(2px)
//   50%
//     -webkit-filter: blur(4px)
//     -moz-filter: blur(4px)
//     -ms-filter: blur(4px)
//
</style>
