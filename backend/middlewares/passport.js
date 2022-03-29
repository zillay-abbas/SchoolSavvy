const passport = require("passport");
const passportJWT = require("passport-jwt");
<<<<<<< HEAD
const jwt = require("jsonwebtoken");

const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
=======
const { User } = require("../models/userModel");
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

let ExtractJwt = passportJWT.ExtractJwt;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";

<<<<<<< HEAD
const getUsr = async (email) => {
  let user; 
  user = await prisma.users.findMany({
    where: {
      email: email,
    },
  });
  return user;
}

let strategy = new JwtStrategy(jwtOptions,async function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = await getUsr({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
=======
let strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  try {
    let user = await User.getUserbyID(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (error) {
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

module.exports = passport;
