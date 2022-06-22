const express = require("express");
const router = express.Router();

const {
  getDashboardDetails,
  addGrade,
  getSchool,
  removeGrade,
  addCourse,
  removeCourse,
  createSchool,
  getUserbyToken,
  removeSchool,
  updateSchool,
  setSchoolActive,
  addNotice,
  getNotice,
  updateNotice,
} = require("../controllers/dashboardCon");

router.route("/detail").get(getDashboardDetails);

router.route("/user").get(getUserbyToken);

router
  .route("/school")
  .post(createSchool)
  .get(getSchool)
  .delete(removeSchool)
  .put(updateSchool);

router.route("/school/current").post(setSchoolActive);

router.route("/grade").post(addGrade).delete(removeGrade);

router.route("/course").post(addCourse).delete(removeCourse);

router.route("/notice").post(addNotice);

router.route("/getNotice").post(getNotice);

router.route("/noticeUpdate").post(updateNotice);

module.exports = router;
