const blogRoute = require("express").Router();
const blogController = require("../controllers/blog-controller");
const validator = require("../middlewares/validator");
const authMiddleware = require("../middlewares/authentication-authorization");

blogRoute.get("/", blogController.getBlogs);
blogRoute.get("/blog-count", blogController.numberOfBlogs);
blogRoute.get("/blog-count/:authorID", blogController.numberOfMyBlogs);
blogRoute.get("/author/my-blogs", authMiddleware.isAuthenticated,blogController.getMyBlogs);
blogRoute.get("/author/my-blogs/:noOfContent/:pageNo", authMiddleware.isAuthenticated,blogController.getPaginationtBlogsByAuthor);
blogRoute.get("/author/:authorID", blogController.getBlogsByAuthor);
blogRoute.get("/:noOfContent/:pageNo", blogController.getPaginationtBlogs);
blogRoute.get("/:blogID", blogController.getBlogByID);
blogRoute.post(
  "/",
  validator.createBlogBodyValidator,
  authMiddleware.isAuthenticated,
  blogController.createBlog
);
blogRoute.patch(
  "/:blogID",
  validator.updateBlogBodyValidator,
  authMiddleware.isAuthenticated,
  authMiddleware.isAuthorized,
  blogController.updateBlog
);
blogRoute.delete(
  "/:blogID",
  authMiddleware.isAuthenticated,
  authMiddleware.isAuthorized,
  blogController.deleteBlog
);

module.exports = blogRoute;
