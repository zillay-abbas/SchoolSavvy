const express = require("express");
const router = express.Router();

const { registerUser, checkUser, verifyUser, logoutUser } = require("../controllers/userController");

router.route("/register").post(registerUser);

router.route("/verify/:code").get(verifyUser);

router.route("/login").post(checkUser);

//remaining
router.route("/logout").get(logoutUser);

module.exports = router;