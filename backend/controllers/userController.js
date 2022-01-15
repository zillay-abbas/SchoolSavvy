const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Admin } = require("../models/userModel");

exports.registerUser = async (req, res) => {
  // Get form request
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // Validation checking
  if (!name || !email || !password || !password2) {
    console.log(req.body);
    errors.push({ msg: "Please fill in all fields" });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  // if error array contains any error
  if (errors.length > 0) {
    res.status(400).json({
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    //validation passed
    const user = await Admin.getUser(email, null).catch((error) =>
      res.status(500).json({ msg: "Server Error" })
    );
    console.log(user);

    if (user) {
      // if same email already exists
      errors.push({ msg: "email already registered" });
      res.json({
        errors: errors,
        name: name,
        email: email,
        password: password,
        password2: password2,
      });
    } else {
      //hash password/encrypt password
      let hashPassword = await bcrypt.hash(password, 10);
      const user = await Admin.addUser(name, email, hashPassword).catch((error) => {
        res.status(500).json({ msg: "Server Error" });
      });
      res.status(200).json(user);
    } //ELSE statement ends here
  }
};

exports.checkUser = async (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  console.log(req.body);

  // Validation checking
  if (!email || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // if error array contains any error
  if (errors.length > 0) {
    res.status(400).json({
      errors: errors,
      email: email,
      password: password,
    });
  } else {
    //validation passed
    let foundUser = await Admin.getUser(email).catch((error) =>
      res.status(500).json({ msg: "Server Error" })
    );
    console.log(foundUser);

    if (foundUser) {
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
          token: token
        });
      } else {
        res.status(401).json({ msg: "Invalid Password" });
      }
    } else {
      res.status(401).json({ msg: "User Not Found" });
    }
  }
};

exports.logoutUser = async (req, res) => {};
