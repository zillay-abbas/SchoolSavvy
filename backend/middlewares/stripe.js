const Stripe = require('stripe');
const stripe = Stripe(process.env.SECRET_KEY);

module.exports = stripe;