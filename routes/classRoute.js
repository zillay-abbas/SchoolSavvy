const express = require("express");
const router = express.Router();

const {
  getAllClasses,
  getClassTimeTable,
  addClassTimeTable,
  addClass,
  addClassSection,
  updateClass,
  removeClass,
  removeSection,
  getSchoolTimeTable,
  updateClassTimeTable,
  removeTimeSlot,
  getTeacherTimeTable,
  createClassLink,
  createAssinment,
  getAllAssignments,
  removeAssignment,
  updateAssignment,
  getTeacherClasses,
  getStudentAssignments,
  getAssignmentFile,
  uploadSolution,
  updateSubmission,
  getClassSecSchedule,
  uploadImg,
} = require("../controllers/classController");

const upload = require("../middlewares/uploadAssignment");

router.route("/add").post(addClass);

router.route("/update").post(updateClass);

router.route("/remove").post(removeClass);

router.route("/addSection").post(addClassSection);

router.route("/removeSection").post(removeSection);

router.route("/getAll").get(getAllClasses);

router.route("/getTeacherClasses").get(getTeacherClasses);

router.route("/getClassTimeTable").post(getClassTimeTable);

router.route("/getTeacherTimeTable").post(getTeacherTimeTable);

router.route("/getSchoolTimeTable").get(getSchoolTimeTable);

router.route("/getClassSecSchedule").post(getClassSecSchedule);

router.route("/addRoutine").post(addClassTimeTable);

router.route("/updateRoutine").post(updateClassTimeTable);

router.route("/removeTimeSlot").post(removeTimeSlot);

router.route("/createClass").post(createClassLink);

router.route("/studentassignment").get(getStudentAssignments);

router.route("/getAssignmentFile").get(getAssignmentFile);

router.route("/uploadSolution").post(upload, uploadSolution);

router.route("/updateSubmission").post(upload, updateSubmission);

router.route("/uploadImg").post(upload, uploadImg);

router
  .route("/assignment")
  .post(upload, createAssinment)
  .get(getAllAssignments)
  .delete(removeAssignment)
  .put(upload, updateAssignment);

module.exports = router;
