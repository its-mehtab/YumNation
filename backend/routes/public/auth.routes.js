import { Router } from "express";
import {
  getUserData,
  login,
  logout,
  resetNewPassword,
  sendOtp,
  signUp,
  updateUser,
  verifyOtp,
} from "../../controllers/auth.controllers.js";
import { checkAuth } from "../../middleware/checkAuth.js";

const authRouter = Router();

authRouter.get("/getuserdata", checkAuth, getUserData);
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.patch("/updateuser", checkAuth, updateUser);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetNewPassword);

export default authRouter;
