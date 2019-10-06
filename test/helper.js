
const faker = require('faker')

const genPassword = faker.internet.password(length=8)

const testUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: genPassword,
  confirmPassword: genPassword
}

module.exports = {
  testUser
}