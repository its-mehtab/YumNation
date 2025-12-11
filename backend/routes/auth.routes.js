import { Router } from "express";
import {
  getUserData,
  login,
  logout,
  signUp,
} from "../controllers/auth.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/getuserdata", checkAuth, getUserData);

export default authRouter;
