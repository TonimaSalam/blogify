class CreateUpdateBlog {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

class ReturnedBlog {
  constructor(blogID,title, content) {
    this.blogID = blogID;
    this.title = title;
    this.content = content;
  }
}

module.exports = {
  CreateUpdateBlog,
  ReturnedBlog,
};
