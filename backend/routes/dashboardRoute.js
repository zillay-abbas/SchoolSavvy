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
} = require("../controllers/dashboardCon");

//Register handle

router.route("/details").get(getDashboardDetails);

router.route("/addGrade").post(addGrade);

router.route("/removeGrade").post(removeGrade);

router.route("/addCourse").post(addCourse);

router.route("/removeCourse").post(removeCourse);

router.route("/student").post(addStudent).get(getStudent);

router.route("/getTeacher").get();

router.route("/getSubject").get();

module.exports = router;
