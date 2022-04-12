const express = require("express");
const router = express.Router();

const { addTeacher, getAllTeachers, updateTeacher, removeTeacher } = require("../controllers/teacherController");

router.route("/add").post(addTeacher);

router.route("/update").post(updateTeacher);

router.route("/remove").post(removeTeacher);

router.route("/getAll").get(getAllTeachers);

// router.route("/getCurrent").get(getCurrentStudent);


module.exports = router;