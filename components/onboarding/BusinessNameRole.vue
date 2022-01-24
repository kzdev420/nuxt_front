<template lang="pug">
  div.business-name
    login-title(:text="'Now, let’s get to know each other!'" :type="'title'" :margin="[0, 0, 44]")
    p.text-center.subtitle What's your name and role?
    b-form(@submit.prevent="$emit('next', value)")
      text-button(:margin='[34, 0, 20]'
                  :type="'text'"
                  v-model='name'
                  :placeholder='"User Name"'
                  @input="(d) => $emit('input', Object.assign(value, { name: textFilter(d) }))"
                  )
      BasicSelect(
        v-model="role"
        placeholder="Your Role"
        :options="$businessRoles"
        :reduce="role => role.value"
        label="text"
        :dropdown="dropdown"
        @open="dropdown = true"
        @close="dropdown = false"
      )
      text-button(:margin='[20, 0, 20]' v-if="role === 'other'" :type="'text'" v-model='role_other' :placeholder='"Role"'  @input="(d) => $emit('input', Object.assign(value, { role: textFilter(d) }))")
      form-button(:text='"CREATE ACCOUNT"' :margin='buttonMargin' :inactive="!formComplete")
</template>
<script>
import Filters from "~/components/filters"

export default {
  name: "BusinessNameRole",
  mixins: [Filters],
  props: {
    value: { type: Object, default: () => ({}) },
  },

  data: () => ({
    name: "",
    role: "",
    role_other: "",
    dropdown: false,
  }),
  computed: {
    formComplete() {
      return (
        !!this.textFilter(this.name) &&
        !!(
          (this.textFilter(this.role) !== "other" &&
            !!this.textFilter(this.role)) ||
          (this.role === "other" && !!this.textFilter(this.role_other))
        )
      )
    },
    buttonMargin() {
      return this.role === "other" ? [110, 0, 45] : [185, 0, 45]
    },
  },
  watch: {
    role(value) {
      if (value && value !== "other") {
        this.$emit(
          "input",
          Object.assign(this.value, { role: this.textFilter(value) })
        )
      } else if (value === "other") {
        this.$emit("input", Object.assign(this.value, { role: "" }))
      }
    },
  },
}
</script>
