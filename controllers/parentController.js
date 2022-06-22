const bcrypt = require("bcrypt");
const role = require("../constant/roles");
var validator = require("email-validator");
var passwordValidator = require("password-validator");

const { Parent } = require("../models/parentModel");
const { User } = require("../models/userModel");
const { School } = require("../models/schoolModel");
const { Student } = require("../models/studentModel");

var schema = new passwordValidator();

exports.addParent = async (req, res) => {
  const { name, email, password, phone, stdArray, schoolId } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !stdArray ||
    !schoolId ||
    stdArray.length === 0
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const chkEmail = await User.getUserbyEmail(email);
      if (chkEmail) {
        res.status(400).json({
          error: true,
          isDialog: true,
          msg: "This email already exists.",
        });
      } else {
        const status = 0;
        const isRemoved = 0;
        let hashPassword = await bcrypt.hash(password, 10);

        const user = await User.addUser(
          name,
          email,
          hashPassword,
          status,
          isRemoved,
          role.PARENT
        );

        const parent = await Parent.addParentData(
          phone,
          false,
          schoolId,
          user.user_id
        );

        stdArray.forEach(async (std) => {
          await Student.addStudentParent(
            std?.school_student?.student_id,
            parent.parent_id
          );
        });

        const getParent = await Parent.getParentDetailbyUserId(user.user_id);

        // const getTeacher = {
        //   user_id: teacher.user_id,
        //   user_name: teacher.user_name,
        //   user_email: teacher.user_email,
        //   user_role: teacher.user_role,
        //   school_teacher: teacher.school_teacher[0],
        // };

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Parent Added",
          parent: getParent,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server Error",
      });
    }
  }
};

exports.getAllParents = async (req, res) => {
  const userID = req.user.user_id;

  if (!userID) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "User not found",
    });
  } else {
    try {
      const school = await School.getActiveSchoolbyUserID(userID);

      let parents = [];

      if (school) {
        parents = await Parent.getParentsbySchoolId(
          school.admin_school_id
        );
      }

      const allParents = parents.map((parent) => {
        return {
          user_id: parent.user_id,
          user_name: parent.user_name,
          user_email: parent.user_email,
          user_role: parent.user_role,
          school_parent: parent.school_parent[0],
        };
      });

      res.status(200).json({
        error: false,
        isDialog: false,
        parents: allParents,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server Error",
      });
    }
  }
};

exports.updateParent = async (req, res) => {
  const { id, name, contact, email, password } = req.body;

  // Validation checking
  if (!id || !name || !contact || !email || !password) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Please fill all fields",
    });
  } else {
    if (!validator.validate(email) && !schema.validate(password)) {
      res.status(400).json({
        error: true,
        isDialog: true,
        msg: "Input not correct",
      });
    } else {
      try {
        let isUpdate = false;

        const parent = await Parent.getParentDetailbyUserId(id);

        const isEmailExists = await User.getUserbyEmail(email);

        if (isEmailExists) {
          if (isEmailExists.user_id !== parent.user_id) {
            res.status(400).json({
              error: true,
              isDialog: true,
              msg: "This email already exists.",
            });
          } else {
            isUpdate = true;
          }
        } else {
          isUpdate = true;
        }

        if (isUpdate) {
          const status = 0;
          const isRemoved = 0;

          let hashPassword = await bcrypt.hash(password, 10);

          const user = await User.updateUser(
            id,
            name,
            email,
            hashPassword,
            status,
            isRemoved
          );

          await Parent.updateParentData(user.user_id, contact);

          const getParent = await Parent.getParentDetailbyUserId(user.user_id);

          const udpateParent = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
            user_role: user.user_role,
            school_parent: getParent.school_parent[0],
          };

          res.status(200).json({
            error: false,
            isDialog: true,
            msg: "Parent updated",
            user: udpateParent,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: true,
          isDialog: true,
          msg: "Server error",
        });
      }
    }
  }
};

exports.removeParent = async (req, res) => {
  const { userId } = req.body;

  try {
    const parent = await User.removeUserbyId(userId);

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Parent removed",
      parent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getTeacher = async (req, res) => {
  const { id } = req.query.id;

  if (!id) {
    res.status(400).json({
      msg: "Enter Teacher ID to Search",
    });
  } else {
    try {
      const teacher = await Teacher.getTeacherbyId(id);

      res.status(200).json({
        Teacher: teacher,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
};
