<template lang="pug">
  p.login-title(:style="style") {{text}}
</template>
<script>
export default {
  props: {
    text: { type: String, required: true },
    type: { type: String, required: false, default: "" },
    /** top, right/left, bottom */
    margin: { type: Array, required: false, default: [] },
  },
  data() {
    return {}
  },
  computed: {
    filterResult() {
      if (this.filter) return this.filter(this.value)
      return null
    },
    marginComp() {
      return this.margin.length
        ? `margin: ${this.margin[0]}px ${this.margin[1]}px ${this.margin[2]}px !important;`
        : ``
    },
    style() {
      if (this.type == "title") {
        return (
          "font-size: 25px !important; line-height: 36px !important; font-weight: 500px !important; font-family: 'Gotham-medium-normal' !important;" +
          this.marginComp
        )
      }
      return "" + this.marginComp
    },
  },
}
</script>
<style lang="sass" scoped></style>
