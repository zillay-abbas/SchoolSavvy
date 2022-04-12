const { School } = require("../models/schoolModel");
const { Subject } = require("../models/subjectModel");

exports.addSubject = async (req, res) => {
  const { name, desc, classId, schoolId } = req.body;

  if (!name || !desc || !classId || !schoolId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const subject = await Subject.addSubject(name, desc, classId, schoolId);

      const subjectDet = await Subject.getSubjectDetail(subject.course_id);

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Subject added",
        subject: subjectDet,
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

exports.updateSubject = async (req, res) => {
  const { subjId, name, desc, classId, schoolId } = req.body;

console.log(req.body);
  if (!subjId || !name || !desc || !classId || !schoolId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const subject = await Subject.updateSubject(subjId, name, desc, classId, schoolId);

      const subjectDet = await Subject.getSubjectDetail(subject.course_id);

      res.status(200).json({
        error: false,
        isDialog: true,
        msg: "Subject updated",
        subject: subjectDet,
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

exports.getAllSubjects = async (req, res) => {
  const userID = req.user.user_id;

  try {
    const schId = await School.getActiveSchoolbyUserID(userID);

    const allSubjects = await Subject.getSubjectsbySchoolID(schId.admin_school_id);

    res.status(200).json({
      error: false,
      isDialog: false,
      subjects: allSubjects,
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

exports.removeSubject = async (req, res) => {
  const { subjId } = req.body;

  try {
    const subject = await Subject.removeSubject(subjId);

    res.status(200).json({
      error: false,
      isDialog: true,
      msg: "Subject removed",
      subject,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};