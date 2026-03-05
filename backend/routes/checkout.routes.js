import { Router } from "express";
import {
  createOrder,
  validateCartBeforeCheckout,
} from "../controllers/checkout.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const checkoutRouter = Router();

checkoutRouter.get("/", checkAuth, validateCartBeforeCheckout);
checkoutRouter.post("/", checkAuth, createOrder);

export default checkoutRouter;
