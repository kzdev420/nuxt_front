<template lang="pug">
  div.step-bar
    div.step-container(
      v-for="n in allStep"
      :key="`step-${n}`"
      :class="getClassName(n)"
    )
      div.step-circle(@click="handleClick(n)")
</template>
<script>
export default {
  name: "StepBar",
  props: {
    allStep: {
      type: Number,
    },
    currentStep: {
      type: Number,
    },
  },
  methods: {
    getClassName(num) {
      if (num === this.currentStep) {
        return "current completed"
      } else if (num < this.currentStep) {
        return "completed"
      }
    },
    handleClick(data) {
      this.$emit("move", data)
      // console.log(data)
    },
  },
}
</script>
