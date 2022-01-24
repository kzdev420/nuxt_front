<template lang="pug">
  b-container.header.h-container
    b-col.no-padding
      .image-container(@click="logout()")
        img.logo(src="~/assets/JG/jungroup_white.svg")
      
    template(v-if='showCreateAccount')
      b-col.no-padding(style="text-align: right;")
        .sign-in-text
          div.light-text No account?
          nuxt-link.inline.red-link(to="/") Create one.
    template(v-else-if="showLogin")
      b-col.no-padding(style="text-align: right;")
        .sign-in-text
          div.light-text Already have an account?
          nuxt-link.inline.red-link(to="/auth/login") Sign In.
    //- template(v-else)
    //-   b-col.right-menu.light-text
    //-     nuxt-link.mr-4(to="/creative-services") Creative Services
    //-     nuxt-link.mr-4(to="/fag") FAQ
    //-     b-dropdown.dropdown-actions(
    //-       right
    //-       variant="link"
    //-       toggle-class="text-decoration-none"
    //-       no-caret
    //-     )
    //-       template(slot="button-content")
    //-         .span Hi, Laura
    //-         img(src="~/assets/icon/arrow_small.svg")
    //-       .b-dropdown-item(@click="logout") Logout               
    //- template(v-if='false')
    //-   //- cols for dashboard links
</template>
<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
    showLogin() {
      /** show login button if on the registration page only */
      // return false
      return !this.showCreateAccount
    },
    showCreateAccount() {
      /** show only on login page */
      return (
        this.$route.path === "/auth/login" ||
        this.$route.path === "/auth/login/"
      )
    },
  },
  methods: {
    logout() {
      this.$store.commit("auth/logout")
      this.$router.push("/auth")
    },
  },
}
</script>
<style lang="sass">
.h-container
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  max-width: 100%
  padding: 0

.sign-in-text
  margin-right: 50px
  text-align: right

.no-padding
  padding: 0

.image-container
  width: 60px
  height: 60px
  position: relative
  overflow: hidden
  border-radius: 50%
  background-color: #DE001C
  display: flex
  margin-left: 50px

.logo
  display: inline
  margin: auto
  height: 37.2%
  width: auto

#circle
  border-radius: 50%
  width: 60px
  height: 60px
  background-color: #DE001C
  background-size:50px 0px

.company-header-avatar
    width: 60px
    height: 60px
    -webkit-border-radius: 60px
    -webkit-background-clip: padding-box
    -moz-border-radius: 60px
    -moz-background-clip: padding
    border-radius: 60px
    background-clip: padding-box
    margin: 7px 0 0 5px
    // float: left
    background-size: cover
    background-position: center center




// .image-container
//   height: 60px
//   width: 60px
//   background-color: #DE001C
//   border-radius: 50%
//   align-self: left
//   display: inline-block
</style>
