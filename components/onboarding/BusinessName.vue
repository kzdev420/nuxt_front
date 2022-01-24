<template lang="pug">
  div.business-name
    b-form(@submit.prevent="$emit('next', value)")
      login-title(:text="'Get Started!'" :type="'title'" :margin="[0,0,44]")
      p.text-center.subtitle What's your business name and landing page?
      text-button(:margin='[34,0,20]' :type="'text'" v-model='business_name' :placeholder='"Business Name"' @input="(d) => $emit('input', Object.assign(value, { business_name: textFilter(d) }))")
      text-button(:margin='[20,0,143]' :type="'text'" v-model='business_url' :placeholder='"Landing Page (url)"' @input="(d) => $emit('input', Object.assign(value, { business_url: textFilter(d) }))")
      form-button(:text='"NEXT"' :margin='[0,0,45]' :inactive="formComplete")
</template>
<script>
import Filters from "~/components/filters"

export default {
  name: "BusinessName",
  mixins: [Filters],
  props: {
    value: { type: Object, default: () => ({}) },
  },
  data: () => ({
    business_name: "",
    business_url: "",
  }),
  computed: {
    formComplete() {
      return (
        !this.textFilter(this.business_name) ||
        !this.urlFilter(this.business_url)
      )
    },
  },
  created() {
    /** fill fields in from props on creation */
    this.business_name = this.value.business_name
    this.business_url = this.value.business_url
  },
}
</script>
