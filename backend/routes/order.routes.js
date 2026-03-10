import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
} from "../controllers/order.controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const orderRouter = Router();

orderRouter.get("/", checkAuth, getUserOrders);
orderRouter.get("/:id", checkAuth, getOrderById);
orderRouter.post("/", checkAuth, createOrder);

export default orderRouter;
