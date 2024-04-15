require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_LOCALHOST,
    dialect: "mysql",
  }
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
