const express = require("express");
const router = express.Router();

const { addTeacher, getAllTeachers, updateTeacher, removeTeacher, getCurrentTeacher, addAssignmentMarks } = require("../controllers/teacherController");

router.route("/add").post(addTeacher);

router.route("/update").post(updateTeacher);

router.route("/remove").post(removeTeacher);

router.route("/getAll").get(getAllTeachers);

router.route("/getCurrent").get(getCurrentTeacher);

router.route("/addAssignmentMarks").post(addAssignmentMarks);


module.exports = router;