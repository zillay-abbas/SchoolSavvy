import { PrismaClient, Prisma } from '@prisma/client'
const express = require("express");
const router = express.Router();


const prisma = new PrismaClient()


//login handle
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

//Register handle
router.post("/register", (req, res) => {
  // Get form request
  const { name, email, password, password2 } = req.body;
  let errors = [];

  console.log(" Name " + name + " email :" + email + " pass:" + password);

  // Validation checking
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  // if error array contains any error
  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        // if same email already exists
        errors.push({ msg: "email already registered" });
        render(res, errors, name, email, password, password2);
      } else {
        // create new user
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });

        //hash password/encrypt password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((value) => {
                console.log(value);
                res.redirect("/users/login");
              })
              .catch((value) => console.log(value));
          })
        );
      } //ELSE statement ends here
    });
  }
});

router.post("/login", (req, res, next) => {});

//logout
router.get("/logout", (req, res) => {});
module.exports = router;
