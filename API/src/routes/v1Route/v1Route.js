const usersRoute  = require("./usersRoute/usersRoute");
const { Router } = require("express");

const v1Route = Router();

v1Route.use("/users", usersRoute);

module.exports = v1Route;
