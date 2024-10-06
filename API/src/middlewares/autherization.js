const { where } = require("sequelize");
const { Users } = require("../models/Users");
function authorization(roles = []) {
  return async function (req, res, next) {
    const user = await Users.findOne({
      where: { id: parseInt(req.user.user_data.id) },
    });
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
}

module.exports = authorization;
