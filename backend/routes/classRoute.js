const express = require("express");
const router = express.Router();

const { getAllClasses, getClassTimeTable, addClassTimeTable,
        addClass, addClassSection, updateClass, 
        removeClass, removeSection, getSchoolTimeTable } = require("../controllers/classController");

router.route("/add").post(addClass);

router.route("/update").post(updateClass);

router.route("/remove").post(removeClass);

router.route("/addSection").post(addClassSection);

router.route("/removeSection").post(removeSection);

router.route("/getAll").get(getAllClasses);

router.route("/getClassTimeTable").get(getClassTimeTable);

router.route("/getSchoolTimeTable").get(getSchoolTimeTable);

router.route("/addRoutine").post(addClassTimeTable);

module.exports = router;