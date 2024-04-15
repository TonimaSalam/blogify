const authController = require("../controllers/auth-controller");
const authRoute = require("express").Router();
const validator = require("../middlewares/validator");
const authMiddleware = require("../middlewares/authentication-authorization");

authRoute.post(
  "/register",
  validator.registrationBodyValidator,
  validator.passValidator,
  validator.emailValidator,
  authController.userRegistration
);
authRoute.post(
  "/login",
  validator.loginBodyValidator,
  authController.userLogin
);
authRoute.get("/", (req, res) => {
  res.status(200).send("this is home.");
});

module.exports = authRoute;
