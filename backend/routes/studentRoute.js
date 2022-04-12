const express = require("express");
const router = express.Router();

const { addStudent, getAllStudents, updateStudent, removeStudent, getCurrentStudent } = require("../controllers/studentController");

router.route("/add").post(addStudent);

router.route("/update").post(updateStudent);

router.route("/remove").post(removeStudent);

router.route("/getAll").get(getAllStudents);

router.route("/getCurrent").get(getCurrentStudent);


module.exports = router;