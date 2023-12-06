require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3001,
  URL: process.env.URL,
  BASEURL: `http://${process.env.URL}:${process.env.PORT}`,
  DB_URL: process.env.DB_URL,
  API_SECRET: process.env.API_SECRET,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};