const passport = require("passport");
const passportJWT = require("passport-jwt");
const { Admin } = require('../models/userModel');

let JwtStrategy = passportJWT.Strategy;
let ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";

let strategy = new JwtStrategy(jwtOptions,async function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = await Admin.getAdminbyID( jwt_payload.id );
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

// use the strategy
passport.use(strategy);

module.exports = passport;
