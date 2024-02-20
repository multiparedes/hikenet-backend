const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB, // Database name
  process.env.POSTGRES_USER, // Username
  process.env.POSTGRES_PASSWORD, // Password
  {
    host: process.env.POSTGRES_HOST, // Hostname
    dialect: "postgres", // Database dialect
    port: process.env.POSTGRES_PORT, // Port (usually 5432 for PostgreSQL)
  },
);

module.exports = sequelize;
