const express = require("express");
const router = express.Router();

const {
  addParent, getAllParents, updateParent, removeParent,
} = require("../controllers/parentController.js");

router.route("/add").post(addParent);

router.route("/update").post(updateParent);

router.route("/remove").post(removeParent);

router.route("/getAll").get(getAllParents);

module.exports = router;
