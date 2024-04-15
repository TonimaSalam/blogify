const authService = require("../services/auth-service");
const DTO = require("../dto/auth-dto");
const utils = require("../utils/content-negotiator");

const userRegistration = async (req, res, next) => {
  try {
    const { username, useremail, password } = req.body;
    const body = new DTO.UserCreation(username, useremail, password);
    const token = await authService.userRegistrationService(body);
    const jwt = [{ "access-token": token }];
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(token, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    return next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const body = new DTO.UserLogin(username, password);
    const token = await authService.userLoginService(body);
    const jwt = [{ "access-token": token }];
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(token, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
