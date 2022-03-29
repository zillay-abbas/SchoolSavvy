const express = require("express");
const router = express.Router();

const {
  getDashboardDetails,
  addGrade,
  getSchool,
  removeGrade,
  addCourse,
  removeCourse,
  addStudent,
  getStudent,
  addTeacher,
  getTeacher,
  createSchool,
  getUserbyToken,
  removeSchool,
  updateSchool,
  setSchoolActive,
} = require("../controllers/dashboardCon");

<<<<<<< HEAD
//Register handle

router.route("/details").get(getDashboardDetails);
=======
router.route("/detail").get(getDashboardDetails);
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

router.route("/user").get(getUserbyToken);

router.route("/school").post(createSchool).get(getSchool).delete(removeSchool).put(updateSchool);

router.route("/school/current").post(setSchoolActive);

router.route("/grade").post(addGrade).delete(removeGrade);

router.route("/course").post(addCourse).delete(removeCourse);

router.route("/student").post(addStudent).get(getStudent);

router.route("/teacher").post(addTeacher).get(getTeacher);

// //remaining
// router.route("/create/class").post(createClass);

// //remaining
// router.route("/create/course").post(createCourse);

// //remaining
// router.route("/create/parent").post(createParent);

// //remaining
// router.route("/create/teacher").post(createTeacher);

// //remaining
// router.route("/create/student").post(createStudent);

// //remaining
// router.route("/create/grade").post(createGrade);

// //remaining
// router.route("/create/exam").post(createExam);

// //remaining
// router.route("/create/exam_type").post(createExamType);

// //remaining
// router.route("/create/course").post(createCourse);

// //remaining
// router.route("/create/class_room").post(createClassRoom);


module.exports = router;
