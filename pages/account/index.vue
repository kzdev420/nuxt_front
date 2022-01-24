<template lang="pug">
  b-container.page-account
    div.item-container.account-information
      div.item-header
        div.left-col
          div.title Account Information
        div.right-col
          EditButton(:status="isEditAccountInfo" @edit="handleEditAccountClick" @cancel="handleCalcelAccountClick")
      div.item-body
        b-row
          b-col(cols="12" sm="6")
            b-form-group(label="Name")
              b-form-input(v-model="form.name" placeholder="User Name" :disabled="!isEditAccountInfo")
          b-col(cols="12" sm="6")
            b-form-group(label="Role in the Business")
              BasicSelect(
                v-if="isEditAccountInfo"
                v-model="form.role"
                placeholder="Your Role"
                :options="$businessRoles"
                :reduce="role => role.value"
                label="text"
              )
              b-form-input(v-else v-model="form.role" placeholder="Your Role" :disabled="!isEditAccountInfo")
        b-row
          b-col(cols="12" sm="6")
            b-form-group(label="Business Name")
              b-form-input(v-model="form.business_name" placeholder="Business Name" :disabled="!isEditAccountInfo")
          b-col(cols="12" sm="6")
            b-form-group(label="Business Type")
              BasicSelect(
                v-if="isEditAccountInfo"
                v-model="form.business_type"
                placeholder="Business Type"
                :options="$businessTypes"
                :reduce="businessType => businessType.id"
                label="title"
              )
              b-form-input(v-else v-model="form.business_type" placeholder="Business Type" :disabled="!isEditAccountInfo")
        b-row
          b-col(cols="12" sm="6")
            b-form-group(label="Time Zone")
              b-form-input(v-model="form.timezone" placeholder="TimeZone" :disabled="!isEditAccountInfo")
        b-row(v-if="isEditAccountInfo")
          b-col.mx-auto(cols="12" sm="6")
            form-button(:text='"Save"')
    div.item-container.password-security
      div.item-header
        div.left-col
          div.title Password and Security
      div.item-body
        b-row
          b-col(cols="12" sm="6")
            form-button(:text='"Change Password"')
          b-col(cols="12" sm="6")
            form-button(:text='"Enable 2-Factor Authentication"')
    div.item-container.payment-information
      div.item-header
        div.left-col
          div.title Payment Information
        div.right-col
          EditButton
      div.item-body
        b-row
          b-col(cols="12" sm="8")
            b-form-group(label="Credit Card")
              b-form-input(v-model="paymentInfo.credit_card" placeholder="Credit Card" :disabled="!isEditPayment")
          b-col(cols="12" sm="4")
            b-form-group(label="Expiration Date")
              b-form-input(v-model="paymentInfo.expiration_date" placeholder="Expiration Date" :disabled="!isEditPayment")
        b-row
          b-col(cols="12" sm="4")
            b-form-group(label="CVC")
              b-form-input(v-model="paymentInfo.cvc" placeholder="CVC" :disabled="!isEditPayment")
          b-col(cols="12" sm="4")
            b-form-group(label="Zip Code")
              b-form-input(v-model="paymentInfo.zip_code" placeholder="Zip Code" :disabled="!isEditPayment")
</template>
<script>
export default {
  name: 'AccountPage',
  data: () =>({
    isEditAccountInfo: false,
    isEditPayment: false,
    form: {
      name: '',
      role: '',
      business_name: '',
      business_type: '',
      timezone: ''
    },
    paymentInfo: {
      credit_card: '',
      expiration_date: '',
      cvc: '',
      zip_code: ''
    }
  }),
  created() {
    console.log(this.$businessTypes)
  },
  methods: {
    handleEditAccountClick() {
      this.isEditAccountInfo = true
    },
    handleCalcelAccountClick() {
      this.isEditAccountInfo = false
    }
  }
}
</script>