import { mapGetters } from "vuex"
import Filters from "~/components/filters"

/** Mixin with different functions involved with authentication pages */
export default {
  mixins: [Filters],
  computed: {
    ...mapGetters({
      loading: "auth/loading",
      token: "auth/token",
      googleToken: "auth/googleToken",
      authenticated: "auth/authenticated",
      user: "auth/user",
      self: "auth/self",
    }),
  },
  created() {
    /** don't show the login page if already authenticated are trying to access the signup page */
    if (this.authenticated) this.toDashboard()
  },
  methods: {
    timeout(ms) {
      return () => new Promise((resolve) => setTimeout(resolve, ms))
    },
    logout() {
      this.$store.commit("auth/logout")
      this.$router.push("/auth")
    },
    async login() {
      /** grab recaptcha token before login */
      await this.recaptcha()
      this.$store
        .dispatch("auth/login", {
          email: this.textFilter(this.email),
          password: this.password,
        })
        .then(() => {
          // this.$toast.clear()
          // this.$toast.success("Login successful!")
          this.toDashboard()
        })
        .catch((err) => {
          this.$toast.clear()
          this.$toast.error(`Email/Password is incorrect ---> ${err}`)
          console.error(err)
        })
    },
    async register() {
      await this.recaptcha()
      this.$store
        .dispatch("auth/register", {
          email: this.textFilter(this.email),
          password: this.password,
          terms: this.toc,
        })
        .then(() => {
          // this.$toast.clear()
          // this.$toast.success("Registration successful!")
          this.toDashboard()
        })
        .catch((err) => {
          console.log(err)
          this.$toast.clear()
          this.$toast.error(`Error during creation ---> ${err}`)
        })
    },
    async resetPassword() {
      await this.recaptcha()
      this.$store
        .dispatch("auth/resetPassword", { email: this.textFilter(this.email) })
        .then((resp) => {
          console.log(`password reset response ---> ${resp}`)
        })
        .catch((err) => {
          this.$toast.clear()
          this.$toast.error(`Error during password reset ---> ${err}`)
          console.log(`password reset response ---> ${err}`)
        })
        .finally(() => {
          // this.$toast.clear()
          // this.$toast.info(
          //   "If an account with the given email exists you will receieve a link to reset your password",
          //   { timeout: 5000 }
          // )
        })
    },
    async getUser() {
      this.$store
        .dispatch("auth/getUser")
        .then((resp) => {
          console.log(`updated user parameters ---> ${resp}`)
        })
        .catch((err) => {
          this.$toast.clear()
          this.$toast.error(`Error while fetching user ---> ${err}`)
          console.log(`Error while fetching user ---> ${err}`)
        })
        .finally(() => {
          // this.$toast.clear()
          // this.$toast.info(
          //   "If an account with the given email exists you will receieve a link to reset your password",
          //   { timeout: 5000 }
          // )
        })
    },
    async updatePassword() {
      await this.recaptcha()
      this.$store
        .dispatch(
          "auth/updatePassword",
          {
            email: this.textFilter(this.email),
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          },
          this.passwordtoken
        )
        .then(() => {
          // this.$toast.clear()
          // this.$toast.success("Password has successfully been reset!")
          console.log(`update password result --->  ${res}`)

          this.toDashboard()
        })
        .catch((err) => {
          console.log(err)
          this.$toast.clear()
          this.$toast.error(`Error during password reset ---> ${err}`)
        })
    },
    async updateUser(data) {
      // try {
      await this.recaptcha()
      // } catch (e) {
      //   console.log(`error in recaptcha ---> ${e}`)
      //   return Promise.reject(`error in recaptcha ---> ${e}`)
      // }
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("auth/updateUser", data)
          .then((res) => {
            // this.$toast.clear()
            // this.$toast.success("Profile has been successfully updated!")
            console.log(`update user result --->  ${res}`)
            resolve(res)
          })
          .catch((err) => {
            console.log(err)
            this.$toast.clear()
            this.$toast.error(`Error during account update ---> ${err}`)
            reject(err)
          })
      })
    },
    async recaptcha() {
      if (process.env.NODE_ENV === "development")
        return Promise.resolve("success")
      // Execute reCAPTCHA
      return new Promise((resolve, reject) => {
        this.$store.commit("auth/loading")
        this.$recaptcha("login")
          .then((token) => {
            console.log(`recieved recaptcha token ---> ${token}`)
            resolve(token)
          })
          .catch((err) => {
            console.error(err)
            console.log(`error receiving recaptcha token ---> ${err}`)
            reject(err)
          })
          .finally(() => this.$store.commit("auth/done"))
      })
    },
    toDashboard() {
      this.$router.push("/signup")
    },
    toRegisterPage() {
      this.$router.push("/auth")
    },
    async googleSignup() {
      try {
        const authCode = await this.$gAuth.getAuthCode()
        console.log(`authCode recieved ---> ${authCode}`)
        /** register with google */
        this.$store
          .dispatch("auth/registerGoogle", {
            authCode: authCode,
          })
          .then((resp) => {
            // this.$toast.success(`Successfully created new account with Google!`)
            console.log(`google authorization response ---> ${resp}`)
            this.toDashboard()
          })
          .catch((err) => {
            this.$toast.error(`Error during google account registration ${err}`)
          })
        this.isSignIn = this.$gAuth.isAuthorized
      } catch (err) {
        console.error(err)
      }
    },
  },
}
