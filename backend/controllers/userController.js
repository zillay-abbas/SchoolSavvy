const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var validator = require("email-validator");
var passwordValidator = require("password-validator");

const sendEmail = require("../middlewares/eMail");
const userConstant = require("../constant/userConstant");
const role = require("../constant/roles");

var schema = new passwordValidator();
schema
  .is()
  .min(4) // Minimum length 8
  .is()
  .max(50) // Maximum length 100
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces();

const {
  Admin,
  Student,
  Parent,
  Teacher,
  User,
} = require("../models/userModel");

exports.registerUser = async (req, res) => {
  // Get form request
  const { name, email, password, password2 } = req.body;

  // Validation checking
  if (!name || !email || !password || !password2) {
    res.status(200).json({
      error: true,
      msg: "Please fill all fields",
    });
  } else {
    //check if match
    if (password !== password2) {
      res.status(200).json({
        error: true,
        msg: "Password does not matches",
      });
    } else {
      if (!validator.validate(email) && !schema.validate(password)) {
        res.status(200).json({
          error: true,
          msg: "Input not correct",
        });
      } else {
        try {
          const user = await User.getUserbyEmail(email);
          // if same email already exists
          if (user) {
            res.status(200).json({
              error: true,
              msg: "User with this email already exists",
            });
          } else {
            const secret = "secret";
            const status = (isRemoved = 0);
            let date = new Date();
            let endDate = new Date();
            
            const token = jwt.sign({ email: email }, secret);

            const mailVerification = await sendEmail(
              name,
              email,
              "Account Verification",
              "Your free trail ends after three months",
              token
            );

            console.log(mailVerification.rejected.length);

            if (mailVerification.rejected.length == 0) {
              //hash password encrypt password
              let hashPassword = await bcrypt.hash(password, 10);

              const user = await User.addUser(
                name,
                email,
                hashPassword,
                status,
                isRemoved,
                role.ADMIN
              );

              endDate.setMonth(endDate.getMonth() + 3);
              await Admin.addSubscription(user.user_id, date, endDate);

              await Admin.addVerification(user.user_id, status, token);

              // if user added successfully
              res.status(200).json({
                error: false,
                msg: "Account created. Check email to verify account",
                user,
              });
            } else {
              res.status(500).json({
                error: true,
                msg: "Server error",
              });
            }
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({
            error: true,
            msg: "Server error",
          });
        }
      }
    }
  }
};

exports.verifyUser = async (req, res) => {
  const token = req.params.code;

  console.log(`token: ${token}`);

  // Validation checking
  if (!token) {
    res.status(401).json({
      error: true,
      msg: "Token not found",
    });
  } else {
    try {
      //validation passed
      let user = await Admin.getAdminbyToken(token);

      console.log(user);

      console.log(`userid : ${user.user_id}`);

      if (user) {
        const status = 1;
        const verifyUser = Admin.updateVerification(user.user_id, status);

        // res.status(401).json({
        //   error: false,
        //   msg: "Account Verified",
        //   user: verifyUser,
        // });
        res.redirect("http://localhost:3000/login");
      } else {
        res.status(401).json({
          error: true,
          msg: "Invalid token",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        msg: "Server Error",
      });
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  // Validation checking
  if (!email || !password) {
    res.status(400).json({
      error: true,
      msg: "Please fill all fields",
    });
  } else {
    try {
      let foundUser = await User.getUserbyEmail(email);

      if (foundUser) {
        const passwordMatch = await bcrypt.compare(
          password,
          foundUser.user_passward
        );

        if (passwordMatch) {
          let payload = { id: foundUser.user_id };
          token = jwt.sign(payload, "secret");

          if (foundUser.user_role === role.ADMIN) {
            const isVerified = await Admin.checkVerification(foundUser.user_id);

            if (isVerified.is_verified) {
              res.status(200).json({
                error: false,
                msg: "Login Successfuly",
                user: {
                  id: foundUser.user_id,
                  name: foundUser.user_name,
                  email: foundUser.user_email,
                  role: foundUser.user_role,
                },
                token,
              });
            } else {
              res.status(401).json({
                error: true,
                msg: "Your account is not verified. Check your mail to verify your account",
              });
            }
          } else {
            res.status(200).json({
              error: false,
              msg: "Login Successfuly",
              user: foundUser,
              token,
            });
          }
        } else {
          res.status(401).json({
            error: true,
            msg: "Invalid Password",
          });
        }
      } else {
        res.status(401).json({
          error: true,
          msg: "User Not Found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        msg: "Server Error",
      });
    }
  }
};

exports.addAdminPlan = async (req, res) => {
  const { name, price, isActive } = req.body;

  if (!name || !price || !isActive) {
    res.status(404).json({
      error: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const plan = await Plan.addPlan(name, price, isActive);

      res.status(200).json({
        error: false,
        msg: "Plan added",
        plan,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        msg: "Server error",
      });
    }
  }
};

exports.logoutUser = async (req, res) => {
  // req.session = null;
  // req.logout();
  // res.redirect("/");
};
