const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var validator = require("email-validator");
var passwordValidator = require("password-validator");

const sendEmail = require("../middlewares/eMail");
const userConstant = require("../constant/userConstant");

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

const { Admin, Student, Parent, Teacher } = require("../models/adminModel");

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
          const user = await Admin.getUserbyEmail(email);
          // if same email already exists
          if (user) {
            res.status(200).json({
              error: true,
              msg: "User with this email already exists",
            });
          } else {
            const secret = "secret";
            const status = (isRemoved = 0);

            const token = jwt.sign({ email: email }, secret);

            const mailVerification = await sendEmail(
              name,
              email,
              "Account Verification",
              "Click button to verify email",
              token
            );

            console.log(mailVerification.rejected.length);

            if (mailVerification.rejected.length == 0) {
              //hash password encrypt password
              let hashPassword = await bcrypt.hash(password, 10);

              const user = await Admin.addUser(
                name,
                email,
                hashPassword,
                status,
                isRemoved,
                token
              );

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
        const verifyUser = Admin.updateUserVerification(user.user_id, status);

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

exports.checkUser = async (req, res) => {
  const { email, password, userType } = req.body;

  console.log(req.body);
  // Validation checking
  if (!email || !password || !userType) {
    res.status(400).json({
      error: true,
      msg: "Please fill all fields",
    });
  } else {
    let isUserExists = false;
    let user, msg, token;
    try {
      switch (userType) {
        case userConstant.STUDENT:
          let foundUser = await Student.getStudentbyEmail(email);

          if (foundUser) {
            const passwordMatch = await bcrypt.compare(
              password,
              foundUser.student_password
            );

            if (passwordMatch) {
              console.log(`user login ${foundUser}`);

              let payload = { id: foundUser.id };
              token = jwt.sign(payload, "secret");

              isUserExists = true;
              msg = "Login Successfuly";
              user = foundUser;
            } else {
              msg = "Invalid Password";
            }
          } else {
            msg = "User Not Found";
          }

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
      } else {
        res.status(401).json({
          error: true,
          msg,
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

exports.logoutUser = async (req, res) => {
  // req.session = null;
  // req.logout();
  // res.redirect("/");
};
