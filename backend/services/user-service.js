const userRepo = require("../repositories/auth-repo");
const createError = require("../utils/create-error");

const getUser = async (username) => {
  const userWithname = await userRepo.getUserWithname(username);
  return userWithname;
};
const getUserByID = async (userID) => {
  const userWithname = await userRepo.getUserWithID(userID);
  return userWithname;
};

const updateUser = async (username, body) => {
  const userWithname = await userRepo.getUserWithname(username);

  if (body.oldPassword != userWithname[0].password) {
    const error = createError(400, "You entered wrong password.");
    throw error;
  }

  const updated = await userRepo.updateUser(username, body);
  if (updated) return true;
};

const deleteUser = async (username) => {
  const deleted = await userRepo.deleteUser(username);
  if (deleted) return true;
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserByID
};
