const { DataTypes } = require("sequelize");
const sequelize = require("../configures/database");
const Blog = require("./blog");

const User = sequelize.define("Users", {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.hasMany(Blog, { foreignKey: "userID" });
Blog.belongsTo(User, { foreignKey: "userID" });

module.exports = User;
