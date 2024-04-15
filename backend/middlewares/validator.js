const createError = require("../utils/create-error");

const passValidator = (req, res, next) => {
  const password = req.body.password;
  let character = 0,
    number = 0,
    special = 0;
  for (let i in password) {
    if (
      (password[i] >= "a" && password[i] <= "z") ||
      (password[i] >= "A" && password[i] <= "Z")
    )
      character = 1;
    else if (password[i] >= 0 && password[i] <= 9) number = 1;
    else if (password[i] == "@" || password[i] == "#" || password[i] == "&")
      special = 1;
  }

  if (character * number * special * password.length >= 8) next();
  else {
    const error = createError(
      400,
      `Password should contain at least one character,number 
        and special character(@,#,&) and lenght should be at least 8.`
    );
    return next(error);
  }
};

const emailValidator = (req, res, next) => {
  const email = req.body.useremail;
  console.log(typeof email);
  const regularExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regularExpression.test(email)) next();
  else {
    const error = createError(400, "Please enter a valid email address.");
    return next(error);
  }
};

const registrationBodyValidator = (req, res, next) => {
  if (!req.body.username || !req.body.useremail || !req.body.password) {
    const error = createError(400, "All the fields required.");
    return next(error);
  } else next();
};

const loginBodyValidator = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    const error = createError(400, "All the fields required.");
    return next(error);
  } else next();
};

const createBlogBodyValidator = (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    const error = createError(400, "All the fields required.");
    return next(error);
  } else next();
};
const updateBlogBodyValidator = (req, res, next) => {
  if (!req.body.title && !req.body.content) {
    const error = createError(400, "Title or content required.");
    return next(error);
  } else next();
};

module.exports = {
  passValidator,
  emailValidator,
  registrationBodyValidator,
  loginBodyValidator,
  createBlogBodyValidator,
  updateBlogBodyValidator,
};
