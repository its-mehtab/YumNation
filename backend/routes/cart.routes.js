import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { getCart } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get("/", checkAuth, getCart);

export default cartRouter;
