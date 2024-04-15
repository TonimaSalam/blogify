const Blogs = require("../models/blog");

const numberOfBlogs = async () => {
  const numberOfBlog = await Blogs.count();
  return numberOfBlog;
};

const numberOfMyBlogs = async (authorID) => {
  const numberOfBlog = await Blogs.count({where: { userID: authorID }});
  return numberOfBlog;
};

const getAllBlogs = async () => {
  const blogs = await Blogs.findAll({
    attributes: ["blogID","userID", "title", "content"],
  });
  if (blogs) {
    const jsonBlogs = blogs.map((blog) => blog.toJSON());
    return jsonBlogs;
  } else return blogs;
};

const getBlogsByAuthor = async (authorID) => {
  const blogs = await Blogs.findAll({
    attributes: ["blogID","userID", "title", "content"],
    where: { userID: authorID },
  });
  if (blogs) {
    const jsonBlogs = blogs.map((blog) => blog.toJSON());
    return jsonBlogs;
  } else return blogs;
};

const getBlogByID = async (blogID) => {
  const blogs = await Blogs.findOne({
    attributes: ["blogID","userID", "title", "content"],
    where: { blogID: blogID },
  });
  if (blogs) {
    const jsonBlogs = blogs.toJSON();
    return [jsonBlogs];
  } else return blogs;
};

const getPaginatedBlogsByAuthor = async (authorID,noOfContent, offset) => {
  const blogs = await Blogs.findAll({
    attributes: ["blogID","userID", "title", "content"],
    where: { userID: authorID },
    limit: noOfContent,
    offset: offset,
  });
  if (blogs) {
    const jsonBlogs = blogs.map((blog) => blog.toJSON());
    return jsonBlogs;
  } else return blogs;
};


const getPaginatedBlogs = async (noOfContent, offset) => {
  const blogs = await Blogs.findAll({
    attributes: ["blogID","userID", "title", "content"],
    limit: noOfContent,
    offset: offset,
  });
  if (blogs) {
    const jsonBlogs = blogs.map((blog) => blog.toJSON());
    return jsonBlogs;
  } else return blogs;
};

const buildBlog = async (userID, body) => {
  const blog = await Blogs.create({
    userID: userID,
    title: body.title,
    content: body.content,
  });
  if (blog) {
    const jsonBlog = blog.toJSON();
    return jsonBlog;
  } else return blog;
};

const updateBlog = async (blogID, body) => {
  const updated = await Blogs.update(body, {
    where: {
      blogID: blogID,
    },
  });
  console.log(updated);
  if (updated[0] == 1) return true;
};

const deleteBlogByID = async (blogID) => {
  const deleted = await Blogs.destroy({
    where: {
      blogID: blogID,
    },
  });
  if (deleted) return true;
};

module.exports = {
  numberOfBlogs,
  numberOfMyBlogs,
  getAllBlogs,
  getBlogsByAuthor,
  getBlogByID,
  getPaginatedBlogs,
  getPaginatedBlogsByAuthor,
  buildBlog,
  updateBlog,
  deleteBlogByID,
};
