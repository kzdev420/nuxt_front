<template lang="pug">
  button.submit-button.btn-secondary.btn-block.btn-lg.google-btn(
    type='button'
    @click="$emit('click')" 
    @mouseover="hover=true" 
    @mouseleave="hover=false" 
  )
    //- :disabled="inactive"
    img.google-btn-img(src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width='30px' height='30px' align='left')
    p.google-btn-text {{text}}
    
</template>
<script>
export default {
  props: {
    signin: { type: Boolean, required: false },
    inactive: { type: Boolean, required: false },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    text() {
      return this.signin ? "Log In with Google" : "Sign up with Google"
    },
  },
}
</script>
<style lang="sass"></style>
