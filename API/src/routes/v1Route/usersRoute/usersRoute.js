const { Router } = require("express");
const authentication = require("../../../middlewares/authentication");
const authorization = require("../../../middlewares/autherization");
const {getAddresses,addAddress,updateAddress,deleteAddress} = require('../../../controllers/addressController')
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
  logout,
} = require("../../../controllers/usersController");

const profileUpload = require("../../../middlewares/profileUpload");
const usersRoute = Router();

//get all users
usersRoute.get("/", authentication, authorization(["admin"]), getUsers);

usersRoute.post("/login", login);
usersRoute.post(
  "/sign-up",
  profileUpload.single("profile_picture_url"),
  addUser
);
usersRoute.put("/:id", authentication, updateUser);
usersRoute.delete("/:id", authentication, authorization(["admin"]), deleteUser);
usersRoute.post("/refresh-token", refreshToken);
usersRoute.post("/reset", resetPassword);
usersRoute.post("/passwordReset", resetConfirmation);
//    const link = `http://${process.env.HOST_NAME}:${process.env.PORT}/passwordReset?token=${resetToken}&id=${userData.id}`;
usersRoute.post("/logout", authentication, logout);

usersRoute.get("/address", authentication, getAddresses);

// Add a new address
usersRoute.post("/address", authentication, addAddress);

// Update an existing address
usersRoute.put("/address/:id", authentication, updateAddress);

// Delete an address
usersRoute.delete("/address/:id", authentication, deleteAddress);
module.exports = usersRoute;
