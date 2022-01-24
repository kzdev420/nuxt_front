import axios from "axios"
import _ from "lodash"

class APIClient {
  constructor() {
    this.api = axios.create({
      /** read base url from env variables */
      baseURL: `${process.env.BASE_API_URL}`,
      timeout: 10000,
      headers: {
        accept: "application/json",
        common: {
          Accept: "application/json",
        },
      },
    })
    console.log("api client created")
  }

  isAuthenticated() {
    return this.api.defaults.headers.common["Authorization"]
      ? this.api.defaults.headers.common["Authorization"].length > 20
      : false
  }

  updateHeaders(token = null) {
    if (token)
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    else delete this.api.defaults.headers.common["Authorization"]
    return this
  }

  /** route: '/accounts...'
   *  type: 'GET', 'POST'
   *  payload: obj
   */
  async request(route, type, payload = null) {
    const req = {
      url: route,
      method: type,
    }
    if (payload) req.data = payload
    console.log("api request recieved  --->", req)
    try {
      const response = await this.api(req)
      console.log("response recieved   --->", response)
      return response.data
    } catch (err) {
      console.error("error in api request   --->", err)
      throw err
    }
  }

  /** request:
   *   params  = { email, password } */
  async login(payload) {
    const response = await this.request("/account_token", "POST", {
      auth: payload,
    })
    return response.jwt
  }

  /** Response:
   *  {  "email": "john.doe@accurate.com",
   *			"name": "John Doe",
   *			"business_name": "McDonalds",
   *			"business_type": "restaurant",
   *			"role": "Manager",
   *			"password": "password"  }
   */
  async getUser() {
    if (this.isAuthenticated) return await this.request("/accounts/me", "GET")
    else return "not authenticated"
  }

  /** params = { email, password, terms }
   * response = { id, name, email }
   */
  async register(payload) {
    return await this.request("/accounts", "POST", { account: payload })
  }

  /** params = { authCode }
   * response = { }
   */
  async registerGoogle(payload) {
    return await this.request("/google_signin", "POST", payload)
  }

  /** Request:
   *   {  "email": "john.doe@accurate.com",
   *			"name": "John Doe",
   *			"business_name": "McDonalds",
   *			"business_type": "restaurant",
   *			"role": "Manager",
   *			"password": "password"  }
   */
  async updateUser(payload) {
    return await this.request("/accounts/me", "PATCH", payload)
  }

  /** params = { email } */
  async resetPassword(payload) {
    return await this.request("/passwords", "POST", payload)
  }

  /**
   * PATCH /api/passwords/{token} (from user's email)
   *  { email, password, password_confirmation }
   */
  async updatePassword(payload, reset_token) {
    return await this.request(`/passwords/${reset_token}`, "POST", {
      account: payload,
    })
  }
}
/** inject into Vue as $api */
export default (context, inject) => {
  const a = new APIClient()
  inject("api", a)
}
