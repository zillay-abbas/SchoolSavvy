const express = require("express");
const cors = require('cors');
const passport = require("./middlewares/passport");

const userRoute = require("./routes/userRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const userPlanRoute = require("./routes/userPlanRoute");
const classRoute = require("./routes/classRoute");
const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");
const subjectRoute = require("./routes/subjectRoute");
const parentRoute = require("./routes/parentRoute");
const examRoute = require("./routes/examRoute");
const attendanceRoute = require("./routes/attendanceRoute");
// const webhook = require("./routes/webhookRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

app.use(express.static('public'));

app.use(passport.initialize());

app.use("/v1/user", userRoute);
app.use("/v1/user/dashboard", passport.authenticate('jwt', { session: false }), dashboardRoute);
app.use("/v1/user/plan", passport.authenticate('jwt', { session: false }), userPlanRoute);
app.use("/v1/user/class", passport.authenticate('jwt', { session: false }), classRoute);
app.use("/v1/user/student", passport.authenticate('jwt', { session: false }), studentRoute);
app.use("/v1/user/teacher", passport.authenticate('jwt', { session: false }), teacherRoute);
app.use("/v1/user/subject", passport.authenticate('jwt', { session: false }), subjectRoute);
app.use("/v1/user/parent", passport.authenticate('jwt', { session: false }), parentRoute);
app.use("/v1/user/exam", passport.authenticate('jwt', { session: false }), examRoute);
app.use("/v1/user/attendance", passport.authenticate('jwt', { session: false }), attendanceRoute);

// app.use("/v1/user/webhook", webhook);

module.exports = app;