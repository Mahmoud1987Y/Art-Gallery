const jwt = require("jsonwebtoken");
const {BlacklistedTokens} = require('../models/Users')
const authentication = async(req, res, next) => {
  const accessToken = req.headers.authorization;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not found" });
  }
  const blacklisted = await BlacklistedTokens.findOne({ where: { token } });

  if (blacklisted) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = { user_data: decodedAccessToken.user_data };
    next();
  } catch (error) {
    res.status(500).json({ message: "Access Token is invalid or expired" });
  }
};

module.exports = authentication;
