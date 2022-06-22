const express = require("express");
const router = express.Router();

const { addPlan, getPlan, subscribePlan, subscribePlanSession, subscriptionUpdate, planSubscription } = require("../controllers/userPlanController");

router.route("/add").get(addPlan);

router.route("/current").get(getPlan);

router.route("/subscribe").post(planSubscription);

router.route("/subscriptionUpdate").post(subscriptionUpdate);

module.exports = router;