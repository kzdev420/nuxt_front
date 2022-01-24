import _ from "lodash"

export const state = () => ({
  /** holds current status (loading, verification) */
  status: null,
  user: null,
  token: null,
  expiration: null,
  error: [],
  password_reset_token: null,
  google_access_token: null,
  // recaptcha_token: null,
})
export const mutations = {
  loading(state) {
    state.status = "loading"
  },
  error(state, err) {
    state.error.push(err)
    console.error(err)
  },
  done(state) {
    state.status = null
  },
  logout(state, err = null) {
    state.token = null
    state.user = null
    state.expiration = null
    state.google_access_token = null
    // state.recaptcha_token = null
    this.$api.updateHeaders()
    localStorage.clear()
    if (err) state.error.push(err)
  },
  setUser(state, user) {
    state.user = _.clone(user)
  },
  setExpiration(state, expiration) {
    state.expiration = expiration
  },
  setToken(state, token) {
    state.token = token
    this.$api.updateHeaders(token)
  },
  setGoogleToken(state, token) {
    state.google_access_token = token
  },
  // setRecaptchaToken(state, token) {
  //   state.recaptcha_token = token
  // },
  updateClient(state) {
    this.$api.updateHeaders(state.token)
  },
  updateLocalStorage(state) {
    localStorage.setItem("auth_token", state.token)
    localStorage.setItem("expiration", state.expiration)
    localStorage.setItem("user", state.user)
    localStorage.setItem("google_access_token", state.google_access_token)
  },
}
export const actions = {
  /** called on page load to attempt signin from local storage */
  initialize({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("loading")
      const token = localStorage.getItem("auth_token")
      // const expiration = localStorage.getItem('expiration')
      /** TODO: add comparison for checking expiration date of token */
      if (!token || token == "") {
        localStorage.clear()
        reject("unauthenticated")
        commit("done")
        return
      }
      commit("setToken", token)
      dispatch("getUser")
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  /** params: { email, password } */
  login({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit("loading")
      commit("logout") // wipe store before attempting login
      this.$api
        .login(user)
        .then((token) => {
          commit("setToken", token)
          // commit('setExpiration', expiration)
          commit("updateLocalStorage")
          /** also grab information for user after login */
          dispatch("getUser")
            .then((result) => {
              resolve(result)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => commit("done"))
        })
        .catch((err) => {
          commit("error", err)
          commit("done")
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  /** params: { email, password } */
  register({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit("loading")
      commit("logout") // logout before registering new account
      this.$api
        .register(user)
        .then((resp) => {
          /** TODO: does the customer need to verify email? */
          /** for now, just automatically sign in (which will grab user data) */
          dispatch("login", user)
            .then((result) => {
              resolve(result)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => commit("done"))
        })
        .catch((err) => {
          commit("error", err)
          commit("done")
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  /** params: { auth: authCode } */
  registerGoogle({ commit, dispatch }, authCode) {
    return new Promise((resolve, reject) => {
      commit("loading")
      commit("logout") // logout before registering new account
      this.$api
        .registerGoogle(authCode)
        .then((resp) => {
          commit("setGoogleToken", "registeredGoogle")
          commit("setToken", resp.jwt)
          dispatch("getUser")
            .then((result) => {
              resolve(result)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => commit("done"))
        })
        .catch((err) => {
          commit("error", err)
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      commit("loading")
      if (!this.$api.isAuthenticated()) commit("updateClient")
      this.$api
        .getUser()
        .then((user) => {
          commit("setUser", user)
          commit("updateLocalStorage")
          resolve(user)
        })
        .catch((err) => {
          commit("logout", err)
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  /** Request:
   *   {  "email": "john.doe@accurate.com",
   *			"name": "John Doe",
   *			"business_name": "McDonalds",
   *			"business_type": "restaurant",
   *			"role": "Manager",
   *			"password": "password"  }
   */
  updateUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("loading")
      this.$api
        .updateUser(user)
        .then((user) => {
          commit("setUser", user)
          commit("updateLocalStorage")
          resolve("success")
        })
        .catch((err) => {
          commit("error", err)
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  /** Request:
   * { email, password, password_confirmation } */
  updatePassword({ commit, dispatch }, account, resetToken) {
    return new Promise((resolve, reject) => {
      commit("loading")
      this.$api
        .updatePassword(account, resetToken)
        .then((resp) => {
          /** auto-login if successful */
          const user = {
            email: account.email,
            password: account.password,
          }
          dispatch("login", user)
            .then((result) => {
              resolve(result)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => commit("done"))
        })
        .catch((err) => {
          commit("error", err)
          commit("done")
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },

  /** params = { email } */
  resetPassword({ commit }, email) {
    return new Promise((resolve, reject) => {
      commit("loading")
      this.$api
        .resetPassword(email)
        .then((resp) => {
          resolve("success")
        })
        .catch((err) => {
          commit("error", err)
          reject(err)
        })
        .finally(() => commit("done"))
    })
  },
}
export const getters = {
  authenticated: (state) =>
    !!state.token || !!localStorage.getItem("auth_token"),
  loading: (state) => state.status === "loading",
  token: (state) => state.token,
  googleToken: (state) =>
    !!state.google_access_token ||
    !!localStorage.getItem("google_access_token"),
  user: (state) => state.user,
  self: (state) => state,
}
