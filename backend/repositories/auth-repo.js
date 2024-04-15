const Users = require("../models/user");
const bcrypt = require("bcrypt");

const buildUser = async (body) => {
  const user = await Users.create({
    username: body.username,
    useremail: body.useremail,
    password: body.password,
  });
  return user;
};

const getUserWithname = async (username) => {
  const userWithname = await Users.findOne({
    attributes: ["userID", "username", "useremail", "password"],
    where: { username: username },
  });
  if (userWithname) {
    const jsonUserWithname = userWithname.toJSON();
    return [jsonUserWithname];
  } else return userWithname;
};

const getUserWithID = async (userID) => {
  const userWithID = await Users.findOne({
    attributes: ["username", "useremail"],
    where: { userID: userID },
  });
  if (userWithID) {
    const jsonUserWithID = userWithID.toJSON();
    return [jsonUserWithID];
  } else return userWithID;
};

const getUserWithemail = async (email) => {
  const userWithemail = await Users.findOne({
    attributes: ["userID", "username", "useremail"],
    where: { useremail: email },
  });
  if (userWithemail) {
    const jsonUserWithemail = userWithemail.toJSON();
    return [jsonUserWithemail];
  } else return userWithemail;
};

const updateUser = async (username, body) => {
  console.log(username, body.newPassword);
  const updated = await Users.update({
    password: body.newPassword,},
    {where: {
      username: username,
    },
  });
  if (updated[0] == 1) return true;
};

const deleteUser = async (username) => {
  const deleted = await Users.destroy({
    where: {
      username: username,
    },
  });
  if (deleted == 1) return true;
  else {
    const error = new Error();
    error.status = 404;
    error.message = "user not found.";
    throw error;
  }
};

module.exports = {
  buildUser,
  getUserWithname,
  getUserWithemail,
  updateUser,
  deleteUser,
  getUserWithID
};