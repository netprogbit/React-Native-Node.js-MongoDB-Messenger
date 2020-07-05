const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const jwtConfig = require('../configs/jwt-config');
const asyncHandler = require('express-async-handler');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.key,
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, asyncHandler(async (payload, done) => {

      const user = await User.findById(payload.userId).select('email id');

      if (user)
        done(null, user);
      else
        done(null, false);
    }))
  );
};
