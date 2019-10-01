// users.routes.js

var controller = require('./users.controller')
const { requireJwt } = require('../../middleware/auth/passport-middleware');

module.exports = function(router) {
  router.get('/users/me', requireJwt, controller.getMe)
}