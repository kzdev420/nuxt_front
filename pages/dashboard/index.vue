<template lang="pug">
  section.section
    .container
      .login-panel
        .heading.text-center
          h1
            | Welcome to the dashboard!
        template(v-if="!state")  
          form.form-horizontal.mt-2(@submit.prevent='logout')
            .form-group
              button.btn.btn-lg.btn-block.btn-secondary(type='submit') Log out
            .form-group
              button.btn.btn-lg.btn-block.btn-secondary(type='submit') Back to login screen
          //- form.form-horizontal.mt-2(@submit.prevent='updateUser')
          //-   .form-group
          //-     button.btn.btn-lg.btn-block.btn-primary(type='submit') Update your profile
</template>

<script>
import { mapGetters } from "vuex"
import _ from "lodash"

export default {
  data() {
    return {
      state: null,
      userData: {},
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      authenticated: "auth/authenticated",
    }),
  },
  mounted() {
    this.userData = _.cloneDeep(this.user)
  },
  methods: {
    logout() {
      this.$store.commit("auth/logout")
      this.$router.push("/auth")
    },
    // updateUser() {
    //   if (this.authenticated) this.state = "updating_user"
    //   else console.log('not authenticated')
    // }
  },
}
</script>

