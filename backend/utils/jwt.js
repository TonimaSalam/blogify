require("dotenv").config();
const createError = require("../utils/create-error");

const { sign, verify } = require("jsonwebtoken");

const createTokens = (name) => {
  const accessToken = sign({ username: name }, process.env.JWT_SECRET_KEY);
  return accessToken;
};

const getUsernameFromJWT = async (accessToken) => {
  try {
    const token = accessToken;
    const decoded = await new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    return decoded.username;
  } catch (err) {
    const error = createError(401, "User is not authenticated.");
    console.log(`error from getUsernameFromJWT  ${error.message}`);
    throw error;
  }
};
module.exports = {
  createTokens,
  getUsernameFromJWT,
};
