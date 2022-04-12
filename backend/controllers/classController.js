const { ClassGrade, Schedule } = require("../models/classModel");
const { School } = require("../models/schoolModel");

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
      console.log(newClass.class_id);

      const classDet = await ClassGrade.getClassDetailbyId(newClass.class_id);

      console.log(classDet);
      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Class added",
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

    const classDet = await ClassGrade.getClassDetailbyId(section.section_class_id);

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
    console.log(error);
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
    const routine = await ClassGrade.getClassTimeTable(secId);

    res.status(200).json({
      error: false,
      isDialog: false,
      routine,
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
      routine,
    });
  } catch (error) {
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

    console.log(req.body);
    try {
      const schedule = await Schedule.getSchedulebyClass(
        selectedClass,
        section,
        schId
      );

      if (schedule) {
        res.status(400).json({
          error: true,
          isDialog: true,
          msg: "This class is already scheduled, if you want to change update this class schedule",
        });
      } else {
        const addedSchedule = await Schedule.addSchedule(
          selectedClass,
          section,
          teacher,
          subject,
          day,
          startTime,
          endTime,
          schId
        );

        res.status(200).json({
          error: false,
          isDialog: true,
          msg: "Class scheduled",
          schedule: addedSchedule,
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
