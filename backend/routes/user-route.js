const userRoute = require("express").Router();
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/authentication-authorization");

userRoute.get("/", userController.getUser);
userRoute.get("/:userID", userController.getUserByID);
userRoute.patch("/", userController.updateUser);
userRoute.delete("/", userController.deleteUser);

module.exports = userRoute;
