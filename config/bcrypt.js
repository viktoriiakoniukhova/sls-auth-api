const bcrypt = require("bcrypt");

const hashPassword = async (pwd) => {
  const salt = await bcrypt.genSaltSync(10);
  return await bcrypt.hashSync(pwd, salt);
};

const isPasswordMatched = async (pwd, pwdHash) => {
  return await bcrypt.compare(pwd, pwdHash);
};

module.exports = { hashPassword, isPasswordMatched };
