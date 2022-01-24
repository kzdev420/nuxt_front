<template lang="pug">
  div
    b-container.cont(fluid)
      b-row.justify-content-center.full-height(align-v="stretch")
        b-col.login-col.full-height(align-self="stretch" style="display: flex; align-items: center;")
          div.onboarding
            business-name(v-if="currentStep === 1" @next="goForward" v-model="form.step_1")
            business-type(v-if="currentStep === 2" @next="goForward" v-model="form.step_2")
            business-name-role(v-if="currentStep === 3" @next="goForward" v-model="form.step_3")
            StepBar(:allStep="allStep" :currentStep="currentStep" @move="move")
    v-overlay(:value="loading" v-if="true")
      v-progress-circular(indeterminate size="64" color='#DE001C')

</template>

<script>
import AuthHelper from "~/components/authHelper"

import BusinessName from "~/components/onboarding/BusinessName"
import BusinessType from "~/components/onboarding/BusinessType"
import BusinessNameRole from "~/components/onboarding/BusinessNameRole"
import StepBar from "~/components/onboarding/StepBar"
import _ from "lodash"

export default {
  components: {
    BusinessName,
    BusinessType,
    BusinessNameRole,
    StepBar,
  },
  mixins: [AuthHelper],
  data() {
    return {
      allStep: 3,
      currentStep: -1,
      form: {
        step_1: {
          business_name: "",
          business_url: "",
        },
        step_2: {
          business_type: "",
          // other: false,
        },
        step_3: {
          name: "",
          role: "",
        },
      },
    }
  },
  // mounted() {
  //   document.addEventListener("backbutton", this.goBack, false)
  //   document.addEventListener("forwardbutton", this.goForwardLink, false)
  // },
  // beforeDestroy() {
  //   document.removeEventListener("forwardbutton", this.goForward)
  //   document.removeEventListener("backbutton", this.goBack)
  // },
  created() {
    /** determine if more information is needed from the user */
    /** user data should be in the store from the login */
    for (let i = this.allStep; i > 0; i--) {
      _.forEach(this.form[`step_${i}`], (val, key) => {
        if (this.user[key]) {
          /** value is defined, update from store */
          this.form[`step_${i}`][key] = this.user[key]
        } else {
          /** value isnt defined, make this the current step */
          this.currentStep = i
        }
      })
    }
  },
  mounted() {
    if (this.currentStep === -1) {
      this.$toast.info("Account already filled out, logging out...")
      this.$store.commit("auth/logout")
      this.toRegisterPage()
    }
  },
  methods: {
    async goForward(data) {
      try {
        await this.updateUser(data)
      } catch (e) {
        /** dont advance if error on backend */
        return
      }
      if (this.currentStep < this.allStep) {
        this.currentStep++
      } else {
        this.$toast.clear()
        this.$toast.success("Account creation successful!")
        await this.timeout(2000)
        this.$toast.clear()
        this.$toast.info("Logging out and returning to registration page...")
        this.$store.commit("auth/logout")
        this.toRegisterPage()
      }
    },
    goForwardLink() {
      // if (this.currentStep < this.allStep) {
      //   this.currentStep++
      // }
      // blocking forward button functionality
    },
    goBack() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    move(step) {
      if (step < this.currentStep) {
        this.currentStep = step
      }
    },

    createAccount() {},
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
</style>
