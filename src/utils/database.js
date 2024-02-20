const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQLDB_DATABASE,
  process.env.MYSQLDB_USER,
  process.env.MYSQLDB_PASSWORD,
  {
    host: "mysqldb",
    dialect: "mysql",
    port: process.env.MYSQLDB_DOCKER_PORT,
  },
);

module.exports = sequelize;
