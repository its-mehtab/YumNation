import { Router } from "express";
import {
  createOrder,
  getUserOrders,
} from "../controllers/order.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const orderRouter = Router();

orderRouter.get("/", checkAuth, getUserOrders);
orderRouter.post("/", checkAuth, createOrder);

export default orderRouter;
