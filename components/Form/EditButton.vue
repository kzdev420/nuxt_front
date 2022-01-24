<template lang="pug">
  a.btn-custom-edit(:class="{ cancel: status}" @click.prevent="handleClick")
    img(:src="srcIcon")
    div.normal-text {{ text }}
</template>
<script>
export default {
  name: 'EditButton',
  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    srcIcon() {
      return this.status
        ? require(`~/assets/icon/cancel_icon.svg`)
        : require(`~/assets/icon/edit_icon_${this.color}.svg`)
    },
    text() {
      return this.status ? 'Cancel' : 'Edit'
    }
  },
  methods: {
    handleClick() {
      if (this.status) {
        this.$emit('cancel')
      } else {
        this.$emit('edit')
      }
    }
  }
}
</script>