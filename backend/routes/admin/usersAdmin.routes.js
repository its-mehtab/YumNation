import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateUserByAdmin,
} from "../../controllers/auth.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const usersAdminRouter = Router();

usersAdminRouter.get("/users", checkAuth, adminOnly, getAllUsers);
usersAdminRouter.get("/user/:userId", checkAuth, adminOnly, getUserDetails);
usersAdminRouter.patch(
  "/user/:userId",
  checkAuth,
  adminOnly,
  updateUserByAdmin,
);
usersAdminRouter.delete("/user/:userId", checkAuth, adminOnly, deleteUser);

export default usersAdminRouter;
