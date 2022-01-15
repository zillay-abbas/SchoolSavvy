const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
const bcrypt = require("bcrypt");

const { Student, Parent, Teacher } = require("../models/userModel");
const { Course, Grade, Batch } = require("../models/subjectModel");

exports.getDashboardDetails = async (req, res) => {
  try {
    const students = await Student.getStudents();
    const teachers = await Teacher.getTeachers();
    const parents = await Parent.getParents();
    const subjects = await Course.getSubjects();
    const presentStudents = await Student.getPresentStudents();
    const absentStudents = await Student.getAbsentStudents();

    res.status(200).json({
      students,
      teachers,
      parents,
      subjects,
      presentStudents,
      absentStudents,
    });
  } catch (error) {
    res.status(404).json({ msg: "Server Error" });
  }
};

exports.addGrade = async (req, res) => {
  const { name, description } = req.body;

  let error = [];
  // Validation checking

  if (!name || !description) {
    error.push({ msg: "Please fill in all fields" });
  }
  if (error.length > 0) {
    res.status(400).json({
      error: error,
    });
  } else {
    try {
      const grade = await Grade.addGrade(name, description);
      res.status(200).json({
        msg: "Class Added",
        grade,
      });
    } catch (error) {
      res.status(500).json({
        error: "Server Error",
        msg: "Class already exists",
      });
    }
  }
};

exports.removeGrade = async (req, res) => {
  const { id } = req.body;
  // Validation checking
  if (!id) {
    res.status(400).json({
      msg: "Select the class to remove",
    });
  } else {
    try {
      const isExists = await Grade.checkGrade(parseInt(id));

      if (isExists) {
        console.log(`exists : ${isExists}`);
        const inCourse = await Course.checkGradeinCourse(parseInt(id));
        console.log(`couu : ${inCourse}`);

        if (!inCourse) {
          const inBatch = await Batch.checkGradeinBatch(parseInt(id));
          console.log(`batch: ${inBatch}`);

          if (!inBatch) {
            const delGrade = await Grade.delGrade(parseInt(id));

            res.status(200).json({
              msg: "Class Removed",
              delGrade,
              inCourse,
              inBatch,
            });
          } else {
            res.status(400).json({
              msg: "First Remove Grade/Class from Batch",
            });
          }
        } else {
          res.status(400).json({
            msg: "First Remove Grade/Class from Subject",
          });
        }
      } else {
        res.status(400).json({
          msg: "Class does not exists",
        });
      }
    } catch (error) {
      console.log(`error!212 : ${error}`);
      res.status(500).json({
        msg: "Server Error" + error,
      });
    }
  }
  //check if match
};

exports.addCourse = async (req, res) => {
  const { name, description, grade_id } = req.body;

  let error = [];
  // Validation checking

  if (!name || !description || !grade_id) {
    error.push({ msg: "Please fill in all fields" });
  }
  if (error.length > 0) {
    res.status(400).json({
      error: error,
    });
  } else {
    try {
      const grade = await Course.addCourse(
        name,
        description,
        parseInt(grade_id)
      );
      res.status(200).json({
        msg: "Course/Subject Added",
        grade,
      });
    } catch (error) {
      res.status(500).json({
        error: "Server Error",
      });
    }
  }
};

exports.removeCourse = async (req, res) => {
  const { id } = req.body;
  // Validation checking
  if (!id) {
    res.status(400).json({
      msg: "Select Course to Remove",
    });
  } else {
    try {
      const isExists = await Course.getCourse(parseInt(id));

      if (isExists) {
        const result = await Course.delCourse(parseInt(id));
        res.status(200).json({
          msg: "Subject Removed",
          result,
        });
      } else {
        res.status(400).json({
          msg: "Subject Not Found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
  //check if match
};

exports.addStudent = async (req, res) => {
  const { name, dob, phone, join_date, email, password, class_id, parent_id } =
    req.body;

  let error = [];
  // Validation checking

  if (
    !name ||
    !dob ||
    !phone ||
    !join_date ||
    !email ||
    !password ||
    !class_id ||
    !parent_id
  ) {
    error.push({ msg: "Please fill in all fields" });
  }

  if (error.length > 0) {
    res.status(400).json({
      error: error,
    });
  } else {
    try {
      let hashPassword = await bcrypt.hash(password, 10);
      const student = {
        name,
        dob,
        phone,
        join_date,
        email,
        hashPassword,
        class_id,
        parent_id,
      };
      const result = await Student.addStudent(student);
      res.status(200).json({
        msg: "Student Added",
        result,
      });
    } catch (error) {
      console.log(`errror : ${error}`);

      res.status(500).json({
        error: "Server Error",
      });
    }
  }
};

exports.getStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      msg: "Enter Student ID to Search",
    });
  } else {
    try {
      const student = await Student.getStudent(id);

      res.status(200).json({
        Student: student
      })
    } catch (error) {
      
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
};
