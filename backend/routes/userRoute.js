const express = require("express");
const router = express.Router();

const { registerUser, checkUser } = require("../controllers/userController");

router.route("/register").post(registerUser);

router.route("/login").post(checkUser);

//remaining
router.route("/create/school").post(createSchool);

//remaining
router.route("/create/class").post(createClass);

//remaining
router.route("/create/course").post(createCourse);

//remaining
router.route("/create/parent").post(createParent);

//remaining
router.route("/create/teacher").post(createTeacher);

//remaining
router.route("/create/student").post(createStudent);

//remaining
router.route("/create/grade").post(createGrade);

//remaining
router.route("/create/exam").post(createExam);

//remaining
router.route("/create/exam_type").post(createExamType);

//remaining
router.route("/create/course").post(createCourse);

//remaining
router.route("/create/class_room").post(createClassRoom);

//remaining
router.route("/logout").get();

module.exports = router;