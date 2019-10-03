const bcrypt = require('bcryptjs');

const hash = (str) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => { // generate random salt
      if (err) {
        return reject(err);
      }
      // salt is ready, generate the hash
      bcrypt.hash(str, salt, null, (err, hash) => {
        if (err) {
          return reject(err);
        }
        // Hash is ready, resolve the promise
        return resolve(hash);
      });
    });
  });
}

const compare = (str, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, (err, result) => {
      if (err) {
        return reject(err);
      }
      // if the result is available, resolve the promise, otherwise reject
      return resolve(result);
    });
  });
}

module.exports = {
  hash,
  compare
}