const { ClassGrade, Schedule } = require("../models/classModel");
const { School } = require("../models/schoolModel");
const axios = require("axios");
const { Student } = require("../models/studentModel");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

exports.addClass = async (req, res) => {
  const { name, desc, year, schId } = req.body;

  if (!name || !desc || !year || !schId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const newClass = await ClassGrade.addClass(name, desc, year, schId);

      const classDet = await ClassGrade.getClassDetailbyId(newClass.class_id);

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Class added",
        class: classDet,
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

exports.updateClass = async (req, res) => {
  const { classId, name, desc, year } = req.body;

  if (!name || !desc || !year) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const newClass = await ClassGrade.updateClass(
        classId,
        name,
        desc,
        parseInt(year)
      );

      const classDet = await ClassGrade.getClassDetailbyId(newClass.class_id);

      console.log(classDet);
      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Class updated",
        class: classDet,
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

exports.removeClass = async (req, res) => {
  const { classId } = req.body;

  try {
    const removedClass = await ClassGrade.removeClass(classId);

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Class removed",
      class: removedClass,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.removeSection = async (req, res) => {
  const { sectionId } = req.body;

  try {
    const section = await ClassGrade.removeSection(sectionId);

    const classDet = await ClassGrade.getClassDetailbyId(
      section.section_class_id
    );

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Section removed",
      class: classDet,
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

exports.addClassSection = async (req, res) => {
  const { name, classId } = req.body;

  if (!name || !classId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      let isExists = false;

      const getSec = await ClassGrade.getClassSection(classId);

      getSec.map((sec) => {
        if (sec.section_name === name) {
          isExists = true;
        }
      });

      if (isExists) {
        res.status(400).json({
          error: true,
          isDialog: true,
          msg: "Class with this section already exists",
        });
      } else {
        const newClass = await ClassGrade.addClassSection(name, classId);

        const classDet = await ClassGrade.getClassDetailbyId(classId);

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Class section added",
          class: classDet,
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

exports.getAllClasses = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const schId = await School.getActiveSchoolbyUserID(userID);
    const classes = await ClassGrade.getAllClasses(schId.admin_school_id);
    res.status(200).json({
      error: false,
      isDialog: false,
      classes,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getTeacherClasses = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const classes = await ClassGrade.getTeacherClasses(userID);

    res.status(200).json({
      error: false,
      isDialog: false,
      classes,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getClassTimeTable = async (req, res) => {
  const { secId } = req.body;

  try {
    const schedule = await ClassGrade.getClassTimeTable(secId);

    res.status(200).json({
      error: false,
      isDialog: false,
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

exports.getTeacherTimeTable = async (req, res) => {
  const { teacherId } = req.body;

  try {
    const schedule = await ClassGrade.getTeacherTimeTable(teacherId);

    res.status(200).json({
      error: false,
      isDialog: false,
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

exports.getSchoolTimeTable = async (req, res) => {
  const { schoolId } = req.body;

  try {
    const routine = await ClassGrade.getSchoolTimeTable(schoolId);

    res.status(200).json({
      error: false,
      isDialog: false,
      schedule: routine,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getClassSecSchedule = async (req, res) => {
  const { classId, secId } = req.body;

  try {
    const routine = await ClassGrade.getClassSecTimeTable(classId, secId);

    res.status(200).json({
      error: false,
      isDialog: false,
      schedule: routine,
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

exports.addClassTimeTable = async (req, res) => {
  const {
    selectedClass,
    section,
    teacher,
    subject,
    day,
    startTime,
    endTime,
    schId,
  } = req.body;

  if (
    !selectedClass ||
    !section ||
    !teacher ||
    !subject ||
    !day ||
    !startTime ||
    !endTime ||
    !schId
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      let isInsert = false;

      const schedule = await Schedule.getSchedulebyClass(
        selectedClass,
        section,
        schId
      );

      if (schedule.length > 0) {
        let slotRes = false;

        schedule.forEach((record) => {
          if (
            record.tt_time_end >= startTime ||
            endTime >= record.tt_time_start
          ) {
            slotRes = true;
          }
        });

        if (slotRes) {
          res.status(400).json({
            error: true,
            isDialog: true,
            msg: "This current slot for this class is already scheduled, if you want to change update this class schedule",
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

        const addedSchedule = await Schedule.addSchedule(
          selectedClass,
          section,
          teacher,
          subject,
          day,
          timeStart,
          timeEnd,
          schId
        );

        const schedule = await Schedule.getSchedulebyId(
          addedSchedule.timetable_id
        );

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Class scheduled",
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

exports.updateClassTimeTable = async (req, res) => {
  const {
    ttId,
    selectedClass,
    section,
    teacher,
    subject,
    day,
    startTime,
    endTime,
    schId,
  } = req.body;

  if (
    !ttId ||
    !selectedClass ||
    !section ||
    !teacher ||
    !subject ||
    !day ||
    !startTime ||
    !endTime ||
    !schId
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      let isInsert = false;

      const schedule = await Schedule.getSchedulebyClass(
        selectedClass,
        section,
        schId
      );

      if (schedule.length > 0) {
        let slotRes = false;

        schedule.forEach((record) => {
          if (
            record.tt_time_end >= startTime ||
            endTime >= record.tt_time_start
          ) {
            slotRes = true;
          }
        });

        if (slotRes) {
          res.status(400).json({
            error: true,
            isDialog: true,
            msg: "This current slot for this class is already scheduled",
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
          ttId,
          selectedClass,
          section,
          teacher,
          subject,
          day,
          timeStart,
          timeEnd
        );

        const schedule = await Schedule.getSchedulebyId(updatedTT.timetable_id);

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

exports.removeTimeSlot = async (req, res) => {
  const { ttId } = req.body;

  try {
    const schedule = await Schedule.removeSchedule(ttId);

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

exports.createClassLink = async (req, res) => {
  const { topic, duration, slotId } = req.body;

  if (!topic || !duration || !slotId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      axios
        .post(
          "https://api.zoom.us/v2/users/zillayabbas98@gmail.com/meetings",
          {
            default_password: false,
            duration: duration,
            topic: topic,
            type: 2,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ZOOM_TOKEN}`,
            },
          }
        )
        .then(async (response) => {
          const schdule = await Schedule.updateScheduleUrl(
            slotId,
            response.data.join_url
          );

          const schedule = await ClassGrade.getTeacherUpdatedTimeTable(
            schdule.timetable_id
          );
          console.log("pppp");

          res.status(200).json({
            error: false,
            isDialog: false,
            schedule: schedule,
            startUrl: response.data.start_url,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log("sdfsfa");
          res.status(500).json({
            error: true,
            isDialog: true,
            msg: "Server error",
          });
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

exports.createAssinment = async (req, res) => {
  const { title, subject, grade, section, dueDate, marks, teacher } = req.body;

  if (
    !title ||
    !subject ||
    !grade ||
    !section ||
    !dueDate ||
    !marks ||
    !teacher
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const setAssignment = await ClassGrade.addAssignment(
        title,
        subject,
        grade,
        section,
        dueDate,
        marks,
        teacher,
        req.file.path,
        req.file.originalname
      );

      const assignment = await ClassGrade.getAssignmentbyId(setAssignment.id);

      const assigned = await ClassGrade.getAssignedStudents(
        setAssignment.grade,
        setAssignment.section
      );

      const handedIn = await ClassGrade.getHandedInStudents(setAssignment.id);

      assignment.assigned = assigned;

      assignment.handedIn = handedIn;

      res.status(200).json({
        error: false,
        isDialog: false,
        msg: "Assignment uploaded",
        assignment: assignment,
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

exports.uploadImg = async (req, res) => {
  const { teacher } = req.body;

  console.log(req.body);

  if (!teacher) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const setAssignment = await ClassGrade.addImg(
        parseInt(teacher),
        req.file.path,
      );

      res.status(200).json({
        error: false,
        isDialog: false,
        msg: "Assignment uploaded",
        img: setAssignment,
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

exports.updateAssignment = async (req, res) => {
  const { id, title, subject, grade, section, dueDate, marks, teacher } =
    req.body;

  if (
    !id ||
    !title ||
    !subject ||
    !grade ||
    !section ||
    !dueDate ||
    !marks ||
    !teacher
  ) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const getOldPath = await ClassGrade.getAssignmentbyId(parseInt(id));

      await unlinkAsync(getOldPath.file);

      const updated = await ClassGrade.updateAssignment(
        parseInt(id),
        title,
        subject,
        grade,
        section,
        dueDate,
        marks,
        teacher,
        req.file.path,
        req.file.originalname
      );

      const assignment = await ClassGrade.getAssignmentbyId(updated.id);

      const assigned = await ClassGrade.getAssignedStudents(
        updated.grade,
        updated.section
      );

      const handedIn = await ClassGrade.getHandedInStudents(updated.id);

      assignment.assigned = assigned;

      assignment.handedIn = handedIn;

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Assignment updated",
        assignment: assignment,
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

exports.getAllAssignments = async (req, res) => {
  const id = req.user.user_id;

  try {
    const assignment = await ClassGrade.getAllAssignments(id);

    const updated = await Promise.all(
      assignment.map(async (task) => {
        const assigned = await ClassGrade.getAssignedStudents(
          task.school_class_room.class_id,
          task.class_section.section_id
        );

        const handedIn = await ClassGrade.getHandedInStudents(task.id);

        return {
          id: task.id,
          name: task.name,
          school_course: task.school_course,
          school_class_room: task.school_class_room,
          class_section: task.class_section,
          duedate: task.duedate,
          totalmarks: task.totalmarks,
          file: task.file,
          assigned,
          handedIn,
        };
      })
    );

    res.status(200).json({
      error: false,
      isDialog: false,
      assignment: updated,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getStudentAssignments = async (req, res) => {
  const id = req.user.user_id;

  try {
    const std = await Student.getStudentbyUserId(id);

    const getAssignments = await ClassGrade.getStudentAssignments(
      std[0].student_class_id,
      std[0].student_section_id,
      std[0].student_id
    );

    res.status(200).json({
      error: false,
      isDialog: false,
      assignment: getAssignments,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.removeAssignment = async (req, res) => {
  const { id } = req.body;

  try {
    const assignment = await ClassGrade.removeAssignment(id);

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Assignment removed",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.getAssignmentFile = async (req, res) => {
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
  const { id, student } = req.body;

  if (!id || !student) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const setAssignment = await ClassGrade.addSubmission(
        parseInt(id),
        new Date(),
        parseInt(student),
        req.file.path,
        req.file.originalname
      );

      const assignment = await ClassGrade.getAssignmentSubmission(
        parseInt(id),
        parseInt(student)
      );

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Assignment uploaded",
        assignment: assignment,
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

exports.updateSubmission = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const getAssignment = await ClassGrade.getSubmissionbyId(parseInt(id));

      await unlinkAsync(getAssignment.file);

      const updateAssignment = await ClassGrade.updateSubmission(
        parseInt(id),
        req.file.path,
        req.file.originalname
      );

      const assignment = await ClassGrade.getAssignmentSubmission(
        updateAssignment.assignment,
        updateAssignment.student
      );

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Assignment uploaded",
        assignment: assignment,
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

async function filterUnusedLink() {
  const schdule = await Schedule.getAllSchedule();
  console.log("filter link");

  schdule.forEach((slot) => {
    var startHour = parseInt(slot.tt_time_start.toISOString().slice(11, 13));
    var startMinutes = parseInt(slot.tt_time_start.toISOString().slice(14, 16));
    var endHour = parseInt(slot.tt_time_end.toISOString().slice(11, 13));
    var endMinutes = parseInt(slot.tt_time_end.toISOString().slice(14, 16));

    var currHour = new Date().getHours();
    var currMinutes = new Date().getMinutes();

    let isUpdateCheck = false;

    if (slot.tt_class_link) {
      if (startHour === endHour) {
        if (currHour < startHour || currHour > endHour) {
          isUpdateCheck = true;
        } else {
          if (currMinutes < startMinutes || currMinutes > endMinutes) {
            isUpdateCheck = true;
          }
        }
      } else {
        if (currHour < startHour || currHour > endHour) {
          isUpdateCheck = true;
        } else if (currHour === startHour) {
          if (currMinutes < startMinutes) {
            isUpdateCheck = true;
          }
        } else if (currHour === endHour) {
          if (currMinutes > endMinutes) {
            isUpdateCheck = true;
          }
        }
      }

      if (isUpdateCheck) {
        console.log("link null");
        Schedule.updateScheduleLink(slot.timetable_id, null);
      }
    }
  });
}

setInterval(filterUnusedLink, 10000);
