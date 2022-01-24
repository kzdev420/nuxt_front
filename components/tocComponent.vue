<template lang="pug">
  div.login-title(style="height: 20px !important; width: 356px !important;")
    div.red.customcb
      input(type='checkbox' value='1' id='checkboxx')
      label.inner(for='checkboxx')
      label.outer(for='checkboxx') Testing the tet
    //- p.login-title(:style="style") 
</template>
<script>
export default {
  props: {
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
<style scoped>
/* .customcb {
  width: 17px;
  height: 17px;
  margin: 2px 0 2px 0;
  background: #ddd;
  border-radius: 100%;
  position: relative;
  box-shadow: 1px 1px 0px rgba(40, 40, 40, 0.06),
    0px 0px 10px rgba(40, 40, 40, 0.1);
}
.customcb label.inner {
  display: block;
  width: 12.75px;
  height: 12.75px;
  border-radius: 100px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
  cursor: pointer;
  position: absolute;
  top: 2.125px;
  left: 2.125px;
  z-index: 1;
  background: #eee;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
}
.customcb label.outer {
  margin-left: 25px;
}
.customcb [type="checkbox"] {
  display: none;
}
.red.customcb input[type="checkbox"]:checked + label.inner {
  background: red;
} */
.customcb {
  width: 17px;
  height: 17px;
  margin: 2px 0 2px 0;
  background: #ddd;
  border-radius: 100%;
  position: relative;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}
.customcb label.inner {
  display: block;
  width: 12.75px;
  height: 12.75px;
  border-radius: 100px;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
  cursor: pointer;
  position: absolute;
  top: 2.125px;
  left: 2.125px;
  z-index: 1;
  background: #eee;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
}
.customcb label.outer {
  margin-left: 25px;
}
.customcb [type="checkbox"] {
  display: none;
}
.red.customcb input[type="checkbox"]:checked + label.inner {
  background: red;
}
</style>
