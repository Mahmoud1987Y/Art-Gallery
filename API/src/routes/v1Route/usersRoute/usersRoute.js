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
} = require("../../../controllers/usersController");

const usersRoute = Router();

//get all users
usersRoute.get("/", authentication, getUsers);

usersRoute.post("/login", login);
usersRoute.post("/sign-up", addUser);
usersRoute.put("/:id", authentication, updateUser);
usersRoute.delete("/:id", authentication, authorization(["admin"]), deleteUser);

module.exports = usersRoute;
