const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

const { Plan } = require("../models/userPlanModel");

exports.addPlan = async (req, res) => {
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
