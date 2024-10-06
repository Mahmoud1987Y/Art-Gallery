const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const accessToken = req.headers.authorization;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not found" });
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = { user_data: decodedAccessToken.user_data };
    next();
  } catch (error) {
    throw new Error("Access Token is invalid or expired");
  }
};

module.exports = authentication;
