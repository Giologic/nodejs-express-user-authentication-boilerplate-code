const AuthService = require('../auth/auth.services')

/*
* Registers a user if the user does not exist
*/
exports.register = async function(request, response, next) {
  const data = request.body
  let serializedData;

  try {
    AuthService.validateUserRegistration(data)
  } catch (error) {
    return response.status(422).send({"error": error.message })
  }

  try {
    await AuthService.checkDuplicateUser(data)
  } catch (error) {
    return response.status(302).send({"error": error.message })
  }

  try {
    AuthService.checkIfPasswordsNotMatching(data)
  } catch (error) {
    return response.status(422).send({"error": error.message })
  }

  try {
    serializedData = await AuthService.createUserSerialized(data)
  } catch (error) {
    return response.status(400).send({"error": error.message })
  }
  return response.status(201).send(serializedData);
};

/*
* Login using username and password
*/
exports.login = async function (request, response) {
  const data = request.body
  let serializedData
  let user

  try {
    AuthService.validateUserLogin(data)
  } catch (error) {
    return response.status(422).send({"error": error.message })
  }

  try {
    user = await AuthService.checkIfUserExists(data)
  } catch (error) {
    return response.status(404).send({"error": error.message })
  }

  try {
    await AuthService.checkIfPasswordsMatch(user, data.password)
  } catch(error) {
    return response.status(422).send({"error": error.message });
  }

  serializedData = AuthService.createTokenSerialized(user)
  return response.status(200).send(serializedData);
}
