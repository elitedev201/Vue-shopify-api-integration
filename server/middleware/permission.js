const jwtAuthz = require("express-jwt-authz")

const checkPermissions = jwtAuthz(["manage:users"], {
  customScopeKey: "permissions",
})

module.exports = checkPermissions