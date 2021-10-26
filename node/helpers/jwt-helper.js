const jwt = require("jsonwebtoken"); // npm i jsonwebtoken

function getNewToken(payload) {
  // (payload will be the user object)
  return jwt.sign({ payload }, config.jwtKey, { expiresIn: "30m" });
}

module.exports = {
  getNewToken,
};
