import Vue from "vue"
import Router from "vue-router"
import _ from "lodash"
// import regexp from "~/plugins/route-utils"
import ErrorPage from "./layouts/error"

/** auth routes */
import Login from "./pages/auth/login.vue"
import Register from "./pages/auth/index.vue"
import PasswordReset from "./pages/auth/passwordreset.vue"
import PasswordResetRedirect from "./pages/auth/_passwordtoken"

/** signup/onboarding routes */
import Onboarding from "./pages/signup/index"

/** dashboard */
import Dashboard from "./pages/dashboard/index"

Vue.use(Router)

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions
    ? routerOptions
    : createDefaultRouter(ssrContext).options
  const router = new Router({
    ...options,
    routes: addRoutes(options.routes),
  })
  return router
}

/** adds to default routes that come from `pages/` */
const addRoutes = (currentRoutes) => {
  currentRoutes.unshift(
    {
      name: "register",
      path: "/",
      component: Register,
      alias: ["/auth"],
    },
    {
      name: "login",
      path: "/auth/login",
      component: Login,
    },
    {
      name: "password-reset",
      path: "/auth/passwordreset",
      component: PasswordReset,
    },
    {
      name: "password-reset-redirect",
      path: "/auth/:passwordtoken",
      component: PasswordResetRedirect,
      props: (route) => ({
        passwordtoken: route.params.passwordtoken,
        email: route.query.email,
      }),
    },
    {
      name: "onboarding",
      path: "/signup",
      component: Onboarding,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    }
  )

  currentRoutes.push(
    /** default route handler last (to override nuxt version) */
    {
      name: "404",
      path: "*",
      component: ErrorPage,
    }
  )
  /** remove routes with same paths/route defintions, 
  taking the ones manually made at a higher priority */
  return _.uniqWith(
    currentRoutes,
    (val, other) =>
      _.intersection(
        [val.path, ...(val.alias || [])],
        [other.path, ...(other.alias || [])]
      ).length
  )
}
