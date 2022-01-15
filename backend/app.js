const express = require("express");
const userRoute = require("./routes/userRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const cors = require('cors');
const passport = require("./middlewares/passport");
// var bodyParser = require('body-parser');


const app = express();

// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json()); 

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

app.use(passport.initialize());

app.use("/admin", userRoute);

app.use("/dashboard", passport.authenticate('jwt', { session: false }), dashboardRoute);

module.exports = app;