const JWT = require("../utils/jwt");
const userRepo = require("../repositories/auth-repo");
const blogRepo = require("../repositories/blog-repo");
const createError = require("../utils/create-error");

const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"];
    const username = await JWT.getUsernameFromJWT(accessToken);
    const user = username ? await userRepo.getUserWithname(username) : null;
    if (!user) {
      const error = createError(401, "User is not authenticated.");
      return next(error);
    } else {
      req.username = user[0].username;
      req.userID = user[0].userID;
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

const isAuthorized = async (req, res, next) => {
  const userID = req.userID;
  const blogID = parseInt(req.params.blogID);

  const blog = await blogRepo.getBlogByID(blogID);
  if (!blog || blog[0].userID != userID) {
    const error = createError(401, "User is not authenticated.");
    return next(error);
  } else return next();
};

module.exports = {
  isAuthenticated,
  isAuthorized,
};
