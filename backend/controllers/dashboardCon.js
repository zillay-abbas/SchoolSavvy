const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();
const bcrypt = require("bcrypt");

const { School } = require("../models/schoolModel");
const { Subject } = require("../models/acadamicModel");
const {
  Student,
  Parent,
  Teacher,
  User,
  Admin,
} = require("../models/userModel");

exports.getDashboardDetails = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const schoolID = await School.getActiveSchoolbyUserID(userID);
    const school = await School.getSchoolbySchoolID(schoolID.admin_school_id);

    if (school) {
      const student = await Student.getStudentsbySchool(school.school_id);

      const parent = await Parent.getParentsbySchool(school.school_id);

      const teacher = await Teacher.getTeachersbySchool(school.school_id);

      const subject = await Subject.getSubjectsbySchoolID(school.school_id);

      const presentStudent = await Student.getPresentStudents(school.school_id);

      const absentStudent = await Student.getAbsentStudents(school.school_id);

      res.status(200).json({
        error: false,
        school: {
          id: school[0].school_id,
          name: school[0].school_name,
          description: school[0].school_desc,
          email: school[0].school_email,
          userID: school[0].school_user_id,
        },
        student,
        parent,
        teacher,
        subject,
        presentStudent,
        absentStudent,
      });
    } else {
      res.status(400).json({
        error: true,
        msg: "No school found",
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
};

exports.getUserbyToken = async (req, res) => {
  const userID = req.user.user_id;
  try {
    let foundUser = await User.getUserbyID(userID);
    if (foundUser) {
      res.status(200).json({
        error: false,
        msg: "Login Successfuly",
        user: foundUser,
      });
    } else {
      res.status(401).json({
        error: true,
        msg: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};

exports.createSchool = async (req, res) => {
  const { name, desc, email } = req.body;
  const userID = req.user.user_id;

  if (!name || !email || !desc) {
    res.status(400).json({
      error: true,
      isDialog: false,
      msg: "Input not complete",
    });
  } else {
    try {
      const schoolList = await School.getSchoolsbyUserID(userID);
      const userPlan = await Admin.getSubscription(userID);

      const status = 0;
      let isCreate = false;
      let msg = "";

      if (userPlan[0].sb_plan_id === 1) {
        if (schoolList.length >= 3) {
          msg =
            "You are not allowed to create more than three schools in free plan";
        } else {
          isCreate = true;
        }
      } else {
        if (schoolList.length >= 5) {
          msg =
            "You are not allowed to create more than five schools in free plan";
        } else {
          isCreate = true;
        }
      }

      if (!isCreate) {
        res.status(400).json({
          error: true,
          isDialog: true,
          msg,
        });
      } else {
        const school = await School.createSchool(
          name,
          desc,
          email,
          status,
          userID
        );

        const chkActive = await School.getActiveSchoolbyUserID(userID);

        if (!chkActive) {
          const setActive = await School.addActiveSchool(
            school.school_id,
            userID
          );
        }

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "School created against your account.",
          school,
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
};

exports.getSchool = async (req, res) => {
  const id = req.user.user_id;
  try {
    const school = await School.getSchoolsbyUserID(id);

    if (school.length > 0) {
      res.status(200).json({
        error: false,
        isDialog: false,
        school,
      });
    } else {
      res.status(404).json({
        error: true,
        isDialog: false,
        msg: "You don't have any schools",
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
};

exports.removeSchool = async (req, res) => {
  const { schoolID } = req.body;
  console.log(schoolID);

  try {
    const school = await School.removeSchool(schoolID);
    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "School removed",
      school,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.updateSchool = async (req, res) => {
  const { id, name, desc, email } = req.body;

  if (!id || !name || !email || !desc) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const updatedSchool = await School.updateSchool(id, name, desc, email);
      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "School updated",
        school: updatedSchool,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server error",
      });
    }
  }
};

exports.setSchoolActive = async (req, res) => {
  const { userID, schoolID } = req.body;

  console.log(`userid:: ${userID}`);
  console.log(`schid:: ${schoolID}`);

  if (!userID || !schoolID) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const setActiveSchool = await School.setActiveSchool(userID, schoolID);
      const getActiveSchool = await School.getSchoolbySchoolID(setActiveSchool.admin_school_id);

      res.status(200).json({
        error: false,
        isDialog: false,
        activeSchool: {
          id: getActiveSchool[0].school_id,
          name: getActiveSchool[0].school_name,
          description: getActiveSchool[0].school_desc,
          email: getActiveSchool[0].school_email,
          userID: getActiveSchool[0].school_user_id,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server error",
      });
    }
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
    const checkEmail = await Student.checkStudentEmail(email);

    console.log(checkEmail);

    if (!checkEmail) {
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
    } else {
      res.status(403).json({
        msg: "User with this email alreay exists",
      });
    }
  }
};

exports.getStudent = async (req, res) => {
  const { id } = req.query.id;

  if (!id) {
    res.status(400).json({
      msg: "Enter Student ID to Search",
    });
  } else {
    try {
      const student = await Student.getStudentbyId(id);

      res.status(200).json({
        Student: student,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
};

exports.addTeacher = async (req, res) => {
  const { name, dob, phone, email, password } = req.body;

  let error = [];
  // Validation checking

  if (!name || !dob || !phone || !email || !password) {
    error.push({ msg: "Please fill in all fields" });
  }

  if (error.length > 0) {
    res.status(400).json({
      error: error,
    });
  } else {
    try {
      let hashPassword = await bcrypt.hash(password, 10);
      const teacher = {
        name,
        dob,
        phone,
        email,
        hashPassword,
      };
      const result = await Teacher.addTeacher(teacher);
      res.status(200).json({
        msg: "Teacher Added",
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
