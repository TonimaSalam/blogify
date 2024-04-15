const utils = require("../utils/content-negotiator");
const blogService = require("../services/blog-service");
const DTO = require("../dto/blog-dto");

const numberOfBlogs = async (req, res, next) =>{
  try{
    const noOfBlogs= await blogService.numberOfBlogs();
    return res.status(200).send({noOfBlogs});
  }catch(error){
    console.log("Iamin error");
    return next(error);
  }

}

const numberOfMyBlogs = async (req, res, next) =>{
  try{
    const authorID = parseInt(req.params.authorID);
    const noOfBlogs= await blogService.numberOfMyBlogs(authorID);
    return res.status(200).send({noOfBlogs});
  }catch(error){
    return next(error);
  }
}
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getBlogs();
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(blogs, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`error from Controller->getBlogs : ${error.message}`);
    return next(error);
  }
};

const getPaginationtBlogs = async (req, res, next) => {
  try {
    const noOfContent = parseInt(req.params.noOfContent);
    const pageNo = parseInt(req.params.pageNo);

    const blogs = await blogService.getPaginationBlogs(noOfContent, pageNo);
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(blogs, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`error from Controller->getBlogs : ${error.message}`);
    return next(error);
  }
};

const getPaginationtBlogsByAuthor = async (req, res, next) => {
  try {
    const authorID = req.userID;
    const noOfContent = parseInt(req.params.noOfContent);
    const pageNo = parseInt(req.params.pageNo);

    const blogs = await blogService.getPaginationBlogsByAuthor(authorID,noOfContent, pageNo);
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(blogs, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`error from Controller->getBlogs : ${error.message}`);
    return next(error);
  }
};

const getMyBlogs = async (req, res, next) => {
  try {
    const authorID = req.userID;
    const blogs = await blogService.getBlogsByAuthor(authorID);
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(blogs, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`error from Controller->getBlogsByAuthor : ${error.message}`);
    return next(error);
  }
};

const getBlogsByAuthor = async (req, res, next) => {
  try {
    const authorID = parseInt(req.params.authorID);
    const blogs = await blogService.getBlogsByAuthor(authorID);
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(blogs, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`error from Controller->getBlogsByAuthor : ${error.message}`);
    return next(error);
  }
};

const getBlogByID = async (req, res, next) => {
  try {
    const blogID = parseInt(req.params.blogID);
    const blogs = await blogService.getBlogsByID(blogID);
    const format = req.accepts(["json", "text", "xml", "html"]);
    const negotiatedContent = await utils.contentNegotiator(blogs, format);
    if (negotiatedContent) return res.status(200).send(negotiatedContent);
  } catch (error) {
    console.log(`error from Controller->getBlogsByID : ${error.message}`);
    return next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const userID = req.userID;
    const { title, content } = req.body;
    const body = new DTO.CreateUpdateBlog(title, content);
    const newBlog = await blogService.createBlog(userID, body);
    if (newBlog) {
      const format = req.accepts(["json", "text", "xml", "html"]);
      const negotiatedContent = await utils.contentNegotiator(newBlog, format);
      if (negotiatedContent) return res.status(201).send(negotiatedContent);
    }
  } catch (error) {
    console.log(`error from Controller->createBlog : ${error.message}`);
    return next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blogID = parseInt(req.params.blogID);
    const { title, content } = req.body;
    const body = new DTO.CreateUpdateBlog(title, content);
    const updatedBlog = await blogService.updateBlog(blogID, body);
    if (updatedBlog) {
      const format = req.accepts(["json", "text", "xml", "html"]);
      const negotiatedContent = await utils.contentNegotiator(
        updatedBlog,
        format
      );
      if (negotiatedContent) return res.status(200).send(negotiatedContent);
    }
  } catch (error) {
    console.log(`error from Controller->updateBlogs : ${error.message}`);
    return next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blogID = parseInt(req.params.blogID);
    const isBlogdeleted = await blogService.deleteBlog(blogID);
    if (isBlogdeleted) {
      const returnedMessage = [{ message: "Blog deleted successfully." }];
      const format = req.accepts(["json", "text", "xml", "html"]);
      const negotiatedContent = await utils.contentNegotiator(
        returnedMessage,
        format
      );
      if (negotiatedContent) return res.status(200).send(negotiatedContent);
    }
  } catch (error) {
    console.log(`error from Controller->deleteBlog : ${error.message}`);
    return next(error);
  }
};

module.exports = {
  getBlogs,
  getPaginationtBlogs,
  getBlogByID,
  getBlogsByAuthor,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getPaginationtBlogsByAuthor,
  numberOfBlogs,
  numberOfMyBlogs
};
