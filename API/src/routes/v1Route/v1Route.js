const productsRouter = require("./productsRoute/productsRoute");
const usersRoute = require("./usersRoute/usersRoute");
const { Router } = require("express");

const v1Route = Router();

v1Route.use("/users", usersRoute);
v1Route.use("/products", productsRouter);

module.exports = v1Route;
