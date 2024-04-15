const blogRepo = require("../repositories/blog-repo");
const utils = require("../utils/pagination");
const DTO = require("../dto/blog-dto");
const createError = require("../utils/create-error");

const numberOfBlogs = async () => {
  const noOfBlogs = await blogRepo.numberOfBlogs();
  return noOfBlogs;
};

const numberOfMyBlogs = async (authorID) => {
  const noOfBlogs = await blogRepo.numberOfMyBlogs(authorID);
  return noOfBlogs;
};

const getBlogs = async () => {
  const blogs = await blogRepo.getAllBlogs();
  if (blogs.length === 0) {
    const error = createError(204, "");
    throw error;
  } else return blogs;
};

const getPaginationBlogs = async (noOfContent, pageNo) => {
  const { numberOfcontents, offset } = await utils.paginate(
    noOfContent,
    pageNo
  );
  const filteredBlogs = blogRepo.getPaginatedBlogs(numberOfcontents, offset);
  if (filteredBlogs.length === 0) {
    const error = createError(204, "");
    throw error;
  } else return filteredBlogs;
};

const getPaginationBlogsByAuthor = async (authorID, noOfContent, pageNo) => {
  const { numberOfcontents, offset } = await utils.paginate(
    noOfContent,
    pageNo
  );
  const filteredBlogs = blogRepo.getPaginatedBlogsByAuthor(
    authorID,
    numberOfcontents,
    offset
  );
  if (filteredBlogs.length === 0) {
    const error = createError(204, "");
    throw error;
  } else return filteredBlogs;
};

const getBlogsByAuthor = async (authorID) => {
  const blogs = await blogRepo.getBlogsByAuthor(authorID);
  if (blogs.length === 0) {
    const error = createError(204, "");
    throw error;
  } else return blogs;
};

const getBlogsByID = async (blogID) => {
  const blog = await blogRepo.getBlogByID(blogID);
  if (blog) return blog;
  else throw createError(204, "");
};

const createBlog = async (userID, body) => {
  const newBlog = await blogRepo.buildBlog(userID, body);
  if (newBlog) {
    const { blogID, title, content } = newBlog;
    const returnedBlog = new DTO.ReturnedBlog(blogID, title, content);
    return [returnedBlog];
  }
};

const updateBlog = async (blogID, body) => {
  const updatedBlog = await blogRepo.updateBlog(blogID, body);
  if (updatedBlog) {
    const blog = await blogRepo.getBlogByID(blogID);
    return blog;
  }
};

const deleteBlog = async (blogID) => {
  const deletedBlog = await blogRepo.deleteBlogByID(blogID);
  if (deletedBlog) return true;
};
module.exports = {
  getBlogs,
  getPaginationBlogs,
  getBlogsByAuthor,
  //getPeginationBlogsByAuthor,
  getBlogsByID,
  createBlog,
  updateBlog,
  deleteBlog,
  getPaginationBlogsByAuthor,
  numberOfBlogs,
  numberOfMyBlogs,
};
