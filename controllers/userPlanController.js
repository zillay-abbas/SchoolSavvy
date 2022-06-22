const { Plan } = require("../models/userPlanModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.SECRET_KEY || "", null);

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

exports.getPlan = async (req, res) => {
  const userID = req.user.user_id;
  try {
    const userPlan = await Plan.getSubscriptionbyUserID(userID);

    res.status(200).json({
      error: false,
      isDialog: false,
      plan: userPlan[0],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      isDialog: true,
      msg: "Server error",
    });
  }
};

exports.subscriptionUpdate = async (req, res) => {
  const { userId, planId } = req.body;
  if (!planId || !userId) {
    res.status(400).json({
      error: true,
      isDialog: true,
      msg: "Input not complete",
    });
  } else {
    try {
      let endTime;
      if (planId === 2) {
        endTime = new Date(new Date().setMonth(new Date().getMonth() + 1));
      } else {
        endTime = new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        );
      }
      const plan = await Plan.updateSubscription(userId, planId, endTime);

      res.status(200).json({
        error: false,
        isDialog: true,
        plan,
        msg: "Subscription updated",
      })
    } catch (error) {
      res.status(500).json({
        error: true,
        isDialog: true,
        msg: "Server error",
      });
    }
  }
};

exports.planSubscription = async (req, res) => {
  const { email, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "pkr",
      metadata: { integration_check: "accept_a_payment" },
      receipt_email: email,
    });

    res.json({ client_secret: paymentIntent["client_secret"] });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: "Server error",
    });
  }
};
