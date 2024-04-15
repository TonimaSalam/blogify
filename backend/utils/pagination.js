const blogRepo = require("../repositories/blog-repo");

const paginate = async (noOfContent, pageNo) => {
  let numberOfcontents = noOfContent;
  let offset = (pageNo - 1) * noOfContent;
  const numberOfBlog = await blogRepo.numberOfBlogs();
  let pages = Math.ceil(numberOfBlog / noOfContent);
  if (!(pageNo >= 1 && pageNo <= pages) || noOfContent <= 0) {
    offset = 0;
    numberOfcontents = 5;
  }

  return { numberOfcontents, offset };
};

module.exports = {
  paginate,
};
