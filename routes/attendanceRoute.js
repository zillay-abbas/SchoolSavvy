const express = require("express");
const { markAttend, getTeacherAttendance, getStudentAttendance, getParentAttendance, getAdminAttendance, updateMark } = require("../controllers/attendanceController");
const router = express.Router();

router.route("/submit").post(markAttend);

router.route("/getTeacherView").get(getTeacherAttendance);

router.route("/getStudentView").get(getStudentAttendance);

router.route("/getParentView").post(getParentAttendance);

router.route("/getAdminView").get(getAdminAttendance);

router.route("/update").post(updateMark);


module.exports = router;
