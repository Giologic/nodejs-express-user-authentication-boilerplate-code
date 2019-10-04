const mongoose = require('mongoose');
const config = require('./src/config/base-config')
const Logger = require('./src/logger/logger')
const faker = require('faker')

const User = require('./src/api/users/users.models');

mongoose.connect(
  config.dbUrl, config.mongooseOptions).then(()=>{
  Logger.debug('MongoDB is connected')
}).catch(err=>{
  Logger.error('MongoDB connection unsuccessful, retry after 5 seconds.')
  Logger.error('Error', err)
  setTimeout(connectWithRetry, config.port)
})

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