const express = require("express");
const router = express.Router();

const { registerUser, loginUser, verifyUser, logoutUser } = require("../controllers/userController");

router.route("/register").post(registerUser);

router.route("/verify/:code").get(verifyUser);

router.route("/login").post(loginUser);

//remaining
router.route("/logout").get(logoutUser);

module.exports = router;