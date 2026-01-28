import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  addCart,
  getUserCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getUserCart);
cartRouter.post("/", checkAuth, addCart);
cartRouter.patch("/", checkAuth, updateCartQuantity);
cartRouter.delete("/", checkAuth, removeFromCart);

export default cartRouter;
