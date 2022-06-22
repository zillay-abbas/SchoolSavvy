const Stripe = require("stripe");

const stripe = new Stripe(process.env.SECRET_KEY || "", null);

exports.subscriptionUpdate = async (req, res) => {
  const endpointSecret =
    "whsec_2b1309ba38a7e5ff2ef5cb9aeb2e359533b1ade1ca2c5b2ff1abb67088529c94";

  const sig = req.headers["stripe-signature"];
  const body = req.body;
  console.log(`signat::::: ${sig}`);

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log(event);
  } catch (err) {
    console.log(`err ;;;;;; ${err}`);
    res.status(300).end();
    return;
  }

  let intent = null;
  switch (event["type"]) {
    case "payment_intent.succeeded":
      intent = event.data.object;
      console.log("Succeeded:", intent.id);
      break;
    case "payment_intent.payment_failed":
      intent = event.data.object;
      const message =
        intent.last_payment_error && intent.last_payment_error.message;
      console.log("Failed:", intent.id, message);
      break;
  }

  res.sendStatus(203);
};
