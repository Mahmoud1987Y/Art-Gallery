require("dotenv").config();
const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  const hashed = bcrypt.hashSync(password, parseInt(process.env.SALT));
  return hashed;
};

exports.verifiedEncryption = (hashPassword, password) => {
  const comparePassword = bcrypt.compareSync(password, hashPassword);
  return comparePassword;
};
