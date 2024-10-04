const { Router } = require("express");

const usersRoute = Router();

usersRoute.get("/", (req, res) => {
  res.status(200).json({ name: "ahmed" });
});
module.exports = usersRoute;
