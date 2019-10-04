const mongoose = require('mongoose');
const config = require('./src/config/base-config')
const Logger = require('./src/logger/logger')


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

User.create([{
  firstName: 'Gio',
  lastName: 'Velez',
  email: 'gio@test.com',
  password: 'gio12345'
}, {
  firstName: 'JP',
  lastName: 'Tan',
  email: 'jp@test.com',
  password: 'jp123456'
}])

.then(user => {
  console.log(`${user.length} users created`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  mongoose.connection.close();
});