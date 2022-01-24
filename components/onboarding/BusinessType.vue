<template lang="pug">
  div.business-type(:key="`business-type-${cnt}`")
    div.subtitle What's your business type?
    b-form(@submit.prevent="$emit('next', value)")
      b-row.no-margin
        b-col.no-padding(v-for="(type, index) in $businessTypes" :key="index" cols="3")
          div.type-container(href="#" @click.prevent="selectType(type)" :class="{ active: typeId === type.id }")
            div.type-image-container
              img(v-if="type.url" :src="type.url")
            div.normal-text {{ type.title }}
      text-button(:margin='[20,0,0]' :type="'text'" v-model='otherType' :placeholder='"Other"' :key='`other-${cnt}`')
      form-button(:text='"NEXT"' :margin='[100,0,45]' :inactive="!formComplete")
</template>
<script>
import Filters from "~/components/filters"

export default {
  name: "BusinessType",
  mixins: [Filters],
  props: {
    value: { type: Object, default: () => ({}) },
  },
  data: () => ({
    business_type: "",
    typeId: 0,
    otherType: "",
    cnt: 0,
  }),
  computed: {
    formComplete() {
      return !!this.business_type
    },
  },
  watch: {
    business_type(value) {
      this.$emit("input", {
        business_type: this.textFilter(value),
        // other: this.typeId === 0,
      })
    },
    otherType(value) {
      if (value) {
        this.typeId = 0
        this.business_type = value
      }
    },
  },
  created() {
    /** fill fields in from props on creation */
    if (
      this.value.business_type &&
      this.$businessTypes.some((t) => t.type == this.value.business_type)
    ) {
      this.business_type = this.value.business_type
      this.typeid = this.$businessTypes.filter(
        (t) => t.type == this.business_type
      ).id
    } else if (this.value.business_type) {
      // this.business_type = this.value.business_type
      this.otherType = this.value.business_type
    }
    this.cnt++
  },
  methods: {
    selectType(type) {
      if (type.id === this.typeId) {
        /** unselect */
        this.typeId = 0
        this.business_type = ""
        this.otherType = ""
      } else {
        this.typeId = type.id
        this.business_type = type.type
        this.otherType = ""
        this.cnt++
      }
    },
  },
}
</script>
