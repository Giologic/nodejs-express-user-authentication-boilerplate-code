// users.controller.js

const UserService = require('./users.services');

/*
* Retrieve current user
*/
exports.getMe = async function(request, response, next) {
  let user;
  try {
    user = await UserService.getMe(request.user._id);
    return response.status(200).send(user.toJSON());
  } catch (error) {
    return response.status(400).send({ error: error })
  }

}
