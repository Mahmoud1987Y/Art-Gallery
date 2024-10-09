const { Router } = require("express");
const authentication = require("../../../middlewares/authentication");
const authorization = require("../../../middlewares/autherization");
//const { errorHandler } = require("../../../middlewares/errorHandler");
const {
  getUsers,
  login,
  addUser,
  updateUser,
  deleteUser,
  refreshToken,
  resetPassword,
  resetConfirmation,
} = require("../../../controllers/usersController");

const usersRoute = Router();

//get all users
usersRoute.get("/", authentication, authorization(["admin"]), getUsers);

usersRoute.post("/login", login);
usersRoute.post("/sign-up", addUser);
usersRoute.put("/:id", authentication, updateUser);
usersRoute.delete("/:id", authentication, authorization(["admin"]), deleteUser);
usersRoute.post("/refresh-token", refreshToken);
usersRoute.post("/reset", resetPassword);
usersRoute.post("/passwordReset", resetConfirmation);
//    const link = `http://${process.env.HOST_NAME}:${process.env.PORT}/passwordReset?token=${resetToken}&id=${userData.id}`;

module.exports = usersRoute;
