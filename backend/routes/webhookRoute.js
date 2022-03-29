const express = require("express");
const router = express.Router();

const { subscriptionUpdate } = require("../controllers/webhookCont");

router.route("/subscriptionUpdate").post(express.raw({type: 'application/json'}), subscriptionUpdate);

module.exports = router;