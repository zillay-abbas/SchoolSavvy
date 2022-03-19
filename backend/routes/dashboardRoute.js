const express = require("express");
const router = express.Router();

const {
  getDashboardDetails,
  addGrade,
  removeGrade,
  addCourse,
  removeCourse,
  addStudent,
  getStudent,
  addTeacher,
  getTeacher,
} = require("../controllers/dashboardCon");

//Register handle

router.route("/detail").get(getDashboardDetails);

router.route("/grade").post(addGrade).delete(removeGrade);

router.route("/course").post(addCourse).delete(removeCourse);

router.route("/student").post(addStudent).get(getStudent);

router.route("/teacher").post(addTeacher).get(getTeacher);

module.exports = router;
