const express = require("express");
const router = express.Router();

const { registerUser, checkUser } = require("../controllers/userController");

//Register handle
router.route("/register").post(registerUser);

//Login handle
router.route("/login").post(checkUser);

//logout
router.route("/logout").get();

module.exports = router;