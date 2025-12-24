import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addCart,
  getUserCart,
  updateCartQuantity,
} from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getUserCart);
cartRouter.post("/", checkAuth, addCart);
cartRouter.patch("/", checkAuth, updateCartQuantity);

export default cartRouter;
