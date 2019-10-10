// auth.routes.js
var controller = require('./auth.controller')

module.exports = function(router) {
  router.post('/auth/login', controller.login)
  router.post('/auth/register', controller.register)
}