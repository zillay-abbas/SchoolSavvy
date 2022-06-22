const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var validator = require("email-validator");
var passwordValidator = require("password-validator");

const role = require("../constant/roles");
const { User } = require("../models/userModel");
const { Student } = require("../models/studentModel");
const { School } = require("../models/schoolModel");
const { Parent } = require("../models/parentModel");

var schema = new passwordValidator();

exports.addStudent = async (req, res) => {
  // Get form request
  const { id, name, dob, email, password, grade, section, schoolId } = req.body;

  // Validation checking
  if (
    !id ||
    !name ||
    !dob ||
    !email ||
    !password ||
    !grade ||
    !section ||
    !schoolId
  ) {
    res.status(400).json({
      error: true,
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
        const user = await User.getUserbyEmail(email);
        // if same email already exists
        if (user) {
          res.status(400).json({
            error: true,
            isDialog: true,
            msg: "User with this email already exists.",
          });
        } else {
          const stu = await Student.getStudentbyRegNo(id);
          if (stu) {
            res.status(400).json({
              error: true,
              isDialog: true,
              msg: "Student with this ID already exists.",
            });
          } else {
            const status = 0;
            const isRemoved = 0;
            let joinDate = new Date();
            let stdDob = new Date(dob);

            let hashPassword = await bcrypt.hash(password, 10);

            const user = await User.addUser(
              name,
              email,
              hashPassword,
              status,
              isRemoved,
              role.STUDENT
            );

            await Student.addStudentData(
              id,
              user.user_id,
              stdDob,
              joinDate,
              grade,
              section,
              schoolId
            );

            const getStu = await Student.getStudentDetailbyUserId(user.user_id);

            res.status(200).json({
              error: false,
              isDialog: true,
              msg: "Student added",
              user: getStu,
            });
          }
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

exports.updateStudent = async (req, res) => {
  // Get form request
  const { id, regNo, name, dob, email, password, grade, section } = req.body;
  console.log(req.body);
  // Validation checking
  if (
    !id ||
    !regNo ||
    !name ||
    !dob ||
    !email ||
    !password ||
    !grade ||
    !section
  ) {
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
        const stu = await Student.getStudentbyRegNo(regNo);

        const isEmailExists = await User.getUserbyEmail(email);
        if (isEmailExists) {
          if (isEmailExists.user_id !== stu.user_id) {
            res.status(400).json({
              error: true,
              isDialog: true,
              msg: "Student with this email already exists.",
            });
          } else {
            isUpdate = true;
          }
        } else {
          isUpdate = true;
        }

        if (isUpdate) {
          if (stu) {
            if (stu?.student_id !== id) {
              isUpdate = false;
              res.status(400).json({
                error: true,
                isDialog: true,
                msg: "Student with this ID already exists.",
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

            const student = await Student.getStudentbyId(id);

            let hashPassword = await bcrypt.hash(password, 10);

            const user = await User.updateUser(
              student.student_user_id,
              name,
              email,
              hashPassword,
              status,
              isRemoved
            );

            await Student.updateStudentData(id, regNo, dob, grade, section);

            const getStu = await Student.getStudentDetailbyId(user.user_id);

            const updateStudent = {
              user_id: user.user_id,
              user_name: user.user_name,
              user_email: user.user_email,
              user_role: user.user_role,
              school_student: getStu.school_student[0],
            };

            res.status(200).json({
              error: false,
              isDialog: true,
              msg: "Student updated",
              user: updateStudent,
            });
          }
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

exports.getAllStudents = async (req, res) => {
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

      let students =[]; 
      if(school){
        students = await Student.getAllStudentsbySchoolId(
          school.admin_school_id
        );
      }

      console.log( school.admin_school_id);

      const allStudents = students.map((student) => {
        return {
          user_id: student.user_id,
          user_name: student.user_name,
          user_email: student.user_email,
          user_role: student.user_role,
          school_student: student.school_student[0],
        };
      });

      res.status(200).json({
        error: false,
        isDialog: false,
        students: allStudents,
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

exports.getCurrentStudent = async (req, res) => {
  const userID = req.user.user_id;

  if (!userID) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "User not found",
    });
  } else {
    try {
      const getStudent = await Student.getStudentDetailbyUserId(userID);

      const student = {
          user_id: getStudent.user_id,
          user_name: getStudent.user_name,
          user_email: getStudent.user_email,
          user_role: getStudent.user_role,
          school_student: getStudent.school_student[0],
      };

      res.status(200).json({
        error: false,
        isDialog: false,
        student,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server Error",
      });
    }
  }
};

exports.getParentStudents = async (req, res) => {
  const userID = req.user.user_id;

  if (!userID) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "User not found",
    });
  } else {
    try {
      const getParent = await Parent.getParentbyUserID(userID);

      const getStudent = await Student.getStdDetailbyParentId(getParent[0].parent_id);

      res.status(200).json({
        error: false,
        isDialog: false,
        students: getStudent,
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

exports.removeStudent = async (req, res) => {
  const { stdId } = req.body;

  try {
    const student = await Student.removeStudentUserbyId(stdId);
    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Student removed",
      student,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};
