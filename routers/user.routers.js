const express = require("express");
const { User } = require("../models");
const { register, login, userOne, uploadAvatar, deleteUser, loginGetAll, updateUser, updatePrice } = require("../controllers/user.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const { uploadImage } = require("../middlewares/upload/upload-image");
const { checkExitst } = require("../middlewares/validations/checkExist");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/login/me", authenticate, userOne);
userRouter.delete("/login/:id", authenticate, authorize(["ADMIN", "SUPPER_ADMIN"]), checkExitst(User),  deleteUser);
userRouter.get("/login/getall", authenticate, authorize(["ADMIN", "SUPPER_ADMIN"]), loginGetAll);
userRouter.put("/login/:id", authenticate, authorize(["ADMIN", "SUPPER_ADMIN"]), updateUser);
userRouter.put("/login/price/user", authenticate, authorize(["ADMIN", "SUPPER_ADMIN", "CLIENT"]), updatePrice); 

// upload file
userRouter.post("/upload-avatar", authenticate, uploadImage("user"), uploadAvatar);

module.exports = {
  userRouter,
};
