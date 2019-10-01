// auth.services.js
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const baseConfig = require('../../config/base-config')
const User = require('../users/users.models')


/*
* Checks if the data passed for registration fits the requirements
*/
exports.validateUserRegistration = function(user) {

  const registerSchema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
  });

  const data = Joi.validate(user, registerSchema);

  if (data.error) {
    throw Error(data.error)
  }

}

/*
* Checks if another user with the same email exists
*/
exports.checkDuplicateUser = async function(data) {
  const userExists = await User.find({ email: data.email })
  if(userExists.length !== 0) throw Error("Email has already been taken.")
}

/*
* Checks if passwords do not match
*/
exports.checkIfPasswordsNotMatching = function(data) {
  if (data.confirmPassword !== data.password) throw Error("Passwords do not match.")
}

/*
* Checks if the password for the user matches
*/
exports.checkIfPasswordsMatch = async function(user, password) {
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) throw Error("Invalid password.")
}

/*
* Serializes the user
*/
exports.createUserSerialized = async function(data) {
  const user = await User.create(data);
  return user.toJSON()
}

/*
* Creates a serialized token payload for the user about to login
*/
exports.createTokenSerialized = function(data) {
  const payload = {
    id: data.id,
    iat: new Date().getTime(),
  };
  const token = jwt.sign(payload, baseConfig.jwtSecret);
  return {
    message: 'Successfully Logged in',
    token: `Bearer ${token}`,
  }
}

/*
* Checks if the data passed for login fits the requirements
*/
exports.validateUserLogin = function(user) {

  const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const data = Joi.validate(user, loginSchema);

  if (data.error) {
    throw Error(data.error)
  }
}

/*
* Checks if the user logging in actually exists
*/
exports.checkIfUserExists = async function(user) {
  const data = await User.findOne({ email: user.email });
  if (!data) throw Error("User not found.")

  return data
}


