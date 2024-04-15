const userRepo = require("../repositories/auth-repo");
const JWT = require("../utils/jwt");
const createError = require("../utils/create-error");

const userRegistrationService = async (body) => {
  const userWithname = await userRepo.getUserWithname(body.username);
  const userWithemail = await userRepo.getUserWithemail(body.useremail);

  if (userWithname) {
    const error = createError(400, "Username already used.");
    throw error;
  }

  if (userWithemail) {
    const error = createError(400, "Useremail already used.");
    throw error;
  }
  const newUser = await userRepo.buildUser(body);
  return JWT.createTokens(newUser.username);
};

const userLoginService = async (body) => {
  const user = await userRepo.getUserWithname(body.username);
  if (!user) {
    const error = createError(404, "User not found.");
    throw error;
  }

  if (body.password === user[0].password) {
    console.log("password matched.");
    const accessToken = JWT.createTokens(body.username);
    return accessToken;
  } else {
    const error = createError(400, "wrong user name or password.");
    throw error;
  }
};

module.exports = {
  userRegistrationService,
  userLoginService,
};
