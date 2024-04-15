//const Users = require("./user");
const { DataTypes } = require("sequelize");
const sequelize = require("../configures/database");

const Blog = sequelize.define("Blogs", {
  blogID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Blog;
