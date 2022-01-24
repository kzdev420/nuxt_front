<template lang="pug">
  input.submit-button.btn-secondary.btn-block.text-uppercase(type='submit' v-model="text" @click="$emit('submit')" @mouseover="hover=true" @mouseleave="hover=false" :style='style' :disabled="inactive" style="font-size: 17px !important;")
</template>
<script>
export default {
  props: {
    text: { type: String, required: true },
    inactive: { type: Boolean, required: false },
    margin: { type: Array, required: false, default: () => [] },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    marginComp() {
      return this.margin.length
        ? `margin: ${this.margin[0]}px ${this.margin[1]}px ${this.margin[2]}px !important;`
        : ``
    },
    style() {
      if (this.inactive)
        return (
          "opacity: 0.3 !important; pointer-events: none;" + this.marginComp
        )
      return "" + this.marginComp
    },
  },
}
</script>
<style lang="sass" scoped></style>
