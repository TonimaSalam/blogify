const userService = require("../services/user-service");
const DTO = require("../dto/auth-dto");
const utils = require("../utils/content-negotiator");

const getUser = async (req, res, next) => {
  try {
    const username = req.username;
    const user = await userService.getUser(username);
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(user, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`Error from Controller->getUser : ${error.message}`);
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const username = req.username;
    const { newPassword, oldPassword } = req.body;
    const body = new DTO.UpdateUser(newPassword, oldPassword);
    const updated = await userService.updateUser(username, body);
    if (updated) {
      const returnedMessage = [{ message: "User updated successfully." }];
      const format = req.accepts(["json", "text", "xml", "html"]);
      const negotiatedContent = await utils.contentNegotiator(
        returnedMessage,
        format
      );
      if (negotiatedContent) return res.status(200).send(negotiatedContent);
    }
  } catch (error) {
    console.log(`Error from Controller->updateUser : ${error.message}`);
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const username = req.username;
    const deleted = await userService.deleteUser(username);
    if (deleted) {
      const returnedMessage = [{ message: "User deleted successfully." }];
      const format = req.accepts(["json", "text", "xml", "html"]);
      const negotiatedContent = await utils.contentNegotiator(
        returnedMessage,
        format
      );
      if (negotiatedContent) return res.status(200).send(negotiatedContent);
    }
  } catch (error) {
    console.log(`Error from Controller->deleteUser ${error.message}`);
    return next(error);
  }
};


module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
