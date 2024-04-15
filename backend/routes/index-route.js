const routes = require("express").Router();
const authRoute = require("./auth-route");
const blogRoute = require("./blog-route");
const userRoute = require("./user-route");
const authMiddleware = require("../middlewares/authentication-authorization");

routes.use("/blog", blogRoute);
routes.use("/user", authMiddleware.isAuthenticated, userRoute);
routes.use("/author", userRoute);
routes.use("/", authRoute);

module.exports = routes;
