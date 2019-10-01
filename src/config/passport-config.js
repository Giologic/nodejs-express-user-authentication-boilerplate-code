const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../api/users/users.models');

const secret = require('./base-config').jwtSecret;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const isTokenExpired = (payload) => {
  const now = new Date().getTime();
  const iat = payload.iat + 1296000000;

  return iat < now;
}

const JwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  if (isTokenExpired(payload)) {
    return done(null, false, {
      message: 'Unauthorized access. Token expired.',
    });
  }

  const user = await User.findById(payload.id);

  if (!user) {
    return done(null, false, { message: 'Unauthorized access.' })
  }

  return done(null, user);
});

module.exports = passport => {
  passport.use(JwtStrategy);
};