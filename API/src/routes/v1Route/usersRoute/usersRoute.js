const { Router } = require("express");
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
usersRoute.get("/", getUsers);

usersRoute.post("/login", login);
usersRoute.post("/sign-up", addUser);
usersRoute.put("/:id", updateUser);
usersRoute.delete("/:id", deleteUser);

//usersRoute.use(errorHandler);

module.exports = usersRoute;
