const express = require("express");
const router = express.Router();

const {
  addExam,
  getAllExams,
  updateExam,
  removeExam,
  addExamSchedule,
  updateExamSchedule,
  removeExamSchedule,
  getTeacherExams,
  addTotalMarks,
  addQuestionPaper,
  getStudentExams,
  getFile,
  uploadSolution,
  getParentExams,
  assignMarks,
} = require("../controllers/examController");

const upload = require("../middlewares/uploadExam");

router.route("/add").post(addExam);

router.route("/getAll").get(getAllExams);

router.route("/getTeacherExams").get(getTeacherExams);

router.route("/getParentExams").post(getParentExams);

router.route("/getStudentExams").get(getStudentExams);

router.route("/addMarks").post(addTotalMarks);

router.route("/addObtMarks").post(assignMarks);

router.route("/addQuestionPaper").post(upload, addQuestionPaper);

router.route("/uploadSolution").post(upload, uploadSolution);

router.route("/getExamFile").get(getFile);

router.route("/update").post(updateExam);

router.route("/remove").post(removeExam);

router.route("/addRoutine").post(addExamSchedule);

router.route("/updateRoutine").post(updateExamSchedule);

router.route("/removeSchedule").post(removeExamSchedule);

module.exports = router;
