const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var validator = require("email-validator");
var passwordValidator = require("password-validator");

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

const { Admin, Student, Parent, Teacher } = require("../models/userModel");

exports.registerUser = async (req, res) => {
  // Get form request
  const { name, email, password, password2 } = req.body;

  // Validation checking
  if (!name || !email || !password || !password2) {
    res.status(400).json({
      error: true,
      msg: "Please fill all fields",
    });
  } else {
    //check if match
    if (password !== password2) {
      res.status(400).json({
        error: true,
        msg: "Password does not matches",
      });
    } else {
      if (!validator.validate(email) && !schema.validate(password)) {
        res.status(422).json({
          error: true,
          msg: "Input not correct",
        });
      } else {
        try {
          const user = await Admin.getUserbyEmail(email);
          // if same email already exists
          if (user) {
            res.status(422).json({
              error: true,
              msg: "User with this email already exists",
            });
          } else {
            //hash password encrypt password
            let hashPassword = await bcrypt.hash(password, 10);
            const user = await Admin.addUser(name, email, hashPassword);
            res.status(200).json(user);
          }
        } catch (error) {
          res.status(500).json({
            error: true,
            msg: "Server error",
          });
        }
      }
    }
  }
};

exports.checkUser = async (req, res) => {
  const { email, password, userType } = req.body;
  let errors = [];
  console.log(req.body);

  // Validation checking
  if (!email || !password || !userType) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // if error array contains any error
  if (errors.length > 0) {
    res.status(400).json({
      errors: errors,
      msg: "Please fill in all fields",
      email: email,
      password: password,
    });
    console.log(`respo: ${errors}`);
  } else {
    //validation passed

    switch (userType) {
      case "student":
        // code block
        let foundUser = await Student.getStudentbyEmail(email).catch((error) =>
          res.status(500).json({ msg: "Server Error" })
        );

        if (!foundUser) {
          let storedPass = foundUser.passward;
          let submittedPass = password;

          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);

          if (passwordMatch) {
            console.log(`user login ${foundUser}`);
            // if same email already exists

            let payload = { id: foundUser.id };
            let token = jwt.sign(payload, "secret");
            res.status(201).json({
              msg: "Login Successfuly",
              token: token,
            });
          } else {
            res.status(401).json({ msg: "Invalid Password" });
          }
        } else {
          res.status(401).json({ msg: "User Not Found" });
        }

        break;
      case "admin":
        // code block
        let foundAdmin = await Admin.getUser(email).catch((error) =>
          res.status(500).json({ msg: "Server Error" })
        );
        console.log(`fond: ${foundAdmin}`);

        if (foundAdmin) {
          let storedPass = foundAdmin.passward;
          let submittedPass = password;

          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);

          if (passwordMatch) {
            console.log(`user login ${foundAdmin}`);
            // if same email already exists

            let payload = { id: foundAdmin.id };
            let token = jwt.sign(payload, "secret");
            res.status(201).json({
              msg: "Login Successfuly",
              token: token,
            });
          } else {
            res.status(401).json({ msg: "Invalid Password" });
          }
        } else {
          res.status(401).json({ msg: "User Not Found" });
        }
        break;
      case "teacher":
        let foundTeacher = await Teacher.getTeacherbyEmail(email).catch(
          (error) => res.status(500).json({ msg: "Server Error" })
        );
        console.log(`found: ${foundTeacher}`);

        if (!foundTeacher) {
          let storedPass = foundTeacher.passward;
          let submittedPass = password;

          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);

          if (passwordMatch) {
            console.log(`user login ${foundTeacher}`);
            // if same email already exists

            let payload = { id: foundTeacher.id };
            let token = jwt.sign(payload, "secret");
            res.status(201).json({
              msg: "Login Successfuly",
              token: token,
            });
          } else {
            res.status(401).json({ msg: "Invalid Password" });
          }
        } else {
          res.status(401).json({ msg: "User Not Found" });
        }
        break;
      case "parent":
        let foundParent = await Parent.getParentbyEmail(email).catch((error) =>
          res.status(500).json({ msg: "Server Error " + error })
        );

        console.log(`fond: ${foundParent}`);

        if (!foundParent) {
          let storedPass = foundParent.passward;
          let submittedPass = password;

          const passwordMatch = await bcrypt.compare(submittedPass, storedPass);

          if (passwordMatch) {
            console.log(`user login ${foundParent}`);
            // if same email already exists

            let payload = { id: foundParent.id };
            let token = jwt.sign(payload, "secret");
            res.status(201).json({
              msg: "Login Successfuly",
              token: token,
            });
          } else {
            res.status(401).json({ msg: "Invalid Password" });
          }
        } else {
          res.status(401).json({ msg: "User Not Found" });
        }

        break;
      default:
      // code block
    }
  }
};

exports.logoutUser = async (req, res) => {};
