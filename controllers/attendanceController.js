const { Attendance } = require("../models/attendanceModel");
const { Teacher } = require("../models/teacherModel");
const { Student } = require("../models/studentModel");
const { School } = require("../models/schoolModel");
var moment = require("moment");

exports.markAttend = async (req, res) => {
  const { tId, students, classId, secId, schId } = req.body;

  if (!tId || !students || !classId || !secId || !schId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    let markedAtt = [];

    try {
      let today = new Date();
      today.setHours(00);
      today.setMinutes(00);
      today.setSeconds(00);
      today.setMilliseconds(000);
      today.setFullYear(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      today.setUTCHours(00);

      const isMarked = await Attendance.checkMarked(today, classId, secId);

      if (isMarked.length === 0) {
        const marked = await Attendance.addAttendance(
          new Date(),
          tId,
          classId,
          secId,
          schId
        );

        for (let i = 0; i < students.length; i++) {
          const submit = await Attendance.submitAttendance(
            students[i].remarks,
            students[i].id,
            marked.id
          );
          markedAtt.push(submit);
        }

        const getAtten = await Attendance.getAttendance(marked.id);

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Attendance Marked",
          today: true,
          marked: getAtten,
        });
      } else {
        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Already Marked",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server error",
      });
    }
  }
};

exports.getTeacherAttendance = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const teacher = await Teacher.getTeacherbyUserId(userID);

    const marked = await Attendance.getTeacherAttendance(teacher[0].teacher_id);

    res.status(200).json({
      error: false,
      isDialog: false,
      marked,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getStudentAttendance = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const student = await Student.getStudentbyUserId(userID);

    const attendance = await Attendance.getStudentAttendance(
      student[0].student_id,
      student[0].student_class_id,
      student[0].student_section_id
    );

    res.status(200).json({
      error: false,
      isDialog: false,
      marked: attendance,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getParentAttendance = async (req, res) => {
  const { stdArray } = req.body;

  try {
    let attArray = [];

    for (let i = 0; i < stdArray.length; i++) {
      const attendance = await Attendance.getStudentAttendance(
        stdArray[i].student_id,
        stdArray[i].school_class_room.class_id,
        stdArray[i].class_section.section_id
      );
      stdArray[i].attendance = attendance;
      attArray.push(attendance);
    }

    res.status(200).json({
      error: false,
      isDialog: false,
      marked: stdArray,
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

exports.getAdminAttendance = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const school = await School.getActiveSchoolbyUserID(userID);

    const marked = await Attendance.getSchoolAttendance(school.admin_school_id);

    res.status(200).json({
      error: false,
      isDialog: false,
      marked,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.updateMark = async (req, res) => {
  const { record } = req.body;

  if (!record) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const submit = await Attendance.updateAttendance(record.attendence_id, record.att_remarks);

      const getAtten = await Attendance.getAttendance(submit.attendence);

      res.status(200).json({
        error: false,
        marked: getAtten,
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
