const utils = require("../utils/content-negotiator");
const myErrorHandler = async (err, req, res, next) => {
  console.log("hi i am global error handler.", err);
  const status = err.status || 500;
  if (!err.status) err.message = "Server Error.";

  const format = "text";
  const negotiatedContent = await utils.contentNegotiator(
    [{ message: err.message }],
    format
  );
  return res.status(status).send(negotiatedContent);
};

module.exports = myErrorHandler;
