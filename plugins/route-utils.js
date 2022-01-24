import { pathToRegexp } from "path-to-regexp"
/** contains all the routes allowed without authentication */

let authRoutes = [
  "/",
  "/auth",
  "/auth/password",
  "/auth/login",
  "/auth/passwordreset",
  "/auth/:token",
]
/** need strict matching if route ends with a token */
const endsWithToken = (str) =>
  !str.split(":")[str.split(":").length - 1].includes("/")
const regexp = authRoutes.map((r) =>
  pathToRegexp(r, [], { strict: endsWithToken(r) })
)

export default regexp
