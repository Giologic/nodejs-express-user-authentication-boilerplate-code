var config = require('../config/base-config')
var mongoose = require('mongoose')

function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(config.dbUrl, config.mongooseOptions)
            .then((res)=>{
                resolve()
            })
            .catch(error => console.log(error))

        })
    } else {
      mongoose.connect(config.dbUrl, config.mongooseOptions)
        .then((res)=>{
            resolve()
        })
        .catch(error => console.log(error))
    }
  })
}

function close() {
  return mongoose.disconnect();
}

module.exports = {
  connect,
  close
}