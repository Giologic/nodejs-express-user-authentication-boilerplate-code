const passport = require('passport');

const options = {
  session: false,
};

const sendResponse = (req, res, next, error, user, info) => {
  if (error) {
    return res.status(401).send({ message: error.message });
  }
  if (info) {
    return res.status(401).send({ message: info.message });
  }
  req.user = user;
  next();
}

module.exports = {
  requireJwt(req, res, next) {
    return passport.authenticate('jwt', options, (error, user, info) => {
      return sendResponse(req, res, next, error, user, info);
    })(req, res, next);
  },
};
