const { Schedule } = require("../models/timeTableModel");

exports.addClass = async (req, res) => {
  const { name, price, isActive } = req.body;

  if (!name || !price || !isActive) {
    res.status(404).json({
      error: true,
      msg: "Input not complete",
    });
  } else {
    try {
      const plan = await Plan.addPlan(name, price, isActive);

      res.status(200).json({
        error: false,
        msg: "Plan added",
        plan,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
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
