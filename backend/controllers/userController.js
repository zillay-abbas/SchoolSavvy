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

<<<<<<< HEAD
const { Admin, Student, Parent, Teacher } = require("../models/adminModel");
=======
const {
  Admin,
  Student,
  Parent,
  Teacher,
  User,
} = require("../models/userModel");
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

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
<<<<<<< HEAD
          const user = await Admin.getUserbyEmail(email);
=======
          const user = await User.getUserbyEmail(email);
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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

        res.status(401).json({
          error: false,
          msg: "Account Verified",
          user: verifyUser,
        });
      } else {
        res.status(401).json({
          error: true,
          msg: "Invalid token",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        msg: "Server Error",
      });
    }
  }
};

<<<<<<< HEAD
exports.checkUser = async (req, res) => {
  const { email, password, userType } = req.body;
=======
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

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
<<<<<<< HEAD

          break;
        case userConstant.ADMIN:
          let foundAdmin = await Admin.getAdminbyEmail(email);

          if (foundAdmin) {
            const passwordMatch = await bcrypt.compare(
              password,
              foundAdmin.user_passward
            );

            if (passwordMatch) {
              let payload = { id: foundAdmin.id };
              token = jwt.sign(payload, "secret");

              msg = "Login Successfuly";
              user = foundAdmin;
              isUserExists = true;
            } else {
              msg = "Invalid Password";
            }
          } else {
            msg = "User Not Found";
          }
          break;
        case userConstant.TEACHER:
          let foundTeacher = await Teacher.getTeacherbyEmail(email);

          if (foundTeacher) {

            const passwordMatch = await bcrypt.compare(
              password,
              foundTeacher.teacher_password
            );

            if (passwordMatch) {
              console.log(`user login ${foundTeacher}`);

              let payload = { id: foundTeacher.id };
              token = jwt.sign(payload, "secret");

              isUserExists = true;
              msg = "Login Successfuly";
              user = foundTeacher;
            } else {
              msg = "Invalid Password";
            }
          } else {
            msg = "User Not Found";
          }
          break;
        case userConstant.PARENT:
          let foundParent = await Parent.getParentbyEmail(email);

          if (foundParent) {
            const passwordMatch = await bcrypt.compare(
              password,
              foundParent.parent_password
            );

            if (passwordMatch) {
              let payload = { id: foundParent.id };
              token = jwt.sign(payload, "secret");

              isUserExists = true;
              msg = "Login Successfuly";
              user = foundParent;
            } else {
              msg = "Invalid Password";
            }
          } else {
            msg = "User Not Found";
          }

          break;
        default:
        // code block
      }

      if (isUserExists) {
        res.status(201).json({
          error: false,
          msg,
          user,
          token,
        });
=======
        } else {
          res.status(401).json({
            error: true,
            msg: "Invalid Password",
          });
        }
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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
