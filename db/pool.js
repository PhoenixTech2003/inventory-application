const { Pool } = require("pg");
require('dotenv').config()

module.exports = new Pool({
  host: process.env.DB_DEV_HOST,
  user: process.env.DB_DEV_USER,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_DATABASE,
  port: process.env.DB_DEV_PORT,
});


