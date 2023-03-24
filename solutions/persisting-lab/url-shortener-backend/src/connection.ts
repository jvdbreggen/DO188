const { Sequelize } = require("sequelize");

const DB_NAME = process.env.DB_NAME ?? "db";
const USER_NAME = process.env.USER_NAME ?? "user";
const PASSWORD = process.env.PASSWORD ?? "pass";
const DB_HOST = process.env.DB_HOST ?? "postgresql_database";
const DB_DIALECT = process.env.DB_DIALECT ?? "postgres"

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
  // Use mysql container name as host
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export default sequelize;
