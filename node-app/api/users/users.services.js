// users.services.js
const User = require('../users/users.models')

exports.getMe = async function(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw Error("User not found.")
  }
  return user
}

exports.getUsers = async function(query) {
  return await User.find(query);
}