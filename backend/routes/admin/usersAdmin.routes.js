import { Router } from "express";
import {
  getAllUsers,
  getUserDetails,
} from "../../controllers/auth.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { adminOnly } from "../../middleware/adminOnly.js";

const usersAdminRouter = Router();

usersAdminRouter.get("/users", checkAuth, adminOnly, getAllUsers);
usersAdminRouter.get("/user/:userId", checkAuth, adminOnly, getUserDetails);

export default usersAdminRouter;
