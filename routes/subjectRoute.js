const express = require("express");
const router = express.Router();

const { getAllSubjects, addSubject, updateSubject, removeSubject } = require("../controllers/subjectController");

router.route("/getAll").get(getAllSubjects);

router.route("/add").post(addSubject);

router.route("/remove").post(removeSubject);

router.route("/update").post(updateSubject);

module.exports = router;