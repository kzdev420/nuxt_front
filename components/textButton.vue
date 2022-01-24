<template lang="pug">
  div.position-relative(:style="marginComp")
    b-form-input.submit-button.btn-secondary.btn-block.text-form-btn(:disabled="disabled" 
                                                                      :style="style" 
                                                                      :placeholder="placeholder"
                                                                      :type="type"
                                                                      @input="(i) => $emit('input', textFilter(i))"
                                                                      )
    template(v-if='dropdown.show')
      v-divider.no-space-divider
      b-card.submit-button.password-reset-dropdown(align="center"
                                                   style="border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;"
                                                   v-if="dropdown.message"
                                                   )
        .password-error-text
          | {{ dropdown.message }}
</template>
<script>
import Filters from "~/components/filters"

export default {
  mixins: [Filters],
  props: {
    placeholder: { type: String, required: true },
    disabled: { type: Boolean, required: false },
    value: { type: String, required: false, default: "" },
    filter: { type: Function, required: false, default: null },
    type: { type: String, required: false, default: "text" },
    /** top, right/left, bottom */
    dropdown: {
      type: Object,
      required: false,
      default: () => ({ show: false, message: "" }),
    },
    margin: { type: Array, required: false, default: () => [] },
  },
  data() {
    return {
      hover: false,
    }
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
    dropdownStyle() {
      if (this.dropdown.show)
        return "border-bottom-right-radius: 0px !important; border-bottom-left-radius: 0px !important;"
      else return ""
    },
    style() {
      if (this.inactive)
        return (
          "opacity: 0.3 !important; pointer-events: none;" + this.dropdownStyle
        )
      return "" + this.dropdownStyle
    },
  },
}
</script>
<style lang="sass" scoped></style>
