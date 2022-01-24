<template lang="pug">
  div
</template>

<script>
export default {
  name: "NuxtError",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errorPage: true,
    }
  },
  created() {
    /** error page redirect to the authorization page */
    this.$router.push("/auth")
  },
}
</script>
