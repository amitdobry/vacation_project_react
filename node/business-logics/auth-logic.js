const dal = require("../data-layers/auth-dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid"); // npm i uuid
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {
  user.password = cryptoHelper.hash(user.password);
  user.uuid = uuid.v4();
  const sql = `INSERT INTO users VALUES(DEFAULT, '${user.uuid}', '${user.firstName}', '${user.lastName}', '${user.username}', '${user.password}')`;
  const info = await dal.executeAsync(sql);
  delete user.password;
  user.token = jwtHelper.getNewToken(user);
  user.user_id = info.insertId;
  return user;
}

async function loginAsync(credentials) {
  credentials.password = cryptoHelper.hash(credentials.password);
  const sql = `SELECT user_id, uuid, firstName, lastName, username FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
  const users = await dal.executeAsync(sql);
  if (users.length === 0) return null;
  const user = users[0];
  user.token = jwtHelper.getNewToken(user);
  return user;
}

module.exports = {
  registerAsync,
  loginAsync,
};
