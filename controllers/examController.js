const { Exam, Schedule } = require("../models/examModel");
const { School } = require("../models/schoolModel");
const { Student } = require("../models/studentModel");
const axios = require("axios");
const { Teacher } = require("../models/teacherModel");
const { promisify } = require("util");
const { ClassGrade } = require("../models/classModel");
const fs = require("fs");

const unlinkAsync = promisify(fs.unlink);

exports.addExam = async (req, res) => {
  const { name, date, schId } = req.body;

  if (!name || !date || !schId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const newExam = await Exam.addExam(name, new Date(date), schId);

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Exam added",
        exam: newExam,
      });
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

exports.getAllExams = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const schId = await School.getActiveSchoolbyUserID(userID);

    const exams = await Exam.getAllExams(schId.admin_school_id);

    res.status(200).json({
      error: false,
      isDialog: false,
      exams,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getTeacherExams = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const teacher = await Teacher.getTeacherbyUserId(userID);

    const exams = await Exam.getTeacherExams(teacher[0].teacher_id);

    res.status(200).json({
      error: false,
      isDialog: false,
      exams,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getParentExams = async (req, res) => {
  const { stdId } = req.body;

  try {
    const exams = await Exam.getParentExams(stdId);
    
    res.status(200).json({
      error: false,
      isDialog: false,
      exams,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getStudentExams = async (req, res) => {
  const id = req.user.user_id;

  try {
    const std = await Student.getStudentbyUserId(id);

    const getExams = await Exam.getStudentExams(
      std[0].student_class_id,
      std[0].student_section_id,
      std[0].student_id
    );

    res.status(200).json({
      error: false,
      isDialog: false,
      exams: getExams,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.updateExam = async (req, res) => {
  const { id, name, date } = req.body;

  if (!id || !name || !date) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const updatedExam = await Exam.updateExam(id, name, new Date(date));

      console.log(updatedExam);
      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Exam updated",
        exam: updatedExam,
      });
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

exports.removeExam = async (req, res) => {
  const { id } = req.body;

  try {
    const removedClass = await Exam.removeExam(id);

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Exam removed",
      exam: removedClass,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.addExamSchedule = async (req, res) => {
  const {
    examId,
    classId,
    secId,
    teacherId,
    courseId,
    day,
    startTime,
    endTime,
  } = req.body;

  if (
    !examId ||
    !classId ||
    !secId ||
    !teacherId ||
    !courseId ||
    !day ||
    !startTime ||
    !endTime
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const schedule = await Schedule.getExistingSchedule(
        classId,
        secId,
        courseId,
        examId
      );

      if (schedule.length > 0) {
        res.status(400).json({
          error: true,
          isDialog: true,
          msg: "This is already scheduled",
        });
      } else {
        const timeStart = new Date();
        const timeEnd = new Date();

        let exStart =
          Number(startTime.split(":")[0]) * 60 * 60 * 1000 +
          Number(startTime.split(":")[1]) * 60 * 1000;

        let exEnd =
          Number(endTime.split(":")[0]) * 60 * 60 * 1000 +
          Number(endTime.split(":")[1]) * 60 * 1000;

        timeStart.setTime(exStart);
        timeEnd.setTime(exEnd);

        const addedSchedule = await Schedule.addSchedule(
          examId,
          classId,
          secId,
          teacherId,
          courseId,
          new Date(day),
          timeStart,
          timeEnd
        );

        const exam = await Schedule.getExamSchedulebyId(addedSchedule.exam);

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Exam scheduled",
          exam,
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

exports.updateExamSchedule = async (req, res) => {
  const { id, grade, secId, course, teacher, date, startTime, endTime } =
    req.body;

  if (
    !id ||
    !secId ||
    !grade ||
    !course ||
    !teacher ||
    !date ||
    !startTime ||
    !endTime
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      let isInsert = false;

      const schedule = await Schedule.getExistingSchedule(
        grade,
        secId,
        course,
        id
      );

      if (schedule.length > 0) {
        let slotRes = false;

        schedule.forEach((record) => {
          if (record.id !== id) {
            slotRes = true;
          }
        });

        if (slotRes) {
          res.status(400).json({
            error: true,
            isDialog: true,
            msg: "This is already scheduled",
          });
        } else {
          isInsert = true;
        }
      } else {
        isInsert = true;
      }

      if (isInsert) {
        const timeStart = new Date();
        const timeEnd = new Date();

        let msStart =
          Number(startTime.split(":")[0]) * 60 * 60 * 1000 +
          Number(startTime.split(":")[1]) * 60 * 1000;

        let msEnd =
          Number(endTime.split(":")[0]) * 60 * 60 * 1000 +
          Number(endTime.split(":")[1]) * 60 * 1000;

        timeStart.setTime(msStart);
        timeEnd.setTime(msEnd);

        const updatedTT = await Schedule.updateSchedule(
          id,
          grade,
          secId,
          course,
          teacher,
          new Date(date),
          timeStart,
          timeEnd
        );

        const schedule = await Schedule.getExamSchedulebyId(updatedTT.exam);

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Schedule updated",
          schedule,
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

exports.removeExamSchedule = async (req, res) => {
  const { id } = req.body;

  try {
    const removeSchedule = await Schedule.removeSchedule(id);

    const schedule = await Schedule.getExamSchedulebyId(removeSchedule.exam);

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Schedule removed",
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.addTotalMarks = async (req, res) => {
  const { id, marks } = req.body;

  if (!id || !marks) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const exam = await Exam.addTotalMarks(id, parseInt(marks));

      const getUpdated = await Exam.getExambyId(exam.id);

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Marks Added",
        exam: getUpdated,
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

exports.assignMarks = async (req, res) => {
  const { id, marks } = req.body;

  if (!id || !marks) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const submission = await Exam.assignMarks(id, parseInt(marks));

      const getUpdated = await Exam.getExambyId(submission.exam_schedule);

      res.status(200).json({
        error: false,
        isDialog: false,
        exam: getUpdated,
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

exports.addQuestionPaper = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const checkFile = await Exam.getExambyId(parseInt(id));

      if (checkFile.file_path !== null) {
        await unlinkAsync(checkFile.file_path);
      }

      const setExamFile = await Exam.addQuestionFile(
        parseInt(id),
        req.file.originalname,
        req.file.path
      );

      const getUpdated = await Exam.getExambyId(setExamFile.id);

      res.status(200).json({
        error: false,
        isDialog: false,
        msg: "Question paper uploaded",
        exam: getUpdated,
      });
    } catch (error) {
      await unlinkAsync(req.file.path);
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server error",
      });
    }
  }
};

exports.getFile = async (req, res) => {
  const { path } = req.query;

  if (!path) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "File not found",
    });
  } else {
    try {
      var address = require("path");
      var file = address.resolve(".") + "\\" + path;

      res.status(200).download(file);
    } catch (error) {
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server error",
      });
    }
  }
};

exports.uploadSolution = async (req, res) => {
  const { schId, student } = req.body;

  if (!schId || !student) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const setExam = await Exam.addSubmission(
        parseInt(student),
        parseInt(schId),
        new Date(),
        req.file.path,
        req.file.originalname
      );

      const getExam = await Exam.getStudentSubmittedExam(
        parseInt(schId),
        parseInt(student)
      );

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Exam uploaded",
        exam: getExam,
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
