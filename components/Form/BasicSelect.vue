<template lang="pug">
    v-select.BasicSelect(
        :class="{ 'is-invalid': !state }"
        :label="label"
        :value="value"
        :placeholder="placeholder"
        :options="options"
        :reduce="reduce"
        :clearable="false"
        @input="handleInput"
    )
        template(v-slot:open-indicator)
            img(src="@/assets/icon/arrow_big.svg")
</template>

<script>
import vSelect from "vue-select"

export default {
  name: "BasicSelect",
  components: {
    vSelect,
  },
  props: {
    value: {
      type: [String, Object],
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array,
    },
    reduce: {
      type: Function,
    },
    state: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: "select-arrow",
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value)
    },
  },
}
</script>
