const mongoose = require('mongoose');
const faker = require('faker')
const db = require('./src/db/index')

const Logger = require('./src/logger/logger')
const User = require('./src/api/users/users.models');

db.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}, Initialize seeding...`))
  })
  .catch((error) => console.log(`Unable to connect to MongoDB server`))



try {
  User.collection.drop();
} catch (error) {
  Logger.warn(error)
}

generatedUsers = []

for(let i = 0; i < 5; i++) {
  generatedUsers.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: "password",
  })
}

User.create(generatedUsers)
.then(user => {
  console.log(`${user.length} users created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});