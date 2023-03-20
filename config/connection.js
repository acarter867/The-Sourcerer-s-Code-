//Establish connection to database
const mysql = require("mysql");
const { Sequelize } = require("sequelize");
require("dotenv").config();

//Declare new sequelize with env variables
const sequelize = new Sequelize(
  process.env.RDS_DBNAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOSTNAME,
    dialect: "mysql",
  }
);

//Attemp connection with credentials stored in .env
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
