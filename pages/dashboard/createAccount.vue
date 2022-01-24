<template lang="pug">
  v-container(fluid fill-height)
    v-row(align="center" justify="center")
      v-col(align-self="center")
        v-window(v-model='step')
          v-window-item(v-for='(s,i) in steps' :key="`step-${i}`")
            v-card.mx-auto(shaped elevation=13 max-width='50%')
              |test
        v-card-actions
          v-item-group.mx-auto.mandatory(v-model='step')
            v-item(v-for='(s,i) in steps' :key='`button-${i}`' v-slot:default='{ active, toggle }')
              v-btn(:input-value='active' icon @click='toggle')
                v-icon mdi-record

</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      step: 0,
      steps: [
        {
          title: "Get Started",
          name: "What's your business name?",
          data: {
            name: "business_name",
            value: null,
          },
        },
        {
          title: "Get Started",
          name: "What's your business type?",
          value: null,
          options: {},
        },
      ],
      formData: {},
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      loading: "auth/loading",
      user: "auth/user",
    }),
  },
}
</script>

<style lang="sass">
.container
  height: 100vh
  justify-content: center
  align-items: center
  text-align: center

//   padding-left: 25vh
//   padding-right: 25vh
</style>
