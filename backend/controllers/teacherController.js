const bcrypt = require("bcrypt");
const role = require("../constant/roles");
var validator = require("email-validator");
var passwordValidator = require("password-validator");

const { Teacher } = require("../models/teacherModel");
const { User } = require("../models/userModel");
const { School } = require("../models/schoolModel");

var schema = new passwordValidator();

exports.addTeacher = async (req, res) => {
  const { name, email, password, description, contact, city, schoolId } =
    req.body;

  if (
    !name ||
    !description ||
    !contact ||
    !email ||
    !password ||
    !city ||
    !schoolId
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
          role.TEACHER
        );

        await Teacher.addTeacherData(
          contact,
          city,
          description,
          schoolId,
          user.user_id
        );

        const teacher = await Teacher.getTeacherDetailbyUserId(user.user_id);

        const getTeacher = {
          user_id: teacher.user_id,
          user_name: teacher.user_name,
          user_email: teacher.user_email,
          user_role: teacher.user_role,
          school_teacher: teacher.school_teacher[0],
        };

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Teacher Added",
          teacher: getTeacher,
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

exports.updateTeacher = async (req, res) => {
  // Get form request
  const {
    userId,
    name,
    email,
    password,
    description,
    contact,
    city,
    schoolId,
  } = req.body;
  // Validation checking
  if (
    !name ||
    !email ||
    !password ||
    !description ||
    !contact ||
    !city ||
    !schoolId
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
        console.log(userId);
        const teacher = await Teacher.getTeacherDetailbyUserId(userId);

        const isEmailExists = await User.getUserbyEmail(email);
        if (isEmailExists) {
          if (isEmailExists.user_id !== teacher.user_id) {
            res.status(400).json({
              error: true,
              isDialog: true,
              msg: "Teacher with this email already exists.",
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
            userId,
            name,
            email,
            hashPassword,
            status,
            isRemoved
          );

          await Teacher.updateTeacherData(user.user_id, contact, city, description);

          const getStu = await Teacher.getTeacherDetailbyUserId(user.user_id);

          const updateStudent = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
            user_role: user.user_role,
            school_teacher: getStu.school_teacher[0],
          };

          res.status(200).json({
            error: false,
            isDialog: true,
            msg: "Teacher updated",
            user: updateStudent,
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

exports.removeTeacher = async (req, res) => {
  const { userId } = req.body;

  try {
    const student = await Teacher.removeTeacherUserbyId(userId);
    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Teacher removed",
      student,
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

exports.getAllTeachers = async (req, res) => {
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

      const teachers = await Teacher.getTeachersbySchoolId(
        school.admin_school_id
      );

      const allTeachers = teachers.map((teacher) => {
        return {
          user_id: teacher.user_id,
          user_name: teacher.user_name,
          user_email: teacher.user_email,
          user_role: teacher.user_role,
          school_teacher: teacher.school_teacher[0],
        };
      });

      res.status(200).json({
        error: false,
        isDialog: false,
        teachers: allTeachers,
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
