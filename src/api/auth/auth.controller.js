var User = require('../users/users.models')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('../../config/base-config')


const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const registerSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required(),
});

exports.register = async function(request, response) {
  const firstName = request.body.firstName
  const lastName = request.body.lastName
  const email = request.body.email
  const password = request.body.password

  try {
    const body = await Joi.validate(request.body, registerSchema);
    if (body.error) {
      return response.status(422).send(body.error);
    }
    const userExists = await User.find({ email: body.email })
    if(userExists.length === 0 ) {
      if (body.confirmPassword === body.password) {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password
        });
        return response.status(201).send(user.toJSON());
      } else {
        return response.status(422).send({"error": "Passwords do not match"})
      }
    } else {
      return response.status(302).send({"error": "Email has already been taken"})
    }
  } catch (error) {
    return response.status(422).send(error)
  }
};

exports.login = async function (request, response) {
  try {
    const body = await Joi.validate(request.body, loginSchema);
    if (body.error) {
      return response.status(400).send(validate.error);
    }
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return response.status(404).send({ message: 'User not found' });
    }
    const passwordMatch = await user.comparePassword(body.password.toString());
    if (!passwordMatch) {
      return response.status(422).send({ message: 'Invalid password' });
    }
    const payload = {
      id: user.id,
      iat: new Date().getTime(),
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return response.status(200).send({
      message: 'Successfully Logged in',
      token: `Bearer ${token}`,
    });
  } catch (error) {
    return response.status(400).send(error);
  }
}
