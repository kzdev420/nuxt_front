import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
 
const gAuthOptions = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
  // switch to select_account for lesser security permissions
}

Vue.use(GAuth, gAuthOptions)