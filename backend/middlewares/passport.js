const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");

const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

let ExtractJwt = passportJWT.ExtractJwt;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";

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
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

module.exports = passport;
