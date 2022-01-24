import regexp from "~/plugins/route-utils"
/** contains all the routes allowed without authentication */

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    /** block users from all other links except for login
     *           unless authenticated                  */
    if (
      !store.getters["auth/authenticated"] &&
      regexp.every((r) => !r.exec(to.path))
      // !from.name
    ) {
      console.log("user is unauthenticated, redirecting to registration page")
      // next()
      next("/")
      return
    } else {
      next() // continue as normal
    }
  })
}
