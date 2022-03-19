const express = require("express");
const cors = require('cors');
const passport = require("./middlewares/passport");

const userRoute = require("./routes/userRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const userPlanRoute = require("./routes/userPlanRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

app.use(passport.initialize());

app.use("/v1/user", userRoute);
app.use("/v1/plan", passport.authenticate('jwt', { session: false }), userPlanRoute);
app.use("/v1/user/dashboard", passport.authenticate('jwt', { session: false }), dashboardRoute);

module.exports = app;